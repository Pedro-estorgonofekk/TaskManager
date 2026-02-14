export async function GetTasks(): Promise<Task[]> {
    const response = await fetch("/api/tasks")
    if (!response.ok){
        throw new Error("Erro ao buscar dados")
    } 
    return await response.json()
}

export async function PostTask(/*data:CreateTaskDTO*/) {
    return "Criar tarefa"
}

export async function UpdateTask(/*data:UpdateTaskDTO, id:number*/) {
    return "Atualizar tarefa"
}

export async function CompleteTask(/*id:number*/) {
    return "Completar tarefa"
}

export async function IncompleteTask(/*id:number*/) {
    return "Descompletar tarefa"
}

export type Task = {
    id: number
    title: string
    description?: string
    completed: boolean
    createdAt: string
    updatedAt: string
}

export type CreateTaskDTO = {
  title: string
  description?: string
}

export type UpdateTaskDTO = {
  title?: string
  description?: string
}