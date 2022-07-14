// Imports React
import React, { Fragment } from 'react'

// Components Imports
import { GetFormFieldsPaymentMethod } from '../formFieldsPaymentMethod'

const NewPaymentMethod: React.FC = () => {
  return <Fragment>{GetFormFieldsPaymentMethod()}</Fragment>
}

export default NewPaymentMethod
