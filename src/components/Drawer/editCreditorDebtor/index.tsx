// Imports React
import React, { Fragment } from "react";

// Components Imports
import { GetFormFieldsCreditorDebtor } from "../formFieldsCreditorDebtor";

const EditCreditorDebtor: React.FC = () => {
  return <Fragment>{GetFormFieldsCreditorDebtor()}</Fragment>;
};

export default EditCreditorDebtor;
