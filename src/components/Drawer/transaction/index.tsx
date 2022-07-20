// Imports React
import React, { Fragment } from 'react'

// Components Imports
import { GetFormFieldsTransaction } from './formFields'

export const TransactionBody: React.FC = () => {
  return <Fragment>{GetFormFieldsTransaction()}</Fragment>
}
