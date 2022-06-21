// Imports React
import React, { Fragment } from "react";

// Components Imports
import { getFormFieldsPaymentMethod } from "../formFieldsPaymentMethod";

const EditPaymentMethod: React.FC = () => {
  return <Fragment>{getFormFieldsPaymentMethod()}</Fragment>;
};

export default EditPaymentMethod;
