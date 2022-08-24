// Imports React
import { createContext, useEffect, useState } from 'react'

// Imports Next
import { useRouter } from 'next/router'

// Imports Chakra
import { useDisclosure } from '@chakra-ui/react'

// Types[TypeScript]
import { ContextProviderProps, CreditorsDebtorsPageContextProps } from '../../types'

export const CreditorsDebtorsPageContext = createContext({} as CreditorsDebtorsPageContextProps)

export const CreditorsDebtorsPageContextProvider = ({ children }: ContextProviderProps) => {
  const { route } = useRouter()
  const disclosure = useDisclosure()

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [creditorDebtorIdForEdit, setCreditorDebtorIdForEdit] = useState<string | null>(null)

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

  const selectCreditorDebtorIdForEdit = (id: string) => {
    setCreditorDebtorIdForEdit(id)
  }

  const resetCreditorDebtorIdForEdit = () => {
    setCreditorDebtorIdForEdit(null)
  }
  return (
    <CreditorsDebtorsPageContext.Provider
      value={{
        isEditing,
        isLoading,
        disclosure,
        toggleIsEditing,
        toggleIsLoading,
        creditorDebtorIdForEdit,
        resetCreditorDebtorIdForEdit,
        selectCreditorDebtorIdForEdit,
      }}
    >
      {children}
    </CreditorsDebtorsPageContext.Provider>
  )
}
