import { Controller, Body, Param, Query } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiRequestBody,
  CreatedResponse,
  DeleteOperation,
  ErrorResponses,
  ForbiddenResponse,
  GetOperation,
  OkResponse,
  PaginatedOkResponse,
  PostOperation,
  UnauthorizedResponse,
} from "src/__shared__/decorators";
import { Authorize } from "src/auth/decorators/authorize.decorator";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { UserRole } from "src/__shared__/enums/user-role.enum";
import { FetchJobDto } from "./dto/fetch-job.dto";
import { GenericResponse } from "src/__shared__/dto/generic-response.dto";
import { plainToInstance } from "class-transformer";

@ApiTags("Jobs")
@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @PostOperation("", "Create Job")
  @CreatedResponse()
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ApiRequestBody(CreateJobDto.Input)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async createJob(
    @Body() createJobDto: CreateJobDto.Input,
  ): Promise<GenericResponse> {
    await this.jobsService.createJob(createJobDto);
    return new GenericResponse("Job created successfully");
  }

  @GetOperation("", "Get All Jobs")
  @PaginatedOkResponse(FetchJobDto.OutPut)
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ApiRequestBody(FetchJobDto.Input)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async getAllJob(
    @Query() fetchJobDto: FetchJobDto.Input,
  ): Promise<GenericResponse<FetchJobDto.OutPut>> {
    const jobs = await this.jobsService.findAllJob(fetchJobDto);
    return new GenericResponse("Jobs retrieved successfully", jobs);
  }

  @GetOperation(":id", "Get Job")
  @OkResponse(FetchJobDto.OutPut)
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ApiRequestBody(FetchJobDto.Input)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async findJob(
    @Param("id") id: number,
  ): Promise<GenericResponse<FetchJobDto.OutPut>> {
    const job = await this.jobsService.findJobById(id);
    const outPut = await plainToInstance(FetchJobDto.OutPut, job);
    return new GenericResponse("Job retrieved successfully", outPut);
  }

  @PostOperation(":id", "Update Job")
  @OkResponse(FetchJobDto.OutPut)
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ApiRequestBody(UpdateJobDto.Input)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async updateJob(
    @Param("id") id: number,
    @Body() updateJobDto: UpdateJobDto.Input,
  ): Promise<GenericResponse<UpdateJobDto.OutPut>> {
    const job = await this.jobsService.updateJobById(+id, updateJobDto);
    const outPut = await plainToInstance(UpdateJobDto.OutPut, job);
    return new GenericResponse("Job updated successfully", outPut);
  }

  @DeleteOperation(":id", "Delete Job")
  @OkResponse()
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async removeJob(@Param("id") id: number): Promise<GenericResponse> {
    await this.jobsService.removeJobById(id);
    return new GenericResponse("Job deleted successfully");
  }
}
