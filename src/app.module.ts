import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MyTypeOrmConfig } from './config/typeorm_config';
import { AuthModule } from './auth/auth.module';

console.log(MyTypeOrmConfig);
@Module({
  imports: [TypeOrmModule.forRoot(MyTypeOrmConfig), TasksModule, AuthModule],
})
export class AppModule {}
