import { useEffect, useState } from "react";
import { ChakraProvider, Container, VStack, Heading, Button, useToast, Flex, Spinner, useDisclosure, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { GetTasks, PostTask, UpdateTask, ToggleTaskStatus, DeleteTask,  } from "./api/api.ts";
import type {Task, CreateTaskDTO, UpdateTaskDTO} from "./api/api.ts";
import { TaskItem } from "./components/TaskItem";
import { TaskModal } from "./components/TaskModal";

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const data = await GetTasks()
      
      // Lógica de Ordenação no Frontend (conforme requisito)
      // 1. Não concluídas primeiro
      // 2. Data de criação (mais antiga -> mais recente)
      const sortedData = data.sort((a, b) => {
        if (a.completed === b.completed) {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }
        return a.completed ? 1 : -1
      })

      setTasks(sortedData)
    } catch (error) {
      toast({ title: "Erro ao carregar tarefas", status: "error", duration: 3000 })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSave = async (data: CreateTaskDTO) => {
    setIsSaving(true)
    try {
      if (editingTask) {
        await UpdateTask(editingTask.id, data as UpdateTaskDTO)
        toast({ title: "Tarefa atualizada!", status: "success" })

      } else {
        await PostTask(data)
        toast({ title: "Tarefa criada!", status: "success" })

      }
      onClose()
      setEditingTask(null)
      fetchTasks()
    } catch (error) {
      toast({ title: "Erro ao salvar", description: String(error), status: "error" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggle = async (id: number, currentStatus: boolean) => {
    const originalTasks = [...tasks]
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !currentStatus } : t))

    try {
      await ToggleTaskStatus(id, !currentStatus)
      fetchTasks()
    } catch (error) {
      setTasks(originalTasks)
      toast({ title: "Erro ao atualizar status", status: "error" })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return
    
    try {
      await DeleteTask(id)
      setTasks(tasks.filter(t => t.id !== id))
      toast({ title: "Tarefa removida", status: "info" })
    } catch (error) {
      toast({ title: "Erro ao deletar", status: "error" })
    }
  }

  const openCreateModal = () => {
    setEditingTask(null)
    onOpen()
  }

  const openEditModal = (task: Task) => {
    setEditingTask(task)
    onOpen()
  }

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={10}>
        <VStack spacing={8} align="stretch">
          
          <Flex justify="space-between" align="center">
            <Heading>Task Manager</Heading>
            <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={openCreateModal}>
              Nova Tarefa
            </Button>
          </Flex>

          {isLoading ? (
            <Flex justify="center" py={10}><Spinner size="xl" /></Flex>
          ) : tasks.length === 0 ? (
             <Alert status="info" borderRadius="md">
                <AlertIcon />
                <AlertTitle>Nenhuma tarefa!</AlertTitle>
                <AlertDescription>Crie uma nova tarefa para começar.</AlertDescription>
             </Alert>
          ) : (
            <VStack spacing={4} align="stretch">
              {tasks.map((task) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={openEditModal}
                />
              ))}
            </VStack>
          )}
        </VStack>

        <TaskModal 
          isOpen={isOpen} 
          onClose={onClose} 
          onSave={handleSave} 
          initialData={editingTask}
          isLoading={isSaving}
        />
      </Container>
    </ChakraProvider>
  )
}

export default App