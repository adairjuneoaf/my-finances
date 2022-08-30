// Imports React
import { useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

// Imports Next
import { useRouter } from 'next/router'

// Imports Chakra
import { useDisclosure } from '@chakra-ui/react'

// Types[TypeScript]
import { ContextProviderProps, TransactionsPageContextProps } from '../../types'

export const TransactionsPageContext = createContext({} as TransactionsPageContextProps)

export const TransactionsPageContextProvider = ({ children }: ContextProviderProps) => {
  const { route } = useRouter()
  const drawerDisclosure = useDisclosure()
  const modalDisclosure = useDisclosure()
  const dialogDisclosure = useDisclosure()

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transactionIdForEdit, setTransactionIdForEdit] = useState<string | null>(null)
  const [transactionIdForDelete, setTransactionIdForDelete] = useState<string | null>(null)
  const [transactionIdForViewDetails, setTransactionIdForViewDetails] = useState<string | null>(
    null,
  )

  useEffect(() => {
    if (drawerDisclosure.isOpen || modalDisclosure.isOpen || dialogDisclosure.isOpen) {
      drawerDisclosure.onClose()
      modalDisclosure.onClose()
      dialogDisclosure.onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route])

  const toggleIsEditing = useCallback(() => {
    setIsEditing((prevState) => !prevState)
  }, [])

  const toggleIsLoading = useCallback(() => {
    setIsLoading((prevState) => !prevState)
  }, [])

  const selectTransactionIdForEdit = useCallback((id: string) => {
    setTransactionIdForEdit(id)
  }, [])

  const resetTransactionIdForEdit = useCallback(() => {
    setTransactionIdForEdit(null)
  }, [])

  const selectTransactionIdForDelete = useCallback((id: string) => {
    setTransactionIdForDelete(id)
  }, [])

  const resetTransactionIdForDelete = useCallback(() => {
    setTransactionIdForDelete(null)
  }, [])

  const selectTransactionIdForViewDetails = useCallback((id: string) => {
    setTransactionIdForViewDetails(id)
  }, [])

  const resetTransactionIdForViewDetails = useCallback(() => {
    setTransactionIdForViewDetails(null)
  }, [])

  return (
    <TransactionsPageContext.Provider
      value={{
        isEditing,
        isLoading,
        toggleIsEditing,
        toggleIsLoading,
        modalDisclosure,
        drawerDisclosure,
        dialogDisclosure,
        transactionIdForEdit,
        transactionIdForDelete,
        transactionIdForViewDetails,
        resetTransactionIdForEdit,
        selectTransactionIdForEdit,
        selectTransactionIdForDelete,
        resetTransactionIdForDelete,
        resetTransactionIdForViewDetails,
        selectTransactionIdForViewDetails,
      }}
    >
      {children}
    </TransactionsPageContext.Provider>
  )
}
