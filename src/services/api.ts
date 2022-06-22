// AXIOS Imports
import { api, apiRoute } from "./axios";

// Utils Imports
import { formatDate } from "../utils/formatDate";
import { formatValueToMoney } from "../utils/formatValueToMoney";

// Typings[TypeScript]
import { TransactionDataType } from "./../@types/TransactionDataType";
import { CreditorDebtorType } from "./../@types/CreditorDebtorType";
import { PaymentMethodType } from "./../@types/PaymentMethodType";

interface AllTransactionsFormated extends TransactionDataType {
  valueTransactionFormated: string;
}

/**
 *
 * @returns Função de retorno dos dados de todas as transações armazenadas
 * na API FAKE.
 */
export const getAllTransactions = async () => {
  const listTransactions: Array<AllTransactionsFormated> = await api
    .get("/transactions")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  const data = listTransactions.map((transaction) => ({
    ...transaction,
    valueTransactionFormated: formatValueToMoney(transaction.valueTransaction),
  }));

  return data;
};

/**
 *
 * @returns Função de retorno dos dados de todas as transações armazenadas
 * no FaunaDB.
 */
export const getAllTransactionsAPIRoute = async () => {
  const listTransactions: Array<AllTransactionsFormated> = await apiRoute
    .get("/transactions")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  const data = listTransactions.map((transaction) => ({
    ...transaction,
    valueTransactionFormated: formatValueToMoney(transaction.valueTransaction),
  }));

  console.log(data);

  return data;
};

/**
 *
 * @returns Função de retorno dos dados de UMA única transação armazenada
 * na API FAKE.
 */
export const getUniqueTransaction = async (id: string) => {
  const data: TransactionDataType = await api
    .get(`/transactions/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  return {
    ...data,
    dateDueTransaction: formatDate(data.dateDueTransaction),
    dateEntriesTransaction: formatDate(data.dateEntriesTransaction),
  };
};

export const getAllPaymentMethods = async () => {
  const data: Array<PaymentMethodType> = await api
    .get("/payment_method")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  return data;
};

export const getUniquePaymentMethod = async (id: string) => {
  const data: PaymentMethodType = await api
    .get(`/payment_method/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  return data;
};

export const getAllCreditorsDebtors = async () => {
  const data: Array<CreditorDebtorType> = await api
    .get("/creditor_debtor")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  return data;
};

export const getUniqueCreditorDebtor = async (id: string) => {
  const data: CreditorDebtorType = await api
    .get(`/creditor_debtor/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  return data;
};
