import { Controller, Get, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  TesteVariaveis(): string {
    const a = 10;
    const b = 20;
    return `Variavel: ${a} <br>Soma - ${a + b}<br>`
  }
}
