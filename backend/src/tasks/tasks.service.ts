//aqui é a logica por tras dos metodos, olha ali o metodo get task
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'


@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async GetTasks() {
        return await this.prisma.task.findMany({
            orderBy:
                [
                    { completed: 'asc' }, { createdAt: 'asc' }
                ]
        })
    }

    async CreateTask(createTaskDto: CreateTaskDto) {
        return await this.prisma.task.create({ data: createTaskDto })
    }

    async UpdateTask(id: number, updateTaskDto: UpdateTaskDto) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        })

        if (!task) throw new HttpException("Task não econtrada", HttpStatus.NOT_FOUND)
        
        return await this.prisma.task.update({
            where: { id },
            data: updateTaskDto
        })
    }

    async CompleteTask(id: number) {
        const task = await this.prisma.task.findUnique({
            where: { id }
        })

        if (!task) throw new HttpException("Task não econtrada", HttpStatus.NOT_FOUND)

        return await this.prisma.task.update({
            where: { id },
            data: {
                completed: true,
            },
        })
    }

    async IncompleteTask(id: number) {
        const task = await this.prisma.task.findUnique({
            where: { id }
        })

        if (!task) throw new HttpException("Task não econtrada", HttpStatus.NOT_FOUND)

        return await this.prisma.task.update({
            where: { id },
            data: {
                completed: false,
            },
        })

    }

    async DeleteTask(id: number) {
        const task = await this.prisma.task.findUnique({
            where: { id }
        })

        if (!task) throw new HttpException("Task não econtrada", HttpStatus.NOT_FOUND)
        
        await this.prisma.task.delete({
            where: { id },
        })

        return "Tarefa deletada"
    }
}
