import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task_status_enum';
import * as uuid from 'uuid';
import { CreateTaskDTO } from './dtos/create_task_dto';
import { FilterTasksDTO } from './dtos/filter_tasks_dto';
import { TaskRepository } from './repositories/task_repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  async getAllTasks(filterDTO: FilterTasksDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) throw new NotFoundException(`Task with id ${id} not found!`);

    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDTO, user);
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({
      id,
      userId: user.id,
    });
    if (result.affected === 0)
      throw new NotFoundException('Não há tasks com este id');
  }

  async updateStatus(
    id: number,
    user: User,
    status: TaskStatus,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    return await this.taskRepository.save(task);
  }
}
