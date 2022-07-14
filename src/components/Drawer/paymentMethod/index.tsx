// Imports React
import React, { Fragment } from 'react'

// Components Imports
import { GetFormFieldsPaymentMethod } from './formFieldsPaymentMethod'

export const PaymentMethodBody: React.FC = () => {
  return <Fragment>{GetFormFieldsPaymentMethod()}</Fragment>
}
