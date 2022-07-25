// Imports React
import React, { useContext } from 'react'

// Chakra Imports
import {
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'

// Contexts Imports
import { ContextDrawer } from '../../../contexts/contextDrawer'

// Another Imports
import { FiEdit, FiTrash, FiEye, FiMoreVertical } from 'react-icons/fi'

// Typings[TypeScript]
import { IPopoverSubMenu } from './types'
import { AlertDialogDeleteTransaction } from '../AlertDialogDelete'

const PopoverSubMenuComponent: React.FC<IPopoverSubMenu> = ({ transactionID }) => {
  const { handleDrawerEditTransaction } = useContext(ContextDrawer)

  const alertDialogDisclosure = useDisclosure()

  const excludeTransaction = () => {
    console.log('teste exclude function')
  }

  return (
    <Popover>
      <AlertDialogDeleteTransaction
        onSuccess={excludeTransaction}
        isOpen={alertDialogDisclosure.isOpen}
        onClose={alertDialogDisclosure.onClose}
      />
      <Tooltip hasArrow label='Ações' shouldWrapChildren marginTop='3'>
        <PopoverTrigger>
          <Button backgroundColor='transparent' _hover={{ backgroundColor: 'gray.900' }}>
            <FiMoreVertical fontSize='24' color='white' />
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent backgroundColor='gray.800' width='fit-content'>
        <PopoverBody>
          <HStack>
            <Tooltip hasArrow label='Detalhes'>
              <IconButton
                aria-label='more-details-transaction'
                icon={<FiEye fontSize='24' color='white' />}
                backgroundColor='blue.500'
                colorScheme='blue'
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
  )
}

export default PopoverSubMenuComponent
