import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    @Post()
    
    @Get()
    getHello(): string{
        return 'legal cara'
    }

}
