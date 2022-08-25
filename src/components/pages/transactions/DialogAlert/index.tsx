// Imports React
import { useContext, useRef } from 'react'

// Chakra Imports
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react'

// Context Imports
import { TransactionsPageContext } from '../../../../contexts/pages/transactions'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// API Imports
import { deleteUniqueTransaction } from '../../../../services/api'

// Another Imports
import { FiCheck, FiX } from 'react-icons/fi'

const DialogAlertDeleteTransaction = () => {
  const alertDialogRef = useRef() as AlertDialogProps['leastDestructiveRef']

  const { dialogDisclosure, transactionIdForDelete, resetTransactionIdForDelete } =
    useContext(TransactionsPageContext)

  const { isOpen, onClose } = dialogDisclosure

  const queryClient = useQueryClient()

  const toast = useToast({
    position: 'top',
    duration: 1000 * 3, // 3 Seconds
    title: 'Lançamentos',
  })

  const { mutateAsync, isLoading } = useMutation(deleteUniqueTransaction, {
    onSuccess: () => {
      queryClient.refetchQueries(['transactions'])
    },
  })

  const handleDeleteTransaction = async () => {
    await mutateAsync(
      {
        id: String(transactionIdForDelete),
      },
      {
        onSuccess: () => {
          onClose()
          resetTransactionIdForDelete()
          toast({ description: 'Lançamento excluído com sucesso!', status: 'success' })
        },
        onError: () => {
          toast({ description: 'Erro na exclusão do lançamento.', status: 'error' })
        },
      },
    )
  }

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
                onClick={handleDeleteTransaction}
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

export default DialogAlertDeleteTransaction
