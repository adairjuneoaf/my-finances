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
 * @returns Função de retorno dos dados de UMA única transação armazenada
 * na API FAKE.
 *
 * @id transactionID para fazer a busca do método de pagamento de
 * preferência.
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

/**
 * @returns Função de retorno dos dados de UMA única transação armazenada
 * no FaunaDB.
 *
 * @id transactionID para fazer a busca do método de pagamento de
 * preferência.
 */
export const getUniqueTransactionAPIRoute = async (id: string) => {
  const data: TransactionDataType = await apiRoute
    .get(`/transactions/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  const dataFormated = {
    ...data,
    dateDueTransaction: formatDate(data.dateDueTransaction),
    dateEntriesTransaction: formatDate(data.dateEntriesTransaction),
  };

  console.log(dataFormated);

  return dataFormated;
};

/**
 * @returns Função de retorno dos dados de UMA única transação armazenada
 * no FaunaDB.
 *
 * @transactionData Dados da transação para serem inseridos na collection de
 * transactions do FaunaDB.
 */
export const postUniqueTransactionAPIRoute = async (
  transactionData: TransactionDataType
) => {
  const data = await apiRoute
    .post("/transactions", {
      transactionData: transactionData,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  console.log(data);

  return data;
};

/**
 * @returns Função de retorno dos dados de todos os métodos de pagamento
 * armazenados na API FAKE.
 */
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

/**
 * @returns Função de retorno dos dados de todos os métodos de pagamento
 * armazenados no FaunaDB.
 */
export const getAllPaymentMethodsAPIRoute = async () => {
  const data: Array<PaymentMethodType> = await apiRoute
    .get("/payment_method")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  console.log(data);

  return data;
};

/**
 * @returns Função de retorno dos dados de UM único método de pagamento
 * armazenado na API FAKE.
 *
 * @id paymentMethodID para fazer a busca do método de pagamento de
 * preferência.
 */
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

/**
 * @returns Função de retorno dos dados de UM único método de pagamento
 * armazenado no FaunaDB.
 *
 * @id paymentMethodID para fazer a busca do método de pagamento de
 * preferência.
 */
export const getUniquePaymentMethodAPIRoute = async (id: string) => {
  const data: PaymentMethodType = await apiRoute
    .get(`/payment_method/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  console.log(data);

  return data;
};

/**
 * @returns Função de retorno dos dados de todos os credores/devedores
 * armazenados na API FAKE.
 */
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

/**
 * @returns Função de retorno dos dados de todos os credores/devedores
 * armazenados no FaunaDB.
 */
export const getAllCreditorsDebtorsAPIRoute = async () => {
  const data: Array<CreditorDebtorType> = await apiRoute
    .get("/creditor_debtor")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  console.log(data);

  return data;
};

/**
 * @returns Função de retorno dos dados de UM único credor/devedor
 * armazenado na API FAKE.
 *
 * @id creditorDebtorID para fazer a busca do método de pagamento de
 * preferência.
 */
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

/**
 * @returns Função de retorno dos dados de UM único credor/devedor
 * armazenado no FaunaDB.
 *
 * @id creditorDebtorID para fazer a busca do método de pagamento de
 * preferência.
 */
export const getUniqueCreditorDebtorAPIRoute = async (id: string) => {
  const data: CreditorDebtorType = await apiRoute
    .get(`/creditor_debtor/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  console.log(data);

  return data;
};
