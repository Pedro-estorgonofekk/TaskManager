import { Box, HStack, Text, IconButton, Checkbox, Spacer, useColorModeValue } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"; // npm i @chakra-ui/icons se necessário, ou use react-icons
import type { Task } from "../api/api";

interface TaskItemProps {
  task: Task
  onToggle: (id: number, currentStatus: boolean) => void
  onDelete: (id: number) => void
  onEdit: (task: Task) => void
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const bg = useColorModeValue("white", "gray.700")
  
  return (
    <Box 
      p={4} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="md" 
      bg={bg}
      opacity={task.completed ? 0.6 : 1}
      _hover={{ shadow: "lg" }}
      transition="all 0.2s"
    >
      <HStack>
        <Checkbox 
          isChecked={task.completed} 
          onChange={() => onToggle(task.id, task.completed)}
          size="lg"
          colorScheme="green"
        />
        
        <Box pl={2} flex="1">
          <Text 
            fontWeight="bold" 
            textDecoration={task.completed ? "line-through" : "none"}
            fontSize="lg"
          >
            {task.title}
          </Text>
          {task.description && (
            <Text fontSize="sm" color="gray.500" noOfLines={2}>
              {task.description}
            </Text>
          )}
        </Box>

        <Spacer />

        <HStack>
          <IconButton
            aria-label="Editar"
            icon={<EditIcon />}
            size="sm"
            onClick={() => onEdit(task)}
            isDisabled={task.completed} // Opcional: bloquear edição se concluída
          />
          <IconButton
            aria-label="Deletar"
            icon={<DeleteIcon />}
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={() => onDelete(task.id)}
          />
        </HStack>
      </HStack>
    </Box>
  )
}