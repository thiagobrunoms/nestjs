import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const path = require('path');
export const MyTypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'postgres',
  password: 'docker',
  database: 'task_mgt_db1',
  //   entities: [__dirname + '/../../**/*.entity.ts'],
  entities: [path.join(__dirname, '../**/entities/*.entity.{ts,js}')],
  synchronize: true,
};
