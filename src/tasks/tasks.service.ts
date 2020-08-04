import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task_status_enum';
import * as uuid from 'uuid';
import { CreateTaskDTO } from './dtos/create_task_dto';
import { FilterTasksDTO } from './dtos/filter_tasks_dto';
import { TaskRepository } from './repositories/task_repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // filterTasks(filterTaskQueryDTO: FilterTasksDTO): Task[] {
  //   let tasks = this.getAllTasks();
  //   if (filterTaskQueryDTO.status) {
  //     tasks = tasks.filter(
  //       eachTask => eachTask.status === filterTaskQueryDTO.status,
  //     );
  //   }
  //   if (filterTaskQueryDTO.search) {
  //     const search = filterTaskQueryDTO.search;
  //     tasks = tasks.filter(
  //       eachTask =>
  //         eachTask.title.includes(search) ||
  //         eachTask.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) throw new NotFoundException(`Task with id ${id} not found!`);

    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDTO);
  }
  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: uuid.v4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTaskById(id: string): void {
  //   this.tasks = this.tasks.filter(task => task.id !== id);
  // }
  // updateStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
