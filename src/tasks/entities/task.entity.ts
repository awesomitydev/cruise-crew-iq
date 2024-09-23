import { AbstractEntity } from "src/__shared__/entities/abstract.entity";
import { TaskStatus } from "src/__shared__/enums/task-status.enum";
import { UserPosition } from "src/__shared__/enums/user-position.enum";
import { Column, Entity } from "typeorm";

@Entity({ name: "tasks" })
export class Task extends AbstractEntity {
  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  position: UserPosition;

  @Column()
  taskStartDate: Date;

  @Column()
  taskEndDate: Date;
}
