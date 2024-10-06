import { IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task', // Description for Swagger
    example: 'Complete the project documentation', // Example value for Swagger
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the task', // Description for Swagger
    example: 'Write detailed documentation for the project', // Example value for Swagger
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The deadline for the task', // Description for Swagger
    type: String, // Specify the type for Swagger
    format: 'date-time', // Specify format for date-time
    required: false, // Mark it as optional
  })
  @IsDate()
  deadline?: Date; // Optional
}
