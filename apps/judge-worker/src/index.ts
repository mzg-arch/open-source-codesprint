import 'dotenv/config';

import { Worker } from 'bullmq';
import { PrismaClient } from '@codesprint/database';

const prisma = new PrismaClient();

const worker = new Worker(
  'submission',
  async (job) => {
    const { submissionId } = job.data as {
      submissionId: string;
    };

    console.log(`Picked up submission: ${submissionId}`);

    const submission = await prisma.submission.findUnique({
      where: {
        id: submissionId,
      },
    });

    if (!submission) {
      throw new Error('Submission not found');
    }

    await prisma.submission.update({
      where: {
        id: submissionId,
      },
      data: {
        status: 'RUNNING',
      },
    });

    console.log(
      `Submission ${submissionId} changed from PENDING to RUNNING`,
    );

    return {
      submissionId,
      status: 'RUNNING',
    };
  },
  {
    connection: {
      host: process.env.REDIS_HOST ?? 'localhost',
      port: Number(process.env.REDIS_PORT ?? 6379),
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

console.log('Judge worker listening for submissions...');