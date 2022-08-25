// Imports React

// Imports Next
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import NextHead from 'next/head'
import { authOptions } from '../api/auth/[...nextauth]'

// Components Imports
import { Container } from '../../components/pages/dashboard'
import DefaultLayout from '../../layouts/defaultLayout'

const DashboardPage: NextPage = () => {
  return (
    <DefaultLayout>
      <NextHead>
        <title>my.finance$ | Dashboard</title>
      </NextHead>

      <Container />
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

export default DashboardPage
