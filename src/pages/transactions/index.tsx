// Imports React
import React from 'react'

// Imports Next
import NextHead from 'next/head'
import { getServerSession } from 'next-auth'
import { GetServerSideProps, NextPage } from 'next'
import { authOptions } from '../api/auth/[...nextauth]'

// Components Imports
import { Container } from '../../components/pages/transactions'

// Contexts Imports
import { TransactionsPageContextProvider } from '../../contexts/pages/transactions'

const TransactionsPage: NextPage = () => {
  return (
    <TransactionsPageContextProvider>
      <NextHead>
        <title>my.finance$ | Lançamentos</title>
      </NextHead>

      <Container />
    </TransactionsPageContextProvider>
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

export default TransactionsPage
