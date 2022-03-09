import { registerAs } from '@nestjs/config';

export const TYPEORM_CONFIG = 'database';

export default registerAs(TYPEORM_CONFIG, () => {
  return {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    url: process.env.TYPEORM_URL,
    autoLoadEntities: true,
    synchronize: false,
    logging: ['query', 'error'],
    migrationsRun: false,
  };
});
