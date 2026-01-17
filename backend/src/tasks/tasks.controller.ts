import { Controller, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly appService: TasksService) {}

  @Get()
  GetTask(): string {
    return "Buscar Tasks"
  }
  
  @Post()
  CreateTask(): string{  
    return "Criar Tasks"
  }  

  @Put()
  UpdateTask(): string{
    return "Atualizar Tasks"
  }

  @Patch()
  CompleteTask(): string{
    return "Completar Tasks"
  }

  @Delete()
  DeleteTask(): string{
    return "Deletar Tasks"
  }
}
