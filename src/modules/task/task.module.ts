import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { DatabaseService } from './repositories/task.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, DatabaseService, DatabaseService], // Add DatabaseService here
})
export class TaskModule {}
