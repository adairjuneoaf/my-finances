// Imports React
import React, { useRef } from 'react'

// Chakra Imports
import {
  Button,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogProps,
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

export default function AlertDialogDeleteTransaction({
  isOpen,
  onClose,
  onSuccess,
  isLoading = false,
}: IAlertDialogProps) {
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
