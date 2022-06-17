// Imports React
import React, { Fragment } from "react";

// Components Imports
import { getFormFieldsPaymentMethod } from "../formFieldsPaymentMethod";

const NewPaymentMethod: React.FC = () => {
  return <Fragment>{getFormFieldsPaymentMethod()}</Fragment>;
};

export default NewPaymentMethod;
