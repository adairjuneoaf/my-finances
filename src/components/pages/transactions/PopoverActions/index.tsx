// Imports React
import React from 'react'
import { useContextSelector } from 'use-context-selector'

// Chakra Imports
import { HStack, IconButton, Tooltip } from '@chakra-ui/react'

// Contexts Imports
import { TransactionsPageContext } from '../../../../contexts/pages/transactions'

// Another Imports
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi'

// Typings[TypeScript]
interface PopoverActionProps {
  id: string
}

const PopoverSubMenu: React.FC<PopoverActionProps> = ({ id }) => {
  const dialogDisclosure = useContextSelector(
    TransactionsPageContext,
    (values) => values.dialogDisclosure,
  )
  const modalDisclosure = useContextSelector(
    TransactionsPageContext,
    (values) => values.modalDisclosure,
  )
  const drawerDisclosure = useContextSelector(
    TransactionsPageContext,
    (values) => values.drawerDisclosure,
  )
  const toggleIsEditing = useContextSelector(
    TransactionsPageContext,
    (values) => values.toggleIsEditing,
  )
  const toggleIsLoading = useContextSelector(
    TransactionsPageContext,
    (values) => values.toggleIsLoading,
  )
  const selectTransactionIdForEdit = useContextSelector(
    TransactionsPageContext,
    (values) => values.selectTransactionIdForEdit,
  )
  const selectTransactionIdForDelete = useContextSelector(
    TransactionsPageContext,
    (values) => values.selectTransactionIdForDelete,
  )
  const selectTransactionIdForViewDetails = useContextSelector(
    TransactionsPageContext,
    (values) => values.selectTransactionIdForViewDetails,
  )

  const handleDeleteTransaction = (id: string) => {
    selectTransactionIdForDelete(id)
    dialogDisclosure.onOpen()
  }

  const handleEditTransaction = (id: string) => {
    selectTransactionIdForEdit(id)
    toggleIsEditing()
    toggleIsLoading()
    drawerDisclosure.onOpen()
  }

  const handleViewDetailsTransaction = (id: string) => {
    selectTransactionIdForViewDetails(id)
    modalDisclosure.onOpen()
  }

  return (
    <HStack>
      <Tooltip hasArrow label='Detalhes'>
        <IconButton
          aria-label='more-details-transaction'
          icon={<FiEye fontSize='24' color='white' />}
          backgroundColor='blue.500'
          colorScheme='blue'
          onClick={() => {
            handleViewDetailsTransaction(id)
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
            handleEditTransaction(id)
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
  )
}

export default PopoverSubMenu
