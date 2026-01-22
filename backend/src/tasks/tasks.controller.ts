//Aqui pae, é só as rotas e delegar o resto
import { Controller, Get, Post, Put, Patch, Delete, Body } from '@nestjs/common';
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  GetTask(){
    return this.tasksService.GetTasks()
  }
  
  @Post()
  CreateTask(
    @Body() body: { title: string; description: string; date: string; completed: boolean }
  ){  
    return this.tasksService.CreateTask(body)
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
