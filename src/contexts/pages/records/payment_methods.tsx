// Imports React
import { createContext, useEffect, useState } from 'react'

// Imports Next
import { useRouter } from 'next/router'

// Imports Chakra
import { useDisclosure } from '@chakra-ui/react'

// Types[TypeScript]
import { ContextProviderProps, PaymentMethodsPageContextProps } from '../../types'

export const PaymentMethodsPageContext = createContext({} as PaymentMethodsPageContextProps)

export const PaymentMethodsPageContextProvider = ({ children }: ContextProviderProps) => {
  const { route } = useRouter()
  const disclosure = useDisclosure()

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethodIdForEdit, setPaymentMethodIdForEdit] = useState<string | null>(null)

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

  const selectPaymentMethodIdForEdit = (id: string) => {
    setPaymentMethodIdForEdit(id)
  }

  const resetPaymentMethodIdForEdit = () => {
    setPaymentMethodIdForEdit(null)
  }
  return (
    <PaymentMethodsPageContext.Provider
      value={{
        isEditing,
        isLoading,
        disclosure,
        toggleIsEditing,
        toggleIsLoading,
        paymentMethodIdForEdit,
        resetPaymentMethodIdForEdit,
        selectPaymentMethodIdForEdit,
      }}
    >
      {children}
    </PaymentMethodsPageContext.Provider>
  )
}
