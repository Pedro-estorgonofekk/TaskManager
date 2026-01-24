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
            date: '2026-01-19',
            completed: false,
        },
        {
            id: 2,
            title: 'Colher a hortelã',
            description: 'Ir ao jardim e colher a hortelã durante a tarde',
            date: '2026-01-19',
            completed: true,
        }
    ]
    private nextId = Math.max(0, ...this.tasks.map(t => t.id)) + 1

    //Obtenção de todas as tarefas criadas
    GetTasks(): Task[] {
        return this.tasks
    }

    //Criação de novas tarefas, Omit é mt legal pra esse tipo de situação
    CreateTask(data: Omit<Task, 'id'>): Task {
        const newTask: Task = {
            id: this.nextId++,
            ...data,
        };

        this.tasks.push(newTask)
        return newTask

    }

    UpdateTask(id: number, data) {
        for (const [index, task] of this.tasks.entries()) {
            if (task.id == id) {
                const updatedTask = {
                    id: task.id,
                    ...data
                }
                this.tasks.splice(index, 1, updatedTask)
                return updatedTask
            }
        }
        return "Tarefa não encontrada"
    }

    CompleteTask(id: number){
        for (const task of this.tasks) {
            if (task.id == id) {
                task.completed = true
                return task
            }
        }
        return "Tarefa não encontrada"

    }

    IncompleteTask(id: number){
        for (const task of this.tasks) {
            if (task.id == id) {
                task.completed = false
                return task
            }
        }
        return "Tarefa não encontrada"
    }
    DeleteTask(id: number){
        for (const [index, task] of this.tasks.entries()){
            if (task.id == id){
                this.tasks.splice(index, 1)
                return `Tarefa ${id} deletada`
            }
        }
        return "Tarefa não encontrada"
    }
}
