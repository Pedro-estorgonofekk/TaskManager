//aqui é a logica, olha ali o metodo get task
import { Injectable } from '@nestjs/common';


@Injectable()
export class TasksService {
    private task = [
        {
            'title': 'Fazer chá',
            'description': 'Pegar o ortelã e fazer o chá',
            'date': '2026/12/27',
            'complete': false
        },
        {
            'title': 'Colher a ortelã',
            'description': 'ir ao jardim e colher a ortelã',
            'date': '2026/12/27',
            'complete': true
        }
    ]

    GetTasks(): any {
        return this.task
    }
}
