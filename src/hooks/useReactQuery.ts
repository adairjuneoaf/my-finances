// React-Query Imports
import { useQuery } from "react-query";

// API Imports
import {
  getAllCreditorsDebtors,
  getAllPaymentMethods,
  getAllTransactions,
} from "../services/api";

const configReactQuery = {
  cacheTime: 1000 * 60 * 10, // 10 Minutes
  staleTime: 1000 * 60 * 10, // 10 Minutes
  refetchInterval: 1000 * 60 * 5, // 5 Minutes
  refetchOnWindowFocus: true,
  retry: 5,
};

export const useReactQuery = () => {
  const transactions = useQuery("transactions", getAllTransactions, {
    ...configReactQuery,
  });

  const paymentMethods = useQuery("payment_methods", getAllPaymentMethods, {
    ...configReactQuery,
  });

  const creditorsDebtors = useQuery(
    "creditors_debtors",
    getAllCreditorsDebtors,
    {
      ...configReactQuery,
    }
  );

  return {
    transactions,
    paymentMethods,
    creditorsDebtors,
  };
};
