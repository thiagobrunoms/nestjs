import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../task_status_enum';

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
