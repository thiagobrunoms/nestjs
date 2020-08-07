import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const MyTypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'thiagodesales',
  password: 'tm1319!@12postgres',
  database: 'task_mgt_db1',
  //   entities: [__dirname + '/../../**/*.entity.ts'],
  entities: [path.join(__dirname, '../**/entities/*.entity.{ts,js}')],
  synchronize: true,
};
