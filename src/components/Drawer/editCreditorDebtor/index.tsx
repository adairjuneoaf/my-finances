// Imports React
import React, { Fragment } from "react";

// Components Imports
import { getFormFieldsCreditorDebtor } from "../formFieldsCreditorDebtor";

const EditCreditorDebtor: React.FC = () => {
  return <Fragment>{getFormFieldsCreditorDebtor()}</Fragment>;
};

export default EditCreditorDebtor;
