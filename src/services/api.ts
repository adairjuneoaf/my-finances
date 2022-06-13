// AXIOS Imports
import { api } from "./axios";

// Typings[TypeScript]
import { TransactionDataType } from "./../@types/TransactionDataType";

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

export const getAllTransactions = async () => {
  const data: Array<TransactionDataType> = await api
    .get("/transactions")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  return data;
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
