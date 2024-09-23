import { AbstractEntity } from "src/__shared__/entities/abstract.entity";
import { Entity, Column } from "typeorm";
import { UserRole } from "src/__shared__/enums/user-role.enum";
import { UserPosition } from "src/__shared__/enums/user-position.enum";

/**
 * User Entity
 */
@Entity("users")
export class User extends AbstractEntity {
  @Column()
  names: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  position: UserPosition;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ type: "timestamptz", default: null, nullable: true })
  verifiedAt: Date;

  @Column({ nullable: true, default: true })
  activated: boolean;
}
