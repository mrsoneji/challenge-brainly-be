import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { DatabaseService } from '../repositories/task.repository';

@Injectable()
export class TaskService {
  private idCounter = 1; // Simple ID counter for tasks

  constructor(private readonly databaseService: DatabaseService) {}

  // Create a new task
  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: this.idCounter++,
      title: createTaskDto.title,
      completed: false,
      deadline: createTaskDto.deadline || null,
    };
    return this.databaseService.insert(newTask);
  }

  // Delete a task by ID
  async deleteTask(id: string) {
    const numRemoved = await this.databaseService.remove(+id);
    if (numRemoved === 0) {
      throw new NotFoundException('Task not found');
    }
  }

  // Mark a task as completed
  async completeTask(id: string) {
    const task = await this.databaseService.findById(+id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.completed = true;
    await this.databaseService.update(+id, task);
    return task;
  }

  // Set a deadline for a task by ID
  async setDeadline(id: string, deadline: Date) {
    const task = await this.databaseService.findById(+id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.deadline = deadline;
    await this.databaseService.update(+id, task);
    return task;
  }

  // List all tasks
  async getAllTasks() {
    return this.databaseService.findAll();
  }

  // Get a summary of tasks
  async getSummary() {
    const tasks = await this.databaseService.findAll();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    return {
      totalTasks,
      completedTasks,
      notCompletedTasks: totalTasks - completedTasks,
    };
  }
}
