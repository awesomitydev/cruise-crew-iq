import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateJobDto } from "./dto/create-job.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./entities/job.entity";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { paginate } from "nestjs-typeorm-paginate";
import { FetchJobDto } from "./dto/fetch-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async createJob(createJobDto: CreateJobDto.Input): Promise<void> {
    const job = plainToInstance(Job, createJobDto);
    await this.jobRepository.save(job);
  }

  async findAllJob(dto: FetchJobDto.Input): Promise<any> {
    const queryBuilder = this.jobRepository
      .createQueryBuilder("job")
      .orderBy("job.id", "DESC")
      .select(["job.id", "job.title", "job.description", "job.date"]);

    if (dto.q) {
      queryBuilder.andWhere(
        "job.title ilike :searchKey OR job.description ilike :searchKey",
        {
          searchKey: `%${dto.q}%`,
        },
      );
    }

    return await paginate<Job>(queryBuilder, {
      page: dto.page,
      limit: dto.size,
    });
  }

  async findJobById(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
    });
    if (!job) {
      throw new NotFoundException("Job not found");
    }
    return job;
  }

  async updateJobById(
    id: number,
    updateJobDto: UpdateJobDto.Input,
  ): Promise<Job> {
    const job = await this.findJobById(id);
    const updatedJob = plainToInstance(Job, {
      ...job,
      ...updateJobDto,
    });
    await this.jobRepository.save(updatedJob);
    return updatedJob;
  }

  async removeJobById(id: number): Promise<void> {
    const job = await this.findJobById(id);

    if (!job) {
      throw new NotFoundException("Job not found");
    }

    await this.jobRepository.remove(job);
  }
}
