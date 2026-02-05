//aqui conecta o controller e o service pra mandar o appmodule
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
