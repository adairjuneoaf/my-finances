// React-Query Imports
import { useQuery } from "react-query";

// API Imports
import { getAllCreditorsDebtors, getAllPaymentMethods, getAllTransactions } from "../services/api";

const configReactQuery = {
  cacheTime: 1000 * 60 * 1, // 1 Minute
  staleTime: 1000 * 60 * 1, // 1 Minute
  refetchInterval: 1000 * 60 * 1, // 1 Minute
  refetchOnWindowFocus: true,
  retry: false,
};

export const useReactQuery = () => {
  const transactionsList = useQuery("transactions", getAllTransactions, configReactQuery);

  const paymentMethods = useQuery("payment_methods", getAllPaymentMethods, configReactQuery);

  const creditorsDebtors = useQuery("creditors_debtors", getAllCreditorsDebtors, configReactQuery);

  return { transactionsList, paymentMethods, creditorsDebtors };
};
