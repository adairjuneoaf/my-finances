// Imports React
import React, { Fragment } from "react";

// Components Imports
import { getFormFieldsCreditorDebtor } from "../formFieldsCreditorDebtor";

const NewCreditorDebtor: React.FC = () => {
  return <Fragment>{getFormFieldsCreditorDebtor()}</Fragment>;
};

export default NewCreditorDebtor;
