import { registerAs } from '@nestjs/config';

export const TYPEORM_CONFIG = 'database';

export default registerAs(TYPEORM_CONFIG, () => {
  return {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    autoLoadEntities: true,
    synchronize: false,
    logging: ['query', 'error'],
    migrationsRun: false,
  };
});
