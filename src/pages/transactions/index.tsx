// Imports React

// Imports Next
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import NextHead from 'next/head'
import { authOptions } from '../api/auth/[...nextauth]'

// Components Imports
import { Container } from '../../components/pages/transactions'
import DefaultLayout from '../../layouts/defaultLayout'

// Contexts Imports
import { DialogAlertDeleteTransaction } from '../../components/pages/transactions/DialogAlert'
import { DrawerTransactions } from '../../components/pages/transactions/Drawer'
import { ModalDetailsTransaction } from '../../components/pages/transactions/ModalDetails'
import { TransactionsPageContextProvider } from '../../contexts/pages/transactions'

const TransactionsPage: NextPage = () => {
  return (
    <DefaultLayout>
      <TransactionsPageContextProvider>
        <NextHead>
          <title>my.finance$ | Lançamentos</title>
        </NextHead>

        <DrawerTransactions />
        <ModalDetailsTransaction />
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
