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
    private nextId = Math.max(0, ...this.tasks.map(t => t.id)) + 1

    GetTasks(): Task[] {
        return this.tasks
    }
    CreateTask(data: Omit<Task, 'id'>): Task {
        const newTask: Task = {
            id: this.nextId++,
            ...data,
        };

        this.tasks.push(newTask)
        return newTask
    }
}
