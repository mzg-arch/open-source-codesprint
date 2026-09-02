import 'dotenv/config';

import { Worker } from 'bullmq';
import {
  PrismaClient,
  SubmissionStatus,
} from '@codesprint/database';

import { runJavascript } from './run-javascript';

const prisma = new PrismaClient();

const worker = new Worker(
  'submission',
  async (job) => {
    const { submissionId } = job.data as {
      submissionId: string;
    };

    console.log(`Picked up submission: ${submissionId}`);

    const submission =
      await prisma.submission.findUnique({
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
      throw new Error('Submission not found');
    }

    await prisma.submission.update({
      where: {
        id: submission.id,
      },
      data: {
        status: SubmissionStatus.RUNNING,
      },
    });

    if (submission.language !== 'javascript') {
      await prisma.submission.update({
        where: {
          id: submission.id,
        },
        data: {
          status: SubmissionStatus.RUNTIME_ERROR,
          output: 'Unsupported language',
        },
      });

      return;
    }

    let totalRuntimeMs = 0;

    try {
      for (const testCase of submission.problem.testCases) {
        console.log(`Running test case: ${testCase.id}`);

        const startedAt = Date.now();

        const result = await runJavascript({
          sourceCode: submission.sourceCode,
          input: testCase.input,
          timeLimitMs: submission.problem.timeLimit,
          memoryLimitMb:
            submission.problem.memoryLimit,
        });

        const runtimeMs = Date.now() - startedAt;

        totalRuntimeMs += runtimeMs;

        console.log('Docker execution finished:', result);

        if (result.stderr) {
          await prisma.submission.update({
            where: {
              id: submission.id,
            },
            data: {
              status:
                SubmissionStatus.RUNTIME_ERROR,
              runtimeMs: totalRuntimeMs,
              output: result.stderr,
            },
          });

          return;
        }

        if (
          result.stdout.trim() !==
          testCase.expectedOutput.trim()
        ) {
          await prisma.submission.update({
            where: {
              id: submission.id,
            },
            data: {
              status:
                SubmissionStatus.WRONG_ANSWER,
              runtimeMs: totalRuntimeMs,
              output: result.stdout,
            },
          });

          return;
        }
      }

      await prisma.submission.update({
        where: {
          id: submission.id,
        },
        data: {
          status: SubmissionStatus.ACCEPTED,
          runtimeMs: totalRuntimeMs,
          output: null,
        },
      });

      console.log(
        `Submission ${submission.id} accepted in ${totalRuntimeMs}ms`,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown execution error';

      const isTimeout =
        message.toLowerCase().includes('timeout');

      await prisma.submission.update({
        where: {
          id: submission.id,
        },
        data: {
          status: isTimeout
            ? SubmissionStatus.TIME_LIMIT_EXCEEDED
            : SubmissionStatus.RUNTIME_ERROR,
          runtimeMs:
            totalRuntimeMs > 0
              ? totalRuntimeMs
              : null,
          output: message,
        },
      });

      console.error(
        `Submission ${submission.id} failed: ${message}`,
      );
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST ?? 'localhost',
      port: Number(
        process.env.REDIS_PORT ?? 6379,
      ),
    },
  },
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, error) => {
  console.error(
    `Job ${job?.id ?? 'unknown'} failed:`,
    error.message,
  );
});

async function shutdown() {
  console.log('Shutting down judge worker...');

  await worker.close();
  await prisma.$disconnect();

  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

console.log(
  'Judge worker listening for submissions...',
);