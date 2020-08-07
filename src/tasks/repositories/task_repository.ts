import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDTO } from '../dtos/create_task_dto';
import { TaskStatus } from '../task_status_enum';
import { FilterTasksDTO } from '../dtos/filter_tasks_dto';
import { User } from 'src/auth/entities/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDTO: FilterTasksDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDTO;

    const query = this.createQueryBuilder('tasks');

    query.where('tasks.userId = :userId', { userId: user.id });

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

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await this.save(task);

    delete task.user;

    return task;
  }
}
