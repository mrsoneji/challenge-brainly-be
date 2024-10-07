import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.use(
    cors({
      origin: 'http://localhost:8081', // Change this to your frontend's URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Allow credentials (like cookies or authorization headers)
    }),
  );

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
