// AXIOS Imports
import { api } from "./axios";

// Utils Imports
import { formatDate } from "../utils/formatDate";

// Typings[TypeScript]
import { TransactionDataType } from "./../@types/TransactionDataType";
import { formatValueToMoney } from "../utils/formatValueToMoney";

type DataPaymentsMethodAPI = {
  id: string;
  title: string;
  status: number;
  anotherInformation: string;
};

type DataCreditorDebtorAPI = {
  id: string;
  title: string;
  status: number;
  anotherInformation: string;
};

interface AllTransactionsFormated extends TransactionDataType {
  valueTransactionFormated: string;
}

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
  }))

  console.log(data);

  return data;
};

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
  const data: Array<DataPaymentsMethodAPI> = await api
    .get("/payment_method")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  return data;
};

export const getAllCreditorsDebtors = async () => {
  const data: Array<DataCreditorDebtorAPI> = await api
    .get("/creditor_debtor")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  return data;
};
