// Imports React
import React from 'react'

// Imports Next
import NextHead from 'next/head'
import { getServerSession } from 'next-auth'
import { GetServerSideProps, NextPage } from 'next'
import { authOptions } from '../api/auth/[...nextauth]'

// Components Imports
import { Container } from '../../components/pages/records/creditors_debtors'

// Contexts Imports
import { CreditorsDebtorsPageContextProvider } from '../../contexts/pages/records'

const CreditorsDebtorsPage: NextPage = () => {
  return (
    <CreditorsDebtorsPageContextProvider>
      <NextHead>
        <title>my.finance$ | Credores/Devedores</title>
      </NextHead>

      <Container />
    </CreditorsDebtorsPageContextProvider>
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

export default CreditorsDebtorsPage
