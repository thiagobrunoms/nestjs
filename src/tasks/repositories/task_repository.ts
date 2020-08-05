import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDTO } from '../dtos/create_task_dto';
import { TaskStatus } from '../task_status_enum';
import { FilterTasksDTO } from '../dtos/filter_tasks_dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDTO: FilterTasksDTO): Promise<Task[]> {
    const { status, search } = filterDTO;

    const query = this.createQueryBuilder('tasks');

    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(tasks.title LIKE :search OR tasks.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

  async deleteTaskById(id: number): Promise<DeleteResult> {
    return await this.delete(id);
  }
}
