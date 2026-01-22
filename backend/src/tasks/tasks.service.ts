//aqui é a logica por tras dos metodos, olha ali o metodo get task
import { Injectable } from '@nestjs/common';

type Task = {
    id: number,
    title: string,
    description: string,
    date: string,
    completed: boolean
}

@Injectable()
export class TasksService {
    private tasks: Task[] = [
        {
            id: 1,
            title: 'Fazer chá',
            description: 'Pegar o hortelã e fazer o chá noturno',
            date: '2026/12/27',
            completed: false,
        },
        {
            id: 2,
            title: 'Colher a hortelã',
            description: 'Ir ao jardim e colher a hortelã durante a tarde',
            date: '2026/12/27',
            completed: true,
        }
    ]

    GetTasks(): Task[] {
        return this.tasks
    }
    CreateTask(): any {
        this.tasks.push({
            id: 3,
            title: 'Louça',
            description: 'lavar a louça do chá',
            date: '2026/12/28',
            completed: false
        })
        return this.tasks[2]
    }
}
