import { Injectable } from '@nestjs/common';


@Injectable()
export class TasksService {
    GetTasks(): string {
        const task = {
            'title': 'Fazer chá'
        };
        return `Tarefas: ${task.title}`
    }
}
