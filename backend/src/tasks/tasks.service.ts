//aqui é a logica por tras dos metodos, olha ali o metodo get task
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'


@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService){}

    async GetTasks(){
        return await this.prisma.task.findMany({orderBy: 
            [
                {completed:'asc'}, {createdAt:'asc'}
            ]
        })
    }

    async CreateTask(createTaskDto: CreateTaskDto){
        return await this.prisma.task.create({data: createTaskDto})
    }

    async UpdateTask(id: number, updateTaskDto: UpdateTaskDto){
        return await this.prisma.task.update({
            where: {id},
            data: updateTaskDto
        })
    }
 
    async CompleteTask(id: number){
        return await this.prisma.task.update({
            where: {id},
            data: {
                completed: true,
            },
        })
    }
 
    async IncompleteTask(id: number){
        return await this.prisma.task.update({
            where: {id},
            data: {
                completed: false,
            },
        })
    }
 
    async DeleteTask(id: number){
        return await this.prisma.task.delete({
            where: {id},
        })
    }
}
