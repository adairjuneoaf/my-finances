// Imports React
import { createContext, useEffect, useState } from 'react'

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

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transactionIdForEdit, setTransactionIdForEdit] = useState<string | null>(null)

  useEffect(() => {
    if (disclosure.isOpen) {
      disclosure.onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route])

  const toggleIsEditing = () => {
    setIsEditing((prevState) => !prevState)
  }

  const toggleIsLoading = () => {
    setIsLoading((prevState) => !prevState)
  }

  const selectTransactionIdForEdit = (id: string) => {
    setTransactionIdForEdit(id)
  }

  const resetTransactionIdForEdit = () => {
    setTransactionIdForEdit(null)
  }

  return (
    <TransactionsPageContext.Provider
      value={{
        isEditing,
        isLoading,
        disclosure,
        toggleIsEditing,
        toggleIsLoading,
        transactionIdForEdit,
        resetTransactionIdForEdit,
        selectTransactionIdForEdit,
      }}
    >
      {children}
    </TransactionsPageContext.Provider>
  )
}
