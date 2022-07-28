// Imports React
import React, { Fragment, useMemo, useRef } from 'react'

// Imports Next
import NextHead from 'next/head'
import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { NextPage, GetServerSideProps } from 'next'

// Chakra Imports
import { Box, Flex, Text, HStack, Spinner, SimpleGrid } from '@chakra-ui/react'

// Components Imports
import CardComponent from '../components/Card'
import HeaderComponent from '../components/Header'
import SideBarNavigationComponent from '../components/SideBarNavigation'
import TableTransactionsComponent from '../components/TableTransactions'
const DrawerComponent = dynamic(() => import('../components/Drawer'), {
  ssr: false,
  suspense: false,
  loading: () => <Spinner color='green.500' size='md' thickness='4px' speed='0.5s' />,
})

// Hooks Imports
import { useReactQuery } from '../hooks/useReactQuery'

// Another Imports
import { FiActivity, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

const DashboardPage: NextPage = () => {
  const { transactions } = useReactQuery()

  const { data, isFetching, isLoading } = transactions

  const TotalInput = useRef<number | undefined>(0)
  const TotalOutput = useRef<number | undefined>(0)
  const TotalBalance = useRef<number | undefined>(0)

  useMemo(() => {
    const transactionsInput = data?.filter((transaction) => transaction.type === '1')
    const transactionsOutput = data?.filter((transaction) => transaction.type === '0')

    TotalInput.current = transactionsInput?.reduce(
      (total, data) => total + data.valueTransaction,
      0,
    )
    TotalOutput.current = transactionsOutput?.reduce(
      (total, data) => total + data.valueTransaction,
      0,
    )

    TotalBalance.current = Number(TotalInput.current) - Number(TotalOutput.current)
  }, [data])

  return (
    <Fragment>
      <NextHead>
        <title>my.finance$ | Dashboard</title>
      </NextHead>
      <Flex width={'calc(100vw - 1px)'} height='auto' flexDirection='column'>
        <HeaderComponent />
        <DrawerComponent />

        <Flex
          gap='12'
          width='100%'
          marginTop='10'
          marginBottom='6'
          marginX='auto'
          maxWidth={1480}
          paddingX='6'
        >
          <Flex>
            <SideBarNavigationComponent />
          </Flex>

          <Flex flexDirection='column' width='100%' flex='1'>
            <Box as='section'>
              <HStack spacing='4' alignItems='center' marginBottom='6'>
                <Text as='h1' fontSize='3xl' fontWeight='extrabold' lineHeight='1'>
                  Dashboard
                </Text>
                {isFetching && !isLoading && (
                  <Spinner color='green.500' size='md' thickness='4px' speed='0.5s' />
                )}
              </HStack>

              <SimpleGrid spacing='4' width='100%' height='auto' columns={3} paddingX='8'>
                <CardComponent
                  title='Balanço'
                  value={TotalBalance.current}
                  isLoading={isLoading}
                  icon={<FiActivity fontSize='28' color='yellow' />}
                />
                <CardComponent
                  title='Entradas'
                  value={TotalInput.current}
                  isLoading={isLoading}
                  icon={<FiTrendingDown fontSize='28' color='green' />}
                />
                <CardComponent
                  title='Saídas'
                  value={TotalOutput.current}
                  isLoading={isLoading}
                  icon={<FiTrendingUp fontSize='28' color='red' />}
                />
              </SimpleGrid>
            </Box>

            <Box as='section'>
              <HStack spacing='4' alignItems='center' marginY='6'>
                <Text as='h1' fontSize='3xl' fontWeight='extrabold'>
                  Últimos lançamentos
                </Text>
              </HStack>

              <Box as='div' paddingX='8'>
                <TableTransactionsComponent />
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Fragment>
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
