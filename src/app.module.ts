import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MyTypeOrmConfig } from './config/typeorm_config';

console.log(MyTypeOrmConfig);
@Module({
  imports: [TypeOrmModule.forRoot(MyTypeOrmConfig), TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
