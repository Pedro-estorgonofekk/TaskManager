//aqui é onde todos os módulos se encontra, olha eles aqui em baixo⬇️

import { Module } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  providers: [TasksService],
})
export class AppModule {}
