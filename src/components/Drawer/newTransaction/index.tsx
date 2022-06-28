// Imports React
import React, { Fragment } from "react";

// Components Imports
import { GetFormFieldsTransaction } from "../formFieldsTransactions";

const NewTransactionBody: React.FC = () => {
  return <Fragment>{GetFormFieldsTransaction()}</Fragment>;
};

export default NewTransactionBody;
