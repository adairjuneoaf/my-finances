// React-Query Imports
import { useQueryClient } from 'react-query'

// Typings[TypeScript]
import { PaymentMethodType } from '../../../../../@types/PaymentMethodType'

const getDataPaymentMethod = (id: string | null) => {
  const queryClient = useQueryClient()

  const paymentMethodData = queryClient.getQueryData<Array<PaymentMethodType>>(['payment_methods'])

  const paymentMethod = paymentMethodData?.find((paymentMethod) => paymentMethod.id === id)

  return { paymentMethod }
}

export { getDataPaymentMethod }
