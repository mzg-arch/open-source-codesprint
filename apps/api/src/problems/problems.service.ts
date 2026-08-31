import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';

@Injectable()
export class ProblemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProblemDto: CreateProblemDto) {
    return this.prisma.problem.create({
      data: createProblemDto,
    });
  }

  findAll() {
    return this.prisma.problem.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.problem.findUnique({
      where: { slug },
    });
  }
}