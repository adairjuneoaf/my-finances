// Imports React
import React, { Fragment } from "react";

// Components Imports
import { getFormFieldsTransaction } from "../formFieldsTransactions";

const NewTransactionBody: React.FC = () => {
  return <Fragment>{getFormFieldsTransaction()}</Fragment>;
};

export default NewTransactionBody;
