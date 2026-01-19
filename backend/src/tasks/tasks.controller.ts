//Aqui pae, é só as rotas e delegar o resto
import { Controller, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  GetTask(): string {
    return "Buscar Tasks"
  }
  
  @Post()
  CreateTask(): string{  
    return "Criar Tasks"
  }  

  @Put(':id')
  UpdateTask(): string{
    return "Atualizar Tasks"
  }

  @Patch(':id/complete')
  CompleteTask(): string{
    return "Completar Tasks"
  }

  @Patch(':id/incomplete')
  IncompleteTask(): string{
    return "Completar(soq ao contrario) Tasks"
  }

  @Delete(':id')
  DeleteTask(): string{
    return "Deletar Tasks"
  }
}
