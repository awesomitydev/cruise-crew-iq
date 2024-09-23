import { BadRequestException } from "@nestjs/common";

export enum UserRole {
  ADMIN = "ADMIN",
  CREW = "CREW",
}

export function getUserRole(role: string): UserRole {
  switch (role.toUpperCase()) {
    case "CREW":
      return UserRole.CREW;
    case "ADMIN":
      return UserRole.ADMIN;
    default:
      throw new BadRequestException(`Invalid role: ${role}`);
  }
}
