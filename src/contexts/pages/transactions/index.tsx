// Imports React
import { createContext, useCallback, useEffect, useState } from 'react'

// Imports Next
import { useRouter } from 'next/router'

// Imports Chakra
import { useDisclosure } from '@chakra-ui/react'

// Types[TypeScript]
import { ContextProviderProps, TransactionsPageContextProps } from '../../types'

export const TransactionsPageContext = createContext({} as TransactionsPageContextProps)

export const TransactionsPageContextProvider = ({ children }: ContextProviderProps) => {
  const { route } = useRouter()
  const disclosure = useDisclosure()
  const modalDisclosure = useDisclosure()
  const dialogDisclosure = useDisclosure()

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transactionIdForEdit, setTransactionIdForEdit] = useState<string | null>(null)
  const [transactionIdForDelete, setTransactionIdForDelete] = useState<string | null>(null)

  useEffect(() => {
    if (disclosure.isOpen) {
      disclosure.onClose()
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

  return (
    <TransactionsPageContext.Provider
      value={{
        isEditing,
        isLoading,
        disclosure,
        toggleIsEditing,
        toggleIsLoading,
        modalDisclosure,
        dialogDisclosure,
        transactionIdForEdit,
        transactionIdForDelete,
        resetTransactionIdForEdit,
        selectTransactionIdForEdit,
        selectTransactionIdForDelete,
        resetTransactionIdForDelete,
      }}
    >
      {children}
    </TransactionsPageContext.Provider>
  )
}
