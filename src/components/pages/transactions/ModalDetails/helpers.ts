// React-Query Imports
import { useQueryClient } from 'react-query'

// Typings[TypeScript]
import { CreditorDebtorType } from '../../../../@types/CreditorDebtorType'
import { PaymentMethodType } from '../../../../@types/PaymentMethodType'
import { TransactionDataType } from '../../../../@types/TransactionDataType'

const getDataTransaction = (id: string | null) => {
  const queryClient = useQueryClient()

  const transactionData = queryClient.getQueryData<Array<TransactionDataType>>(['transactions'])
  const paymentMethodData = queryClient.getQueryData<Array<PaymentMethodType>>(['payment_methods'])
  const creditorDebtorData = queryClient.getQueryData<Array<CreditorDebtorType>>([
    'creditors_debtors',
  ])

  const transaction = transactionData?.find((transaction) => transaction.id === id)
  const paymentMethod = paymentMethodData?.find((paymentMethod) => paymentMethod.id === id)?.title
  const creditorDebtor = creditorDebtorData?.find(
    (creditorDebtor) => creditorDebtor.id === id,
  )?.title

  return { transaction, paymentMethod, creditorDebtor }
}

export { getDataTransaction }
