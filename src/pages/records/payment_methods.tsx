// Imports React

// Imports Next
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import NextHead from 'next/head'
import { authOptions } from '../api/auth/[...nextauth]'

// Components Imports
import { Container } from '../../components/pages/records/payment_methods'
const DrawerPaymentMethods = dynamic(
  () => import('../../components/pages/records/payment_methods/Drawer'),
)

// Contexts Imports
import { PaymentMethodsPageContextProvider } from '../../contexts/pages/records'
import DefaultLayout from '../../layouts/defaultLayout'

const PaymentMethodPage: NextPage = () => {
  return (
    <DefaultLayout>
      <PaymentMethodsPageContextProvider>
        <NextHead>
          <title>my.finance$ | Métodos de Pagamento</title>
        </NextHead>
        <DrawerPaymentMethods />
        <Container />
      </PaymentMethodsPageContextProvider>
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

export default PaymentMethodPage
