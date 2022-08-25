// Imports React
import React, { useContext } from 'react'

// Chakra Imports
import {
  HStack,
  IconButton,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  Tooltip,
} from '@chakra-ui/react'

// Contexts Imports
import { TransactionsPageContext } from '../../../../contexts/pages/transactions'

// Another Imports
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi'

// Typings[TypeScript]
interface PopoverActionProps {
  id: string
}

const PopoverSubMenu: React.FC<PopoverActionProps> = ({ id }) => {
  const { dialogDisclosure, selectTransactionIdForDelete } = useContext(TransactionsPageContext)

  const { onOpen } = dialogDisclosure

  // const transactionSelected = useRef<TransactionDataType | undefined>(undefined)

  // const alertDialogDisclosure = useDisclosure()
  // const modalOverlayDisclosure = useDisclosure()

  // const queryClient = useQueryClient()

  // const toast = useToast({
  //   position: 'top',
  //   duration: 1000 * 3, // 3 Seconds
  //   title: 'Lançamentos',
  // })

  // const getTransaction = (id: string) => {
  //   const dataCache = queryClient.getQueryData<Array<TransactionDataType>>(['transactions'], {
  //     active: true,
  //     stale: false,
  //   })

  //   transactionSelected.current = dataCache?.find((transaction) => transaction.id === id)

  //   modalOverlayDisclosure.onOpen()
  // }

  // const handleEditTransaction = (id: string) => {
  //   selectTransactionIdForEdit(id)
  //   toggleIsEditing()
  //   toggleIsLoading()
  //   disclosure.onOpen()
  // }

  const handleDeleteTransaction = (id: string) => {
    selectTransactionIdForDelete(id)
    onOpen()
  }

  return (
    <PopoverContent backgroundColor='gray.800' width='fit-content' borderColor='gray.700'>
      <PopoverArrow backgroundColor='gray.800' />
      <PopoverBody>
        <HStack>
          <Tooltip hasArrow label='Detalhes'>
            <IconButton
              aria-label='more-details-transaction'
              icon={<FiEye fontSize='24' color='white' />}
              backgroundColor='blue.500'
              colorScheme='blue'
              onClick={() => {
                // getTransaction(id)
                console.log(id)
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
                // handleEditTransaction(id)
                console.log(id)
              }}
            />
          </Tooltip>
          <Tooltip hasArrow label='Excluir'>
            <IconButton
              aria-label='delete-transaction'
              icon={<FiTrash fontSize='24' color='white' />}
              backgroundColor='red.500'
              colorScheme='red'
              onClick={() => {
                handleDeleteTransaction(id)
              }}
            />
          </Tooltip>
        </HStack>
      </PopoverBody>
    </PopoverContent>
  )
}

export default PopoverSubMenu
