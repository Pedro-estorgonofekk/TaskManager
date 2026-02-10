//Aqui pae, é só as rotas e o resto é pros outros
import { Controller, Get, Post, Put, Patch, Delete, Body, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  GetTask(){
    return this.tasksService.GetTasks()
  }
  
  @Post()
  CreateTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto){  
    return this.tasksService.CreateTask(createTaskDto)
  }  

  @Put(':id')
  UpdateTask(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto){
    return this.tasksService.UpdateTask(id, updateTaskDto)
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
