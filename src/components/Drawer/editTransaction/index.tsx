// Imports React
import React, { Fragment, useContext } from "react";

// Chakra Imports
import { getFormFieldsTransaction } from "../formFieldsTransactions";

// Contexts Imports
import { ContextDrawer } from "../../../contexts/contextDrawer";

// Another Imports

const EditTransactionBody: React.FC = () => {
  const { transactionID } = useContext(ContextDrawer);

  return <Fragment>{getFormFieldsTransaction(transactionID)}</Fragment>;
};

export default EditTransactionBody;
