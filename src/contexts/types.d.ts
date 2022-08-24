// React Imports
import { ReactNode } from 'react'

// Chakra Imports
import { UseDisclosureReturn } from '@chakra-ui/react'

// Typings[TypeScript]
import { DrawerTypes } from '../@types/DrawerTypes'

export interface ContextProviderProps {
  children?: ReactNode
}

export interface ContextDrawerValuesProps {
  isEditing: boolean
  disclosure: UseDisclosureReturn
  drawerType: DrawerTypes
  transactionID: string | null
  paymentMethodID: string | null
  creditorDebtorID: string | null
  isLoadingDataForEdit: boolean
  handleIsLoadingDataForEdit: () => void
  handleResetTransactionID: () => void
  handleResetPaymentMethodID: () => void
  handleResetCreditorDebtorID: () => void
  handleDrawerNewTransaction: () => void
  handleDrawerNewPaymentMethod: () => void
  handleDrawerNewCreditorDebtor: () => void
  handleDrawerEditTransaction: (transactionID: string) => void
  handleDrawerEditPaymentMethod: (paymentMethodID: string) => void
  handleDrawerEditCreditorDebtor: (creditorDebtorID: string) => void
}

export interface DashboardPageContextProps {
  value: boolean
}

export interface TransactionsPageContextProps {
  isEditing: boolean
  isLoading: boolean
  disclosure: UseDisclosureReturn
  toggleIsEditing: () => void
  toggleIsLoading: () => void
  transactionIdForEdit: string | null
  resetTransactionIdForEdit: () => void
  selectTransactionIdForEdit: (id: string) => void
}

export interface RecordsPageContextProps {
  value: boolean
}
