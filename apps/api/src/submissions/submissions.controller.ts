import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionsService } from './submissions.service';

type AuthenticatedRequest = {
  user: {
    id: string;
    email: string;
    username: string;
  };
};

@Controller('submissions')
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateSubmissionDto,
  ) {
    return this.submissionsService.create(
      request.user.id,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMine(@Req() request: AuthenticatedRequest) {
    return this.submissionsService.findMine(
      request.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(
    @Req() request: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.submissionsService.findById(
      id,
      request.user.id,
    );
  }
}