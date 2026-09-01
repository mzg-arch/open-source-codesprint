import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'submission',
    }),
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
