import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  const host = process.env.HOST || 'http://localhost';
  await app.listen(port);

  const logger = new Logger('Bootstrap Api Server');
  logger.log(`Api Server listening on port ${port}`);
  logger.log(`Api Server URL is ${host}:${port}`);
}

bootstrap();
