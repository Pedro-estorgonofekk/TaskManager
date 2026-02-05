//aqui é onde todos os módulos se encontra, olha eles aqui em baixo⬇️

import { Module } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TasksModule, PrismaModule],
})
export class AppModule {}
