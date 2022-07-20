// Imports React
import { createContext, useEffect, useState } from 'react'

// Imports Next
import { useRouter } from 'next/router'

// Chakra Imports
import { useDisclosure } from '@chakra-ui/react'

// Typings[Typescript]
import { ContextDrawerProviderProps, ContextDrawerValuesProps } from './types'
import { DrawerTypes } from '../@types/DrawerTypes'

const ContextDrawer = createContext({} as ContextDrawerValuesProps)

const ContextDrawerProvider = ({ children }: ContextDrawerProviderProps) => {
  const disclosure = useDisclosure()
  const [isEditing, setIsEditing] = useState(false)
  const [drawerType, setDrawerType] = useState<DrawerTypes>('default')
  const [transactionID, setTransactionID] = useState<string | null>(null)
  const [paymentMethodID, setPaymentMethodID] = useState<string | null>(null)
  const [creditorDebtorID, setCreditorDebtorID] = useState<string | null>(null)
  const [isLoadingDataForEdit, setIsLoadingDataForEdit] = useState(false)

  const { route } = useRouter()

  useEffect(() => {
    if (disclosure.isOpen) {
      disclosure.onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route])

  /**
   * Functions execute actions to Transactions
   *  */
  const handleDrawerNewTransaction = () => {
    setDrawerType('new-transaction')
    disclosure.onOpen()
  }

  const handleDrawerEditTransaction = (transactionID: string) => {
    setIsEditing(true)
    setIsLoadingDataForEdit(true)
    setTransactionID(transactionID)
    setDrawerType('edit-transaction')
    disclosure.onOpen()
  }

  const handleResetTransactionID = () => {
    setTransactionID(null)
    setIsEditing(false)
  }

  /**
   * Functions execute actions to Payment Methods
   *  */
  const handleDrawerNewPaymentMethod = () => {
    setDrawerType('new-payment-method')
    disclosure.onOpen()
  }

  const handleDrawerEditPaymentMethod = (paymentMethodID: string) => {
    setIsEditing(true)
    setIsLoadingDataForEdit(true)
    setPaymentMethodID(paymentMethodID)
    setDrawerType('edit-payment-method')
    disclosure.onOpen()
  }

  const handleResetPaymentMethodID = () => {
    setPaymentMethodID(null)
    setIsEditing(false)
  }

  /**
   * Functions execute actions to Creditors/Debtors
   *  */
  const handleDrawerNewCreditorDebtor = () => {
    setDrawerType('new-creditor-debtor')
    disclosure.onOpen()
  }

  const handleDrawerEditCreditorDebtor = (creditorDebtorID: string) => {
    setIsEditing(true)
    setIsLoadingDataForEdit(true)
    setCreditorDebtorID(creditorDebtorID)
    setDrawerType('edit-creditor-debtor')
    disclosure.onOpen()
  }

  const handleResetCreditorDebtorID = () => {
    setCreditorDebtorID(null)
    setIsEditing(false)
  }

  const handleIsLoadingDataForEdit = () => {
    setIsLoadingDataForEdit(false)
  }

  return (
    <ContextDrawer.Provider
      value={{
        isEditing,
        disclosure,
        drawerType,
        transactionID,
        paymentMethodID,
        creditorDebtorID,
        isLoadingDataForEdit,
        handleIsLoadingDataForEdit,
        handleResetTransactionID,
        handleResetPaymentMethodID,
        handleResetCreditorDebtorID,
        handleDrawerNewTransaction,
        handleDrawerNewPaymentMethod,
        handleDrawerNewCreditorDebtor,
        handleDrawerEditTransaction,
        handleDrawerEditPaymentMethod,
        handleDrawerEditCreditorDebtor,
      }}
    >
      {children}
    </ContextDrawer.Provider>
  )
}

export { ContextDrawerProvider, ContextDrawer }
