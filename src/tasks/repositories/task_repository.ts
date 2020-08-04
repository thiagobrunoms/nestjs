import { Repository, EntityRepository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDTO } from '../dtos/create_task_dto';
import { TaskStatus } from '../task_status_enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }
}
