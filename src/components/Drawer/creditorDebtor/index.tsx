// Imports React
import React, { Fragment } from 'react'

// Components Imports
import { GetFormFieldsCreditorDebtor } from './formFieldsCreditorDebtor'

export const CreditorDebtorBody: React.FC = () => {
  return <Fragment>{GetFormFieldsCreditorDebtor()}</Fragment>
}
