// Imports React
import React, { Fragment, useMemo } from 'react'

// Imports Next
import NextHead from 'next/head'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { NextPage, GetServerSideProps } from 'next'

// Chakra Imports
import { Box, Flex, Text, HStack, Spinner, SimpleGrid } from '@chakra-ui/react'

// Components Imports
import { Card, Header, SideBarNavigation } from '../components/common'
import { OutcomeChart, IncomeChart, CountIncomeOutcomeChart } from '../components/pages/dashboard'

// Hooks Imports
import { useReactQuery } from '../hooks/useReactQuery'

// Another Imports
import { FiActivity, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

const DashboardPage: NextPage = () => {
  const { transactions } = useReactQuery()

  const { data, isFetching, isLoading } = transactions

  const summary = useMemo(() => {
    const calc = data?.reduce(
      (total, transaction) => {
        if (transaction.type === '1') {
          total.income += transaction.valueTransaction
          total.balance += transaction.valueTransaction
        } else {
          total.outcome += transaction.valueTransaction
          total.balance -= transaction.valueTransaction
        }

        return total
      },
      {
        income: 0,
        outcome: 0,
        balance: 0,
      },
    )

    return calc
  }, [data])

  return (
    <Fragment>
      <NextHead>
        <title>my.finance$ | Dashboard</title>
      </NextHead>
      <Flex width={'calc(100vw - 1px)'} height='auto' flexDirection='column'>
        <Header />

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
            <SideBarNavigation />
          </Flex>

          <Flex flexDirection='column' width='100%' flex='1'>
            <HStack spacing='4' alignItems='center' marginBottom='6'>
              <Text as='h1' fontSize='3xl' fontWeight='extrabold' lineHeight='1'>
                Dashboard
              </Text>
              {isFetching && !isLoading && (
                <Spinner color='green.500' size='md' thickness='4px' speed='0.5s' />
              )}
            </HStack>

            <Box as='section' display='flex' flexDirection='column' gap='4'>
              <SimpleGrid
                spacing='4'
                width='100%'
                height='auto'
                columns={3}
                paddingX='8'
                aria-label='balance-values-section'
              >
                <Card
                  title='Balanço'
                  value={summary?.balance}
                  isLoading={isLoading}
                  icon={<FiActivity fontSize='28' color='yellow' />}
                />
                <Card
                  title='Entradas'
                  value={summary?.income}
                  isLoading={isLoading}
                  icon={<FiTrendingDown fontSize='28' color='green' />}
                />
                <Card
                  title='Saídas'
                  value={summary?.outcome}
                  isLoading={isLoading}
                  icon={<FiTrendingUp fontSize='28' color='red' />}
                />
              </SimpleGrid>

              <SimpleGrid
                spacing='4'
                width='100%'
                height='auto'
                columns={2}
                paddingX='8'
                aria-label='charts-section'
              >
                <IncomeChart isLoading={isLoading} />
                <OutcomeChart isLoading={isLoading} />
              </SimpleGrid>
              <SimpleGrid
                spacing='4'
                width='100%'
                height='auto'
                columns={1}
                paddingX='8'
                aria-label='balance-count-section'
              >
                <CountIncomeOutcomeChart isLoading={isLoading} />
              </SimpleGrid>
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
