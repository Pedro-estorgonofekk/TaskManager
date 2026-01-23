//Aqui pae, é só as rotas e delegar o resto
import { Controller, Get, Post, Put, Patch, Delete, Body, Param,ParseIntPipe } from '@nestjs/common';
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
  UpdateTask(@Param('id', ParseIntPipe) id: number, @Body() body: { title: string; description: string; date: string; completed: boolean }){
    return this.tasksService.UpdateTask(id, body)
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
