// React-Query Imports
import { useQuery } from "react-query";

// API Imports
import {
  getAllCreditorsDebtors,
  getAllPaymentMethods,
  getAllTransactions,
} from "../services/api";

// Typings[TypeScript]
import { PaymentMethodType } from "../@types/PaymentMethodType";
import { CreditorDebtorType } from "../@types/CreditorDebtorType";
import { TransactionDataType } from "../@types/TransactionDataType";

const configReactQuery = {
  cacheTime: 1000 * 60 * 6, // 6 Minutes
  staleTime: 1000 * 60 * 6, // 6 Minutes
  refetchInterval: 1000 * 60 * 3, // 3 Minutes
  refetchOnWindowFocus: true,
  retry: false,
};

export const useReactQuery = (
  initialDataFromTransactions?: Array<TransactionDataType>,
  initialDataFromPaymentMethods?: Array<PaymentMethodType>,
  initialDataFromCreditorsDebtors?: Array<CreditorDebtorType>
) => {
  const transactions = useQuery("transactions", getAllTransactions, {
    ...configReactQuery,
    initialData: initialDataFromTransactions,
  });

  const paymentMethods = useQuery("payment_methods", getAllPaymentMethods, {
    ...configReactQuery,
    initialData: initialDataFromPaymentMethods,
  });

  const creditorsDebtors = useQuery(
    "creditors_debtors",
    getAllCreditorsDebtors,
    {
      ...configReactQuery,
      initialData: initialDataFromCreditorsDebtors,
    }
  );

  return { transactions, paymentMethods, creditorsDebtors };
};
