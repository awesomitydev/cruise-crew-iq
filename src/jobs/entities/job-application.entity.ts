import { JobStatus } from "src/__shared__/enums/job-status.enum";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Job } from "./job.entity";
import { AbstractEntity } from "src/__shared__/entities/abstract.entity";

@Entity({ name: "job_applications" })
export class JobApplication extends AbstractEntity {
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  resume: string;
  @Column()
  coverLetter: string;
  @Column()
  nationalID: string;
  @Column()
  status: JobStatus;

  @ManyToOne(() => Job, (job) => job.jobApplications)
  @JoinColumn({ name: "job_id" })
  job: Job;
}
