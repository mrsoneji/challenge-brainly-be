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
    // Fetch all tasks from the Nedb database
    const tasks = await this.databaseService.findAll();

    // Get the current time
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    // Filter tasks based on completion status and deadline
    return tasks.filter((task) => {
      const isCompleted = task.completed ? task.completed === true : true;
      return (
        isCompleted &&
        (!task.deadline || new Date(task.deadline) <= twoHoursFromNow)
      );
    });
  }

  // List archived tasks
  async getArchivedTasks() {
    // Fetch archived tasks from the Nedb database
    const tasks = await this.databaseService.findAll();

    // Get the current time
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    // Filter tasks based on completion status and deadline
    return tasks.filter((task) => {
      const isCompleted = task.completed ? task.completed === true : true;
      return (
        isCompleted &&
        (!task.deadline || new Date(task.deadline) >= twoHoursFromNow)
      );
    });
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
