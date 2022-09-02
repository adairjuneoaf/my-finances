// React Imports
import { ReactNode } from 'react'

// Chakra Imports
import { UseDisclosureReturn } from '@chakra-ui/react'

// Typings[TypeScript]

export interface ContextProviderProps {
  children?: ReactNode
}

export interface DashboardPageContextProps {
  value: boolean
}

export interface TransactionsPageContextProps {
  isEditing: boolean
  isLoading: boolean
  toggleIsEditing: () => void
  toggleIsLoading: () => void
  modalDisclosure: UseDisclosureReturn
  dialogDisclosure: UseDisclosureReturn
  drawerDisclosure: UseDisclosureReturn
  transactionIdForEdit: string | null
  transactionIdForDelete: string | null
  transactionIdForViewDetails: string | null
  resetTransactionIdForEdit: () => void
  selectTransactionIdForEdit: (id: string) => void
  resetTransactionIdForDelete: () => void
  selectTransactionIdForDelete: (id: string) => void
  resetTransactionIdForViewDetails: () => void
  selectTransactionIdForViewDetails: (id: string) => void
}

export interface PaymentMethodsPageContextProps {
  isEditing: boolean
  isLoading: boolean
  toggleIsEditing: () => void
  toggleIsLoading: () => void
  modalDisclosure: UseDisclosureReturn
  dialogDisclosure: UseDisclosureReturn
  drawerDisclosure: UseDisclosureReturn
  paymentMethodIdForEdit: string | null
  resetPaymentMethodIdForEdit: () => void
  selectPaymentMethodIdForEdit: (id: string) => void
  paymentMethodIdForViewDetails: string | null
  resetPaymentMethodIdForViewDetails: () => void
  selectPaymentMethodIdForViewDetails: (id: string) => void
}

export interface CreditorsDebtorsPageContextProps {
  isEditing: boolean
  isLoading: boolean
  disclosure: UseDisclosureReturn
  toggleIsEditing: () => void
  toggleIsLoading: () => void
  creditorDebtorIdForEdit: string | null
  resetCreditorDebtorIdForEdit: () => void
  selectCreditorDebtorIdForEdit: (id: string) => void
}
