// AXIOS Imports
import { apiRoute } from './axios'

// Utils Imports
import { formatDate } from '../utils/formatDate'

// Typings[TypeScript]
import { TransactionDataType } from './../@types/TransactionDataType'
import { CreditorDebtorType } from './../@types/CreditorDebtorType'
import { PaymentMethodType } from './../@types/PaymentMethodType'
import { DataResponseAPI } from '../@types/DataResponseAPI'

interface DataPutType<DataType> {
  id: string
  data: DataType
}

interface DataPatchStatusType {
  id: string
  status: string
}

/**
 * @returns Função de retorno dos dados de todas as transações armazenadas
 * no FaunaDB.
 */
export const getAllTransactions = async () => {
  const data: DataResponseAPI<TransactionDataType> = await apiRoute
    .get('/transactions')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })

  return data.payload
}

/**
 * @returns Função de retorno dos dados de `UMA` única transação armazenada
 * no FaunaDB.
 *
 * @param id ID da transação para ser feita busca no FaunaDB.
 */
export const getUniqueTransaction = async (id: string) => {
  const data: TransactionDataType = await apiRoute
    .get(`/transactions/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })

  const dataFormatted = {
    ...data,
    dateDueTransaction: formatDate(data.dateDueTransaction),
    dateEntriesTransaction: formatDate(data.dateEntriesTransaction),
  }

  return dataFormatted
}

/**
 * @returns Função de `INSERÇÃO` dos dados de UMA única transação armazenada
 * no FaunaDB.
 *
 * @param data Dados da transação para serem inseridos na collection de
 * transactions do FaunaDB.
 */
export const postUniqueTransaction = async (data: TransactionDataType) => {
  await apiRoute
    .post('/transactions', {
      data: data,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })
}

/**
 * @returns Função de `ALTERAÇÃO` dos dados de UMA única transação
 * armazenada no FaunaDB.
 *
 * @param id ID da transação para ser feita busca no FaunaDB.
 *
 * @param data Dados da transação para serem inseridos na alteração dentro
 * da collection de transactions do FaunaDB.
 */
export const putUniqueTransaction = async ({ id, data }: DataPutType<TransactionDataType>) => {
  await apiRoute
    .put(`/transactions/${id}`, {
      transactionData: {
        ...data,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })
}

/**
 * @returns Função de alteração do `STATUS` de `UMA` única
 * transação armazenada no FaunaDB.
 *
 * @param id ID da transação para ser realizada as alterações.
 *
 * @param statusData Tipo do `STATUS(0 ou 1)` da transação para ser realizada
 * alteração na collection de transactions do FaunaDB.
 */
export const patchStatusUniqueTransaction = async (
  id: string,
  statusData: Pick<TransactionDataType, 'status'>,
) => {
  const data = await apiRoute
    .patch(`/transactions/${id}`, {
      transactionData: {
        status: statusData.status,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })

  console.log(data)

  return data
}

/**
 * @returns Função de retorno dos dados de todas os métodos de pagamentos
 * armazenados no FaunaDB.
 */
export const getAllPaymentMethods = async () => {
  const data: DataResponseAPI<PaymentMethodType> = await apiRoute
    .get('/payment_method')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })

  return data.payload
}

/**
 * @returns Função de retorno dos dados de `UM` único método de pagamento
 * armazenado no FaunaDB.
 *
 * @param id ID do método de pagamento para ser feita busca no FaunaDB.
 */
export const getUniquePaymentMethod = async (id: string) => {
  const data: PaymentMethodType = await apiRoute
    .get(`/payment_method/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })

  return data
}

/**
 * @returns Função de `INSERÇÃO` dos dados de `UM` único método de pagamento
 * armazenado no FaunaDB.
 *
 * @param data Dados do método de pagamento para ser inserido na
 * collection de paymentMethods do FaunaDB.
 */
export const postUniquePaymentMethod = async (data: PaymentMethodType) => {
  await apiRoute
    .post('/payment_method', {
      data: data,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error('Error: ', error.message)
    })
}

/**
 * @returns Função de `ALTERAÇÃO` dos dados de `UM` único método de pagamento
 * armazenada no FaunaDB.
 *
 * @param id ID do método de pagamento para ser feita busca no FaunaDB.
 *
 * @param data Dados da transação para serem inseridos na
 * collection de paymentMethods do FaunaDB.
 */

export const putUniquePaymentMethod = async ({ id, data }: DataPutType<PaymentMethodType>) => {
  await apiRoute
    .put(`/payment_method/${id}`, {
      paymentMethodData: {
        ...data,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })
}

/**
 * @returns Função de alteração do `STATUS` de `UM` único método de pagamento
 * armazenado no FaunaDB.
 *
 * @param id ID do método de pagamento para ser realizada as alterações.
 *
 * @param status Tipo do `STATUS(0 ou 1)` do método de pagamento para ser
 * realizada alteração na collection de paymentMethods do FaunaDB.
 */
export const patchStatusUniquePaymentMethod = async ({ id, status }: DataPatchStatusType) => {
  await apiRoute
    .patch(`/payment_method/${id}`, {
      paymentMethodData: {
        status: status,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })
}

/**
 * @returns Função de retorno dos dados de todas os credores/devedores
 * armazenados no FaunaDB.
 */
export const getAllCreditorsDebtors = async () => {
  const data: DataResponseAPI<CreditorDebtorType> = await apiRoute
    .get('/creditor_debtor')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })

  return data.payload
}

/**
 * @returns Função de retorno dos dados de `UM` único credor/devedor
 * armazenado no FaunaDB.
 *
 * @param id ID do credor/devedor para ser feita busca no FaunaDB.
 */
export const getUniqueCreditorDebtor = async (id: string) => {
  const data: CreditorDebtorType = await apiRoute
    .get(`/creditor_debtor/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })

  return data
}

/**
 * @returns Função de `INSERÇÃO` dos dados de `UM` único credor/devedor
 * armazenado no FaunaDB.
 *
 * @param data Dados do credor/devedor para ser inserido na
 * collection de creditorsDebtors do FaunaDB.
 */
export const postUniqueCreditorDebtor = async (data: CreditorDebtorType) => {
  await apiRoute
    .post('/creditor_debtor', {
      data: data,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error('Error: ', error.message)
    })
}

/**
 * @returns Função de `ALTERAÇÃO` dos dados de `UM` único credor/devedor
 * armazenada no FaunaDB.
 *
 * @param id ID do credor/devedor para ser feita busca no FaunaDB.
 *
 * @param data Dados do credor/devedor para ser inserido na
 * collection de creditorsDebtors do FaunaDB.
 */
export const putUniqueCreditorDebtor = async ({ id, data }: DataPutType<CreditorDebtorType>) => {
  await apiRoute
    .put(`/creditor_debtor/${id}`, {
      creditorDebtorData: {
        ...data,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })
}

/**
 * @returns Função de alteração do `STATUS` de `UM` único credor/devedor
 * armazenado no FaunaDB.
 *
 * @param id ID do credor/devedor para ser realizada alteração.
 *
 * @param status Tipo do `STATUS(0 ou 1)` do credor/devedor para ser
 * realizada alteração na collection de creditorsDebtors do FaunaDB.
 */
export const patchStatusUniqueCreditorDebtor = async ({ id, status }: DataPatchStatusType) => {
  await apiRoute
    .patch(`/creditor_debtor/${id}`, {
      creditorDebtorData: {
        status: status,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return console.error('Error', error.message)
    })
}
