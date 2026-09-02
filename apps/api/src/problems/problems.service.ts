import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';

@Injectable()
export class ProblemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProblemDto: CreateProblemDto) {
    const { examples, starterCode, testCases, parameters, ...problemData } =
      createProblemDto;

    return this.prisma.problem.create({
      data: {
        ...problemData,
        parameters: parameters.map(({ name, type }) => ({ name, type })),
        examples: {
          create: examples,
        },
        starterCode: {
          create: starterCode,
        },
        testCases: {
          create: testCases,
        },
      },
      include: {
        examples: true,
        starterCode: true,
        testCases: true,
      },
    });
  }

  findAll() {
    return this.prisma.problem.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        createdAt: true,
      },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.problem.findUnique({
      where: { slug },
      include: {
        examples: true,
        starterCode: true,
        testCases: {
          where: {
            isHidden: false,
          },
        },
      },
    });
  }
}
