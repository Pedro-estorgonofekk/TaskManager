const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Erro na requisição")
  }
  const contentType = res.headers.get("content-type")
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json()
  }
  return res.text()
}

export async function GetTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks")
  return handleResponse(response)
}

export async function PostTask(data: CreateTaskDTO): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, completed: false }), // Backend espera completed false por padrão
  })
  return handleResponse(response)
}

export async function UpdateTask(id: number, data: UpdateTaskDTO): Promise<Task> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function ToggleTaskStatus(id: number, isComplete: boolean): Promise<Task> {
  const endpoint = isComplete ? "complete" : "incomplete"
  const response = await fetch(`/api/tasks/${id}/${endpoint}`, {
    method: "PATCH",
  })
  return handleResponse(response)
}

export async function DeleteTask(id: number): Promise<string> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  })
  return handleResponse(response)
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