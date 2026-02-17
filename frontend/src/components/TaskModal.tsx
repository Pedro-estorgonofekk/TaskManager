import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Textarea, VStack} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { CreateTaskDTO, Task } from "../api/api.ts";

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (task: CreateTaskDTO) => void
  initialData?: Task | null
  isLoading: boolean
}

export function TaskModal({ isOpen, onClose, onSave, initialData, isLoading }: TaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title || "")
      setDescription(initialData?.description || "")
    }
  }, [isOpen, initialData])

  const handleSubmit = () => {
    if (!title.trim()) return
    onSave({ title, description })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? "Editar Tarefa" : "Nova Tarefa"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Título</FormLabel>
              <Input 
                placeholder="Ex: Estudar NestJS" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Textarea 
                placeholder="Detalhes da tarefa..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>Cancelar</Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}