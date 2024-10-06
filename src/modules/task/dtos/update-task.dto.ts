import { IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

export class UpdateTaskDto {
  @ApiProperty({
    description: 'The deadline for the task', // Description for Swagger
    type: String, // Specify the type for Swagger
    format: 'date-time', // Specify format for date-time
    required: false, // Mark it as optional
  })
  @IsOptional()
  @IsDate()
  deadline?: Date;

  @ApiProperty({
    description: 'Indicates whether the task is completed', // Description for Swagger
    required: false, // Mark it as optional
  })
  @IsOptional()
  completed?: boolean; // To mark the task as completed
}
