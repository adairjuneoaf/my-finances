// Imports React

// Imports Next
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import NextHead from 'next/head'
import { authOptions } from '../api/auth/[...nextauth]'

// Components Imports
import { Container } from '../../components/pages/transactions'
import DefaultLayout from '../../layouts/defaultLayout'
const DrawerTransactions = dynamic(() => import('../../components/pages/transactions/Drawer'))
const DialogAlertDeleteTransaction = dynamic(
  () => import('../../components/pages/transactions/DialogAlert'),
)

// Contexts Imports
import dynamic from 'next/dynamic'
import { TransactionsPageContextProvider } from '../../contexts/pages/transactions'

const TransactionsPage: NextPage = () => {
  return (
    <DefaultLayout>
      <TransactionsPageContextProvider>
        <NextHead>
          <title>my.finance$ | Lançamentos</title>
        </NextHead>

        <DrawerTransactions />
        <DialogAlertDeleteTransaction />
        <Container />
      </TransactionsPageContextProvider>
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

export default TransactionsPage
