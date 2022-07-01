// AXIOS Imports
import { api, apiRoute } from "./axios";

// Utils Imports
import { formatDate } from "../utils/formatDate";
import { formatValueToMoney } from "../utils/formatValueToMoney";

// Another Imports
import { v4 as uuid } from "uuid";

// Typings[TypeScript]
import { TransactionDataType } from "./../@types/TransactionDataType";
import { CreditorDebtorType } from "./../@types/CreditorDebtorType";
import { PaymentMethodType } from "./../@types/PaymentMethodType";

interface AllTransactionsFormatted extends TransactionDataType {
  valueTransactionFormatted: string;
}

/**
 * @returns Função de retorno dos dados de todas as transações armazenadas
 * na API FAKE.
 */
export const getAllTransactions = async () => {
  const listTransactions: Array<AllTransactionsFormatted> = await api
    .get("/transactions")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  const data = listTransactions.map((transaction) => ({
    ...transaction,
    valueTransactionFormatted: formatValueToMoney(transaction.valueTransaction),
  }));

  return data;
};

/**
 * @returns Função de retorno dos dados de todas as transações armazenadas
 * no FaunaDB.
 */
// export const getAllTransactionsAPIRoute = async () => {
//   const listTransactions: Array<AllTransactionsFormatted> = await apiRoute
//     .get("/transactions")
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return console.error("Error", error.message);
//     });

//   const data = listTransactions.map((transaction) => ({
//     ...transaction,
//     valueTransactionFormatted: formatValueToMoney(transaction.valueTransaction),
//   }));

//   console.log(data);

//   return data;
// };

export const getAllTransactionsAPIRoute = async () => {
  const data = await apiRoute
    .get("/transactions")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return console.error("Error", error.message);
    });

  // const data = listTransactions.map((transaction) => ({
  //   ...transaction,
  //   valueTransactionFormatted: formatValueToMoney(transaction.valueTransaction),
  // }));

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

  const dataFormatted = {
    ...data,
    dateDueTransaction: formatDate(data.dateDueTransaction),
    dateEntriesTransaction: formatDate(data.dateEntriesTransaction),
  };

  console.log(dataFormatted);

  return dataFormatted;
};

/**
 * @returns Função de retorno dos dados de UMA única transação armazenada
 * no FaunaDB.
 *
 * @transactionData Dados da transação para serem inseridos na collection de
 * transactions do FaunaDB.
 */
export const postUniqueTransactionAPIRoute = async (
  transactionData: Omit<TransactionDataType, "id">
) => {
  const data = await apiRoute
    .post("/transactions", {
      transactionData: {
        id: uuid(),
        ...transactionData,
      },
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
 * @returns Função de retorno da alteração dos dados de UMA única transação
 * armazenada no FaunaDB.
 *
 * @id transactionID para fazer a alteração na transação de preferência.
 *
 * @transactionData Dados da transação para serem inseridos na alteração dentro
 * da collection de transactions do FaunaDB.
 */
export const putUniqueTransactionAPIRoute = async (
  id: string,
  transactionData: Omit<TransactionDataType, "id">
) => {
  const data = await apiRoute
    .put(`/transactions/${id}`, {
      transactionData: {
        id: id,
        ...transactionData,
      },
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
 * @returns Função de retorno da alteração do `STATUS` de `UMA` única
 * transação armazenada no FaunaDB.
 *
 * @param id ID da transação para ser realizada as alterações.
 *
 * @param transactionData Tipo do `STATUS` da transação para ser realizada
 * alteração na collection do FaunaDB.
 */
export const patchUniqueTransactionAPIRoute = async (
  id: string,
  transactionData: Pick<TransactionDataType, "status">
) => {
  const data = await apiRoute
    .patch(`/transactions/${id}`, {
      transactionData: {
        status: transactionData.status,
      },
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
 * @returns Função de retorno dos dados de UM único método de pagamento
 * armazenado no FaunaDB.
 *
 * @paymentMethodData Dados do método de pagamento que serão armazenados
 * na collection de paymentMethods no FaunaDB.
 */
export const postUniquePaymentMethodAPIRoute = async (
  paymentMethodData: Omit<PaymentMethodType, "id">
) => {
  const data = await apiRoute
    .post("/payment_method", {
      paymentMethodData: {
        id: uuid(),
        ...paymentMethodData,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error: ", error.message);
    });

  console.log(data);

  return data;
};

/**
 * @returns Função de retorno da alteração dos dados de UM único método
 * de pagamento armazenado no FaunaDB.
 *
 * @id paymentMethodID para fazer a alteração do método de pagamento de
 * preferência.
 *
 * @paymentMethodData Dados do método de pagamento para serem inseridos na
 * alteração dentro da collection de paymentMethods do FaunaDB.
 */
export const putUniquePaymentMethodAPIRoute = async (
  id: string,
  paymentMethodData: Omit<PaymentMethodType, "id">
) => {
  const data = await apiRoute
    .put(`/payment_method/${id}`, {
      paymentMethodData: {
        id: id,
        ...paymentMethodData,
      },
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
 * @returns Função de retorno da alteração do `STATUS` de `UM` único
 * método de pagamento armazenado no FaunaDB.
 *
 * @param id ID do método de pagamento transação para ser realizada as
 * alterações.
 *
 * @param paymentMethodData Tipo do `STATUS` do método de pagamento para
 * ser realizada alteração na collection do FaunaDB.
 */
export const patchUniquePaymentMethodAPIRoute = async (
  id: string,
  paymentMethodData: Pick<PaymentMethodType, "status">
) => {
  const data = await apiRoute
    .patch(`/payment_method/${id}`, {
      paymentMethodData: {
        status: paymentMethodData.status,
      },
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

/**
 * @returns Função de retorno dos dados de UM único método de pagamento
 * armazenado no FaunaDB.
 *
 * @creditorDebtorData Dados do credor/devedor que serão armazenados
 * na collection de creditorDebtors no FaunaDB.
 */
export const postUniqueCreditorDebtorAPIRoute = async (
  creditorDebtorData: Omit<CreditorDebtorType, "id">
) => {
  const data = await apiRoute
    .post("/creditor_debtor", {
      creditorDebtorData: {
        id: uuid(),
        ...creditorDebtorData,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error: ", error.message);
    });

  console.log(data);

  return data;
};

/**
 * @returns Função de retorno da alteração dos dados de UM único
 * credor/devedor armazenado no FaunaDB.
 *
 * @param id ID do credor/devedor para serem realizadas as alterações.
 *
 * @param creditorDebtorData Dados do credor/devedor para serem inseridos na
 * alteração dentro da collection de creditorsDebtors do FaunaDB.
 */
export const putUniqueCreditorDebtorAPIRoute = async (
  id: string,
  creditorDebtorData: Omit<CreditorDebtorType, "id">
) => {
  const data = await apiRoute
    .put(`/creditor_debtor/${id}`, {
      creditorDebtorData: {
        id: id,
        ...creditorDebtorData,
      },
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
 * @returns Função de retorno da alteração do `STATUS` de `UM` único
 * credor/devedor armazenado no FaunaDB.
 *
 * @param id ID do credor/devedor para serem realizadas as alterações.
 *
 * @param creditorDebtorData Tipo do `STATUS` do credor/devedor para
 * ser realizada alteração na collection do FaunaDB.
 */
export const patchUniqueCreditorDebtorAPIRoute = async (
  id: string,
  creditorDebtorData: Pick<CreditorDebtorType, "status">
) => {
  const data = await apiRoute
    .patch(`/creditor_debtor/${id}`, {
      creditorDebtorData: {
        status: creditorDebtorData.status,
      },
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
