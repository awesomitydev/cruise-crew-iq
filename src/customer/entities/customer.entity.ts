import { AbstractEntity } from "src/__shared__/entities/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "customers" })
export class Customer extends AbstractEntity {
  @Column()
  names: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column("text", { array: true })
  preferences: string[];

  @Column()
  feedBack: string;

  @Column()
  bookingHistory: string;
}
