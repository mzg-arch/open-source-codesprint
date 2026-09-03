import "dotenv/config";

import { PrismaClient, SubmissionStatus } from "@codesprint/database";
import { Worker } from "bullmq";

import { getRunner } from "./runner/get-runner";
import { formatReturnValidationFeedback } from "./runner/format-return-validation-feedback";
import { parseExecutionContract } from "./runner/parse-execution-contract";
import { serializedResultsMatch } from "./runner/javascript/serialize-result";

const prisma = new PrismaClient();

async function processSubmission(submissionId: string) {
  console.log("Picked up submission: " + submissionId);

  const submission = await prisma.submission.findUnique({
    where: {
      id: submissionId,
    },
    include: {
      problem: {
        include: {
          testCases: true,
        },
      },
    },
  });

  if (!submission) {
    throw new Error("Submission not found");
  }

  await prisma.submission.update({
    where: {
      id: submission.id,
    },
    data: {
      status: SubmissionStatus.RUNNING,
      runtimeMs: null,
      output: null,
    },
  });

  const finish = (
    status: SubmissionStatus,
    runtimeMs: number | null,
    output: string | null,
  ) =>
    prisma.submission.update({
      where: {
        id: submission.id,
      },
      data: {
        status,
        runtimeMs,
        output,
      },
    });

  const runner = getRunner(submission.language);

  if (!runner) {
    await finish(
      SubmissionStatus.RUNTIME_ERROR,
      null,
      "Unsupported language: " + submission.language,
    );
    return;
  }

  let totalRuntimeMs = 0;

  try {
    const contract = parseExecutionContract({
      functionName: submission.problem.functionName,
      parameters: submission.problem.parameters,
      returnType: submission.problem.returnType,
    });
    const limits = {
      timeLimitMs: submission.problem.timeLimit,
      memoryLimitMb: submission.problem.memoryLimit,
    };
    const program = runner.prepare({
      sourceCode: submission.sourceCode,
      contract,
    });
    const validation = await runner.validate(program, limits);

    if (validation.timedOut) {
      await finish(
        SubmissionStatus.TIME_LIMIT_EXCEEDED,
        null,
        "Syntax validation timed out",
      );
      return;
    }

    if (validation.exitCode !== 0) {
      await finish(
        SubmissionStatus.COMPILE_ERROR,
        null,
        validation.stderr || "JavaScript syntax validation failed",
      );
      return;
    }

    for (const testCase of submission.problem.testCases) {
      console.log("Running test case: " + testCase.id);

      const result = await runner.execute({
        program,
        input: testCase.input,
        limits,
      });

      totalRuntimeMs += result.runtimeMs;

      if (result.timedOut) {
        await finish(
          SubmissionStatus.TIME_LIMIT_EXCEEDED,
          totalRuntimeMs,
          "Execution exceeded " + limits.timeLimitMs + "ms",
        );
        return;
      }

      if (result.exitCode !== 0) {
        await finish(
          SubmissionStatus.RUNTIME_ERROR,
          totalRuntimeMs,
          result.stderr || "Process exited with code " + result.exitCode,
        );
        return;
      }

      if (result.returnValidationIssue) {
        await finish(
          SubmissionStatus.WRONG_ANSWER,
          totalRuntimeMs,
          formatReturnValidationFeedback(
            result.returnValidationIssue,
            contract,
          ),
        );
        return;
      }

      if (!serializedResultsMatch(result.stdout, testCase.expectedOutput)) {
        await finish(
          SubmissionStatus.WRONG_ANSWER,
          totalRuntimeMs,
          result.stdout || "Function produced no serialized result",
        );
        return;
      }
    }

    await finish(SubmissionStatus.ACCEPTED, totalRuntimeMs, null);

    console.log(
      "Submission " + submission.id + " accepted in " + totalRuntimeMs + "ms",
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown execution error";
    const isTimeout = message.toLowerCase().includes("timeout");

    await finish(
      isTimeout
        ? SubmissionStatus.TIME_LIMIT_EXCEEDED
        : SubmissionStatus.RUNTIME_ERROR,
      totalRuntimeMs > 0 ? totalRuntimeMs : null,
      message,
    );

    console.error("Submission " + submission.id + " failed: " + message);
  }
}

const worker = new Worker(
  "submission",
  async (job) => {
    const { submissionId } = job.data as {
      submissionId: string;
    };

    await processSubmission(submissionId);
  },
  {
    connection: {
      host: process.env.REDIS_HOST ?? "localhost",
      port: Number(process.env.REDIS_PORT ?? 6379),
    },
  },
);

worker.on("completed", (job) => {
  console.log("Job " + job.id + " completed");
});

worker.on("failed", (job, error) => {
  console.error("Job " + (job?.id ?? "unknown") + " failed:", error.message);
});

async function shutdown() {
  console.log("Shutting down judge worker...");

  await worker.close();
  await prisma.$disconnect();

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("Judge worker listening for submissions...");
