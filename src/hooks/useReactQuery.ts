// React-Query Imports
import { useQuery } from "react-query";

// API Imports
import { getAllCreditorsDebtors, getAllPaymentMethods, getAllTransactions } from "../services/api";

// Typings[TypeScript]
import { TransactionDataType } from "../@types/TransactionDataType";

const configReactQuery = {
  cacheTime: 1000 * 60 * 6, // 6 Minutes
  staleTime: 1000 * 60 * 6, // 6 Minutes
  refetchInterval: 1000 * 60 * 3, // 3 Minutes
  refetchOnWindowFocus: true,
  retry: false,
};

export const useReactQuery = () => {
  const transactionsList = useQuery("transactions", getAllTransactions, configReactQuery);

  const paymentMethods = useQuery("payment_methods", getAllPaymentMethods, configReactQuery);

  const creditorsDebtors = useQuery("creditors_debtors", getAllCreditorsDebtors, configReactQuery);

  // const transactionsList = transactions.data?.map((transaction: TransactionDataType) => {
  //   return {
  //     id: transaction.id,
  //     type: transaction.type,
  //     title: transaction.title,
  //     status: transaction.status,
  //     description: transaction.description,
  //     paymentMethod: transaction.paymentMethod,
  //     dataForPayment: transaction.dataForPayment,
  //     creditorDebtor: transaction.creditorDebtor,
  //     valueTransaction: new Intl.NumberFormat("pt-BR", {
  //       style: "currency",
  //       currency: "BRL",
  //     }).format(transaction.valueTransaction),
  //     dateDueTransaction: transaction.dateDueTransaction,
  //     anotherInformation: transaction.anotherInformation,
  //     dateEntriesTransaction: transaction.dateEntriesTransaction,
  //   };
  // });

  return { transactionsList, paymentMethods, creditorsDebtors };
};
