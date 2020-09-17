import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MyTypeOrmConfig } from './config/typeorm_config';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';

console.log(MyTypeOrmConfig);
@Module({
  imports: [KafkaModule],
})
export class AppModule {}
