// Imports React
import React, { useRef } from 'react'

// Chakra Imports
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogProps,
  HStack,
} from '@chakra-ui/react'

// Another Imports
import { FiCheck, FiX } from 'react-icons/fi'

// Typings[TypeScript]
interface IAlertDialogProps {
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
  onSuccess: () => void
}

export const AlertDialogDeleteTransaction: React.FC<IAlertDialogProps> = ({
  isOpen,
  onClose,
  isLoading = false,
  onSuccess,
}) => {
  const alertDialogRef = useRef() as AlertDialogProps['leastDestructiveRef']

  return (
    <AlertDialog
      isCentered
      blockScrollOnMount
      motionPreset='slideInBottom'
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={alertDialogRef}
      size='lg'
      colorScheme='gray'
    >
      <AlertDialogOverlay>
        <AlertDialogContent backgroundColor='gray.800'>
          <AlertDialogHeader>Excluir Lançamento</AlertDialogHeader>
          <AlertDialogBody>Deseja realmente excluir o lançamento selecionado?</AlertDialogBody>
          <AlertDialogFooter>
            <HStack spacing='4'>
              <Button
                type='button'
                aria-label='cancelar-exclusão-lançamento'
                title='Cancelar exclusão'
                leftIcon={<FiX fontSize='18' />}
                colorScheme='whiteAlpha'
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                aria-label='excluir-lançamento'
                title='Confirmar exclusão'
                colorScheme='red'
                isLoading={isLoading}
                leftIcon={<FiCheck fontSize='18' />}
                onClick={onSuccess}
                disabled={isLoading}
              >
                Excluir
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
