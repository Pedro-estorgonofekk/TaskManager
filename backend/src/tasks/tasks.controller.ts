//Aqui pae, é só as rotas e delegar o resto
import { Controller, Get, Post, Put, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  GetTask(){
    return this.tasksService.GetTasks()
  }
  
  @Post()
  CreateTask(@Body() body: { title: string; description: string; date: string; completed: boolean }){  
    return this.tasksService.CreateTask(body)
  }  

  @Put(':id')
  UpdateTask(@Param('id', ParseIntPipe) id: number, @Body() body: { title: string; description: string; date: string; completed: boolean }){
    return this.tasksService.UpdateTask(id, body)
  }

  @Patch(':id/complete')
  CompleteTask(@Param('id', ParseIntPipe) id: number){
    return this.tasksService.CompleteTask(id)
  }

  @Patch(':id/incomplete')
  IncompleteTask(@Param('id', ParseIntPipe) id: number){
    return this.tasksService.IncompleteTask(id)
  }

  @Delete(':id')
  DeleteTask(@Param('id', ParseIntPipe) id: number){
    return this.tasksService.DeleteTask(id)
  }
}
