import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task_status_enum';
import { CreateTaskDTO } from './dtos/create_task_dto';
import { FilterTasksDTO } from './dtos/filter_tasks_dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //   @Get()
  //   getAllTasks(): Task[] {
  //     return this.tasksService.getAllTasks();
  //   }
  //   @Get()
  //   getAllTasks(@Query(ValidationPipe) filterDto: FilterTasksDTO): Task[] {
  //     if (Object.keys(filterDto).length) {
  //       return this.tasksService.filterTasks(filterDto);
  //     }

  //     return this.tasksService.getAllTasks();
  //   }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    console.log('body', createTaskDTO);

    return this.tasksService.createTask(createTaskDTO);
  }

  //   @Delete('/:id')
  //   deleteTaskById(@Param('id') id: string): void {
  //     return this.tasksService.deleteTaskById(id);
  //   }

  //   @Patch('/:id/status')
  //   updateStatus(
  //     @Param('id') id: string,
  //     @Body('status', new TaskStatusValidationPipe()) status: TaskStatus,
  //   ): Task {
  //     return this.tasksService.updateStatus(id, status);
  //   }
}
