// Imports React

// Imports Next
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import NextHead from 'next/head'
import { authOptions } from '../api/auth/[...nextauth]'

// Components Imports
import { Container } from '../../components/pages/records/creditors_debtors'
import { CreditorsDebtorsPageContextProvider } from '../../contexts/pages/records'
const DrawerCreditorsDebtors = dynamic(
  () => import('../../components/pages/records/creditors_debtors/Drawer'),
)

// Contexts Imports
import DefaultLayout from '../../layouts/defaultLayout'

const CreditorsDebtorsPage: NextPage = () => {
  return (
    <DefaultLayout>
      <CreditorsDebtorsPageContextProvider>
        <NextHead>
          <title>my.finance$ | Credores/Devedores</title>
        </NextHead>
        <DrawerCreditorsDebtors />
        <Container />
      </CreditorsDebtorsPageContextProvider>
    </DefaultLayout>
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
