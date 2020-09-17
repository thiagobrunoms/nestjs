import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './repositories/task_repository';
import { TaskStatus } from './task_status_enum';
import { FilterTasksDTO } from './dtos/filter_tasks_dto';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 12, username: 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    tasksRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository...', async () => {
      tasksRepository.getTasks.mockResolvedValue('someResult');

      expect(tasksRepository.getTasks).not.toHaveBeenCalled();

      const filters: FilterTasksDTO = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };

      const result = await tasksService.getAllTasks(filters, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someResult');
    });
  });

  describe('getTaskById', () => {
    it('calls tasksrepositoryu.findone and successfuly retrieve and return task', async () => {
      const mockTask = {
        title: 'Teste tasks',
        description: 'test desc',
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);
      expect(tasksRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });

    it('throws an error as task is not found', () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('calls taskrepositoru.create and returns the result', async () => {
      expect(tasksRepository.createTask).not.toHaveBeenCalled();
      const createTaskDTO = { title: 'Test Tasks', description: 'Task desc' };
      tasksRepository.createTask.mockResolvedValue(createTaskDTO);
      const result = await tasksService.createTask(createTaskDTO, mockUser);
      expect(result).toEqual(createTaskDTO);

      expect(tasksRepository.createTask).toHaveBeenCalledWith(
        createTaskDTO,
        mockUser,
      );
    });
  });

  describe('delete task', () => {
    it('call deleteTaskById and nothing is returned', async () => {
      tasksRepository.delete.mockResolvedValue({ affected: 1 });
      expect(tasksRepository.delete).not.toHaveBeenCalled();

      await tasksService.deleteTaskById(1, mockUser);
      expect(tasksRepository.delete).toHaveBeenCalledWith({
        id: 1,
        userId: mockUser.id,
      });
    });

    it('throw an error if id not exists', async () => {
      tasksRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update tasks status', () => {
    it('updates task status', () => {
      tasksService.getTaskById = jest
        .fn()
        .mockResolvedValue({
          status: TaskStatus.OPEN,
          save: jest.fn().mockResolvedValue(true),
        });
    });
  });
});
