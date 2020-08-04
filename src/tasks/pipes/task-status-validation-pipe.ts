import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task_status_enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: string): string {
    value = value.toUpperCase();

    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} não permitido para status`);

    return value;
  }

  private isStatusValid(value) {
    const index = this.allowedStatus.indexOf(value);

    return index !== -1;
  }
}
