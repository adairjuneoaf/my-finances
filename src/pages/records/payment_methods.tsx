// Imports React
import React from 'react'

// Imports Next
import NextHead from 'next/head'
import { getServerSession } from 'next-auth'
import { GetServerSideProps, NextPage } from 'next'
import { authOptions } from '../api/auth/[...nextauth]'

// Components Imports
import { Container } from '../../components/pages/records/payment_methods'

// Contexts Imports
import { PaymentMethodsPageContextProvider } from '../../contexts/pages/records'

const PaymentMethodPage: NextPage = () => {
  return (
    <PaymentMethodsPageContextProvider>
      <NextHead>
        <title>my.finance$ | Métodos de Pagamento</title>
      </NextHead>

      <Container />
    </PaymentMethodsPageContextProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: `/?${'authorized=false'}`,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default PaymentMethodPage
