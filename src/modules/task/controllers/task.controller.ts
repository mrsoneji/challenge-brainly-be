import {
  Controller,
  Post,
  Delete,
  Patch,
  Get,
  Body,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TaskService } from '../services/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create a new task
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto }) // Specify the request body type
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid input. Check the request data.',
  })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  // Delete a specific task by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific task by ID' })
  @ApiResponse({ status: 204, description: 'Task deleted successfully.' })
  @ApiResponse({
    status: 404,
    description: 'Task not found. Ensure the ID is correct.',
  })
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  // Mark a task as completed by ID
  @Patch(':id/complete')
  @ApiOperation({ summary: 'Mark a task as completed by ID' })
  @ApiResponse({ status: 200, description: 'Task marked as completed.' })
  @ApiResponse({
    status: 404,
    description: 'Task not found. Ensure the ID is correct.',
  })
  async completeTask(@Param('id') id: string) {
    return this.taskService.completeTask(id);
  }

  // Set a deadline for a task by ID
  @Patch(':id/deadline')
  @ApiOperation({ summary: 'Set a deadline for a task by ID' })
  @ApiBody({ type: UpdateTaskDto }) // Specify the request body type
  @ApiResponse({ status: 200, description: 'Deadline set successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid date format. Ensure the date is valid.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found. Ensure the ID is correct.',
  })
  async setDeadline(@Param('id') id: string, @Body('deadline') deadline: Date) {
    return this.taskService.setDeadline(id, deadline);
  }

  // List all created tasks
  @Get()
  @ApiOperation({ summary: 'List all created tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully.',
  })
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  // Get a summary of completed and non-completed tasks
  @Get('summary')
  @ApiOperation({ summary: 'Get a summary of tasks' })
  @ApiResponse({
    status: 200,
    description: 'Summary of tasks retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'No tasks found.' })
  async getSummary() {
    return this.taskService.getSummary();
  }
}
