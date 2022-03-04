import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmCongfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'misha',
  password: 'asdasd04281',
  database: 'movies',
  autoLoadEntities: true,
  synchronize: false,
  logging: ['query', 'error'],
  migrationsRun: false,
};
