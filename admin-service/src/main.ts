import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS with specific options
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:5000',
  });

  await app.listen(3000);
}
bootstrap();
