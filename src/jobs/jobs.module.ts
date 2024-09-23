import { Module } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { JobsController } from "./jobs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./entities/job.entity";
import { JobApplication } from "./entities/job-application.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobApplication])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
