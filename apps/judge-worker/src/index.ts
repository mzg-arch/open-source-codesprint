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

    console.log(
      `Picked up submission: ${submissionId}`,
    );

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

    try {
      for (const testCase of submission.problem.testCases) {
        const result = await runJavascript({
          sourceCode: submission.sourceCode,
          input: testCase.input,
          timeLimitMs: submission.problem.timeLimit,
          memoryLimitMb:
            submission.problem.memoryLimit,
        });

        if (result.stderr) {
          await prisma.submission.update({
            where: {
              id: submission.id,
            },
            data: {
              status:
                SubmissionStatus.RUNTIME_ERROR,
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
        },
      });
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
          output: message,
        },
      });

      for (const testCase of submission.problem.testCases) {
  console.log(`Starting test case ${testCase.id}`);
  console.log(`Input: ${testCase.input}`);

  const result = await runJavascript({
    sourceCode: submission.sourceCode,
    input: testCase.input,
    timeLimitMs: submission.problem.timeLimit,
    memoryLimitMb: submission.problem.memoryLimit,
  });

  console.log('Runner returned:', result);

  if (result.stderr) {
    await prisma.submission.update({
      where: {
        id: submission.id,
      },
      data: {
        status: SubmissionStatus.RUNTIME_ERROR,
        output: result.stderr,
      },
    });

    return;
  }

  if (
    result.stdout.trim() !==
    testCase.expectedOutput.trim()
  ) {
    console.log('Wrong answer');

    await prisma.submission.update({
      where: {
        id: submission.id,
      },
      data: {
        status: SubmissionStatus.WRONG_ANSWER,
        output: result.stdout,
      },
    });

    return;
  }
}
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
  await worker.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

console.log(
  'Judge worker listening for submissions...',
);