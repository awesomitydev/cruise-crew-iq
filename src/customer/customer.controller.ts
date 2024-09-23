import { Controller, Body, Param, Query } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
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
import { FetchCustomerDto } from "./dto/fetch-customer.dto";
import { GenericResponse } from "src/__shared__/dto/generic-response.dto";
import { CustomerDto } from "./dto/customer.dto";
import { plainToInstance } from "class-transformer";
import { ApiTags } from "@nestjs/swagger";
import { UserRole } from "src/__shared__/enums/user-role.enum";
import { Authorize } from "src/auth/decorators/authorize.decorator";
import { JwtGuard } from "src/auth/guards/jwt.guard";

@ApiTags("Customer")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @PostOperation("", "Create customer")
  @CreatedResponse()
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto.Input,
  ): Promise<void> {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @GetOperation("", "Get all customers")
  @PaginatedOkResponse(FetchCustomerDto.Output)
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async getAllCustomer(
    @Query() fetchCustomerDto: FetchCustomerDto.Input,
  ): Promise<GenericResponse<FetchCustomerDto.Output>> {
    return await this.customerService.findAllCustomer(fetchCustomerDto);
  }

  @GetOperation(":id", "Get customer")
  @OkResponse(CustomerDto.Output)
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async getCustomer(
    @Param("id") id: number,
  ): Promise<GenericResponse<CustomerDto.Output>> {
    const customer = await this.customerService.findcustomerById(id);
    const output = plainToInstance(CustomerDto.Output, customer);

    return new GenericResponse("Customer retrieved successfully", output);
  }

  @PostOperation(":id", "Update customer")
  @OkResponse()
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ApiRequestBody(CustomerDto.Output)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async updateCustomer(
    @Param("id") id: number,
    @Body() updateCustomerDto: UpdateCustomerDto.Input,
  ): Promise<GenericResponse<UpdateCustomerDto.Output>> {
    let outPut = await this.customerService.updateCustomerById(
      id,
      updateCustomerDto,
    );
    outPut = plainToInstance(UpdateCustomerDto.Output, outPut);
    return new GenericResponse("Customer updated successfully", outPut);
  }

  @DeleteOperation(":id", "Delete customer")
  @OkResponse()
  @Authorize(JwtGuard, UserRole.ADMIN)
  @ErrorResponses(UnauthorizedResponse, ForbiddenResponse)
  async removeCustomer(@Param("id") id: number): Promise<void> {
    return await this.customerService.removeCustomerById(id);
  }
}
