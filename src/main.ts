import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Task API')
    .setDescription('API for managing tasks')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Expose Swagger UI at /api

  await app.listen(3000);
}
bootstrap();
