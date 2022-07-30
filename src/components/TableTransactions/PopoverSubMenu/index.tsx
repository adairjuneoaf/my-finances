// Imports React
import React, { Fragment, useContext, useRef } from 'react'

// Imports Next
import dynamic from 'next/dynamic'

// Chakra Imports
import {
  Button,
  HStack,
  Popover,
  Tooltip,
  IconButton,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// Components Dynamic Imports
const AlertDialogDeleteTransaction = dynamic(() => import('../AlertDialogDelete'), {
  ssr: false,
  suspense: false,
})
const ModalDetailsTransaction = dynamic(() => import('../ModalDetailsTransaction'), {
  ssr: false,
  suspense: false,
})

// Contexts Imports
import { ContextDrawer } from '../../../contexts/contextDrawer'

// API Services
import { deleteUniqueTransaction } from '../../../services/api'

// Another Imports
import { FiEdit, FiTrash, FiEye, FiMoreVertical } from 'react-icons/fi'

// Typings[TypeScript]
import { IPopoverSubMenu } from './types'
import { TransactionDataType } from '../../../@types/TransactionDataType'

const PopoverSubMenuComponent: React.FC<IPopoverSubMenu> = ({ transactionID }) => {
  const { handleDrawerEditTransaction } = useContext(ContextDrawer)

  const transactionSelected = useRef<TransactionDataType | undefined>(undefined)

  const alertDialogDisclosure = useDisclosure()
  const modalOverlayDisclosure = useDisclosure()

  const queryClient = useQueryClient()

  const toast = useToast({
    position: 'top',
    duration: 1000 * 3, // 3 Seconds
    title: 'Lançamentos',
  })

  const getTransaction = (id: string) => {
    const dataCache = queryClient.getQueryData<Array<TransactionDataType>>(['transactions'], {
      active: true,
      stale: false,
    })

    transactionSelected.current = dataCache?.find((transaction) => transaction.id === id)

    modalOverlayDisclosure.onOpen()
  }

  const { mutateAsync, isLoading } = useMutation(deleteUniqueTransaction, {
    onSuccess: () => {
      queryClient.refetchQueries(['transactions'])
    },
  })

  const handleDeleteTransaction = async () => {
    await mutateAsync(
      {
        id: transactionID,
      },
      {
        onSuccess: () => {
          alertDialogDisclosure.onClose()
          toast({ description: 'Lançamento excluído com sucesso!', status: 'success' })
        },
        onError: () => {
          toast({ description: 'Erro na exclusão do lançamento.', status: 'error' })
        },
      },
    )
  }

  return (
    <Fragment>
      <AlertDialogDeleteTransaction
        isLoading={isLoading}
        isOpen={alertDialogDisclosure.isOpen}
        onClose={alertDialogDisclosure.onClose}
        onSuccess={() => {
          handleDeleteTransaction()
        }}
      />
      <ModalDetailsTransaction
        isOpen={modalOverlayDisclosure.isOpen}
        onClose={modalOverlayDisclosure.onClose}
        data={transactionSelected.current}
      />
      <Popover trigger='hover'>
        <Tooltip hasArrow label='Ações' shouldWrapChildren marginTop='3'>
          <PopoverTrigger>
            <Button backgroundColor='transparent' _hover={{ backgroundColor: 'gray.900' }}>
              <FiMoreVertical fontSize='24' color='white' />
            </Button>
          </PopoverTrigger>
        </Tooltip>
        <PopoverContent backgroundColor='gray.800' width='fit-content' borderColor='gray.700'>
          <PopoverBody>
            <HStack>
              <Tooltip hasArrow label='Detalhes'>
                <IconButton
                  aria-label='more-details-transaction'
                  icon={<FiEye fontSize='24' color='white' />}
                  backgroundColor='blue.500'
                  colorScheme='blue'
                  onClick={() => {
                    getTransaction(transactionID)
                  }}
                />
              </Tooltip>
              <Tooltip hasArrow label='Editar'>
                <IconButton
                  aria-label='edit-transaction'
                  icon={<FiEdit fontSize='24' color='white' />}
                  backgroundColor='green.500'
                  colorScheme='green'
                  onClick={() => {
                    handleDrawerEditTransaction(transactionID)
                  }}
                />
              </Tooltip>
              <Tooltip hasArrow label='Excluir'>
                <IconButton
                  aria-label='delete-transaction'
                  icon={<FiTrash fontSize='24' color='white' />}
                  backgroundColor='red.500'
                  colorScheme='red'
                  onClick={alertDialogDisclosure.onOpen}
                />
              </Tooltip>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Fragment>
  )
}

export default PopoverSubMenuComponent
