// React-Query Imports
import { useQuery } from "react-query";

// API Imports
import { getAllCreditorsDebtors, getAllPaymentMethods, getAllTransactions } from "../services/api";

const configReactQuery = {
  cacheTime: 1000 * 60 * 6, // 6 Minutes
  staleTime: 1000 * 60 * 6, // 6 Minutes
  refetchInterval: 1000 * 60 * 3, // 3 Minutes
  refetchOnWindowFocus: true,
  retry: false,
};

export const useReactQuery = () => {
  const transactions = useQuery("transactions", getAllTransactions, configReactQuery);

  const paymentMethods = useQuery("payment_methods", getAllPaymentMethods, configReactQuery);

  const creditorsDebtors = useQuery("creditors_debtors", getAllCreditorsDebtors, configReactQuery);

  return { transactions, paymentMethods, creditorsDebtors };
};
