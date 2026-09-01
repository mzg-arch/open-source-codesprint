import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly prisma: PrismaService,

    @InjectQueue('submission')
    private readonly submissionQueue: Queue,
  ) {}

  async create(userId: string, dto: CreateSubmissionDto) {
    const problem = await this.prisma.problem.findUnique({
      where: {
        slug: dto.problemSlug,
      },
    });

    if (!problem) {
      throw new NotFoundException('Problem not found');
    }

    const submission = await this.prisma.submission.create({
      data: {
        userId,
        problemId: problem.id,
        language: dto.language,
        sourceCode: dto.sourceCode,
      },
    });

    await this.submissionQueue.add('judge', {
      submissionId: submission.id,
    });

    return submission;
  }

  findMine(userId: string) {
    return this.prisma.submission.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        problem: {
          select: {
            title: true,
            slug: true,
            difficulty: true,
          },
        },
      },
    });
  }

  findById(id: string, userId: string) {
    return this.prisma.submission.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        problem: {
          select: {
            title: true,
            slug: true,
            difficulty: true,
          },
        },
      },
    });
  }
}
