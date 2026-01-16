import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusController } from './status/status.controller';
import { StatusModule } from './status/status.module';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [StatusModule, TasksModule],
  controllers: [AppController, StatusController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
