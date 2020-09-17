import { UseCase } from '../usecase_example';
import { PostUseCaseDto } from './create_task_return_dto';
import { CreatePostPort } from './usecase_port_if';

export interface CreateTaskUseCase
  extends UseCase<CreatePostPort, PostUseCaseDto> {}
