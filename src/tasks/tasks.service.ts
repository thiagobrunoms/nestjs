import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task_status_enum';
import * as uuid from 'uuid';
import { CreateTaskDTO } from './dtos/create_task_dto';
import { FilterTasksDTO } from './dtos/filter_tasks_dto';
import { TaskRepository } from './repositories/task_repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from '../auth/entities/user.entity';
import { CreateTaskUseCase } from './create_task_usecase';
import { CreatePostPort } from './usecase_port_if';
import { PostUseCaseDto } from './create_task_return_dto';

@Injectable()
export class TasksService implements CreateTaskUseCase {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  execute(port: CreatePostPort): Promise<PostUseCaseDto> {
    throw new Error('Method not implemented.');
  }

  async getAllTasks(filterDTO: FilterTasksDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    console.log('buscando task por id e user', user);
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
    console.log('DELETE TASK...');
    const result = await this.taskRepository.delete({
      id,
      userId: user.id,
    });
    if (result.affected === 0)
      throw new NotFoundException(`Não há tasks com id = ${id}`);
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
