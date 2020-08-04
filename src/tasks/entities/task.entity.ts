import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../task_status_enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
