import { PasswordEncryption } from "src/auth/utils/password-encrytion.util";
import { UserRole } from "src/__shared__/enums/user-role.enum";
import { FetchProfileDto } from "./dto/fetch-profile.dto";
import { CreateAdminDTO } from "./dto/create-admin.dto";
import { plainToInstance } from "class-transformer";
import { FetchUserDto } from "./dto/fetch-user.dto";
import { paginate } from "nestjs-typeorm-paginate";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createAdmin(createAdminDTO: CreateAdminDTO.Input) {
    const { email, names, position, password } = createAdminDTO;

    const userExists = await this.findUserByEmail(email);
    if (userExists) {
      throw new ConflictException("User already exists");
    }

    const user = plainToInstance(User, {
      email,
      names,
      position,
      password,
      role: UserRole.ADMIN,
    });

    await this.createUser(user);
  }

  async createUser(user: User): Promise<User> {
    user.password = PasswordEncryption.hashPassword(user.password);
    if (user.role === UserRole.ADMIN) {
      user.verifiedAt = new Date();
    }
    return this.usersRepository.save(user);
  }

  findUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async getProfile(userId: number) {
    const userProfile = await this.findUserById(userId);
    return plainToInstance(FetchProfileDto.OutPut, userProfile);
  }

  async updateProfile(
    userId: number,
    updateProfileDto: UpdateProfileDto.Input,
  ) {
    const user = await this.findUserById(userId);

    const exist = await this.usersRepository.existsBy({
      email: updateProfileDto.email,
    });

    if (exist) {
      throw new ConflictException("Email is already in use");
    }

    user.names = updateProfileDto.names ?? user.names;
    user.email = updateProfileDto.email ?? user.email;
    user.position = updateProfileDto.position ?? user.position;

    const updatedUser = await this.usersRepository.save(user);
    return plainToInstance(UpdateProfileDto.OutPut, updatedUser);
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const hashedPassword = PasswordEncryption.hashPassword(newPassword);

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.password = hashedPassword;

    await this.usersRepository.save(user);
  }

  async verifyUser(userId: number): Promise<void> {
    await this.usersRepository.update(userId, {
      verifiedAt: new Date().toISOString(),
    });
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.usersRepository.update(userId, { refreshToken });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);

    await this.usersRepository.update(user.id, {
      deletedAt: new Date().toISOString(),
      email: `${user.email}-deleted-${new Date().toISOString()}`,
    });
  }

  async pauseUser(id: number): Promise<void> {
    await this.findUserById(id);
    await this.usersRepository.update(id, {
      activated: false,
    });
  }

  async activateUser(id: number): Promise<void> {
    await this.findUserById(id);
    await this.usersRepository.update(id, {
      activated: true,
    });
  }

  async findAllUsers(dto: FetchUserDto.Input): Promise<any> {
    const queryBuilder = this.usersRepository
      .createQueryBuilder("user")
      .orderBy("user.id", "DESC")
      .select(["user.id", "user.names", "user.email", "user.position"]);
    queryBuilder.where("user.role = :role", {
      role: dto.role,
    });

    if (dto.q) {
      queryBuilder.andWhere(
        "user.names ilike :searchKey OR user.email ilike :searchKey",
        {
          searchKey: `%${dto.q}%`,
        },
      );
    }

    return await paginate<FetchUserDto.Output>(queryBuilder, {
      page: dto.page,
      limit: dto.size,
    });
  }
}
