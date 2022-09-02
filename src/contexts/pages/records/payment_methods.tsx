// Imports React
import { useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

// Imports Next
import { useRouter } from 'next/router'

// Imports Chakra
import { useDisclosure } from '@chakra-ui/react'

// Types[TypeScript]
import { ContextProviderProps, PaymentMethodsPageContextProps } from '../../types'

export const PaymentMethodsPageContext = createContext({} as PaymentMethodsPageContextProps)

export const PaymentMethodsPageContextProvider = ({ children }: ContextProviderProps) => {
  const { route } = useRouter()
  const drawerDisclosure = useDisclosure()
  const modalDisclosure = useDisclosure()
  const dialogDisclosure = useDisclosure()

  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethodIdForEdit, setPaymentMethodIdForEdit] = useState<string | null>(null)
  const [paymentMethodIdForViewDetails, setPaymentMethodIdForViewDetails] = useState<string | null>(
    null,
  )

  useEffect(() => {
    if (drawerDisclosure.isOpen || modalDisclosure.isOpen || dialogDisclosure.isOpen) {
      modalDisclosure.onClose()
      dialogDisclosure.onClose()
      drawerDisclosure.onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route])

  const toggleIsEditing = useCallback(() => {
    setIsEditing((prevState) => !prevState)
  }, [])

  const toggleIsLoading = useCallback(() => {
    setIsLoading((prevState) => !prevState)
  }, [])

  const selectPaymentMethodIdForEdit = useCallback((id: string) => {
    setPaymentMethodIdForEdit(id)
  }, [])

  const resetPaymentMethodIdForEdit = useCallback(() => {
    setPaymentMethodIdForEdit(null)
  }, [])

  const selectPaymentMethodIdForViewDetails = useCallback((id: string) => {
    setPaymentMethodIdForViewDetails(id)
  }, [])

  const resetPaymentMethodIdForViewDetails = useCallback(() => {
    setPaymentMethodIdForViewDetails(null)
  }, [])

  return (
    <PaymentMethodsPageContext.Provider
      value={{
        isEditing,
        isLoading,
        toggleIsEditing,
        toggleIsLoading,
        modalDisclosure,
        dialogDisclosure,
        drawerDisclosure,
        paymentMethodIdForEdit,
        resetPaymentMethodIdForEdit,
        selectPaymentMethodIdForEdit,
        paymentMethodIdForViewDetails,
        resetPaymentMethodIdForViewDetails,
        selectPaymentMethodIdForViewDetails,
      }}
    >
      {children}
    </PaymentMethodsPageContext.Provider>
  )
}
