import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "src/__shared__/entities/abstract.entity";
import { JobApplication } from "./job-application.entity";

@Entity({ name: "jobs" })
export class Job extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  deadLine: Date;

  @OneToMany(() => JobApplication, (jobApplication) => jobApplication.job)
  jobApplications: JobApplication[];
}
