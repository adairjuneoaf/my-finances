// Imports React
import React, { Fragment, useMemo, useRef } from 'react'

// Imports Next
import NextHead from 'next/head'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { NextPage, GetServerSideProps } from 'next'

// Chakra Imports
import { Box, Flex, Text, HStack, Spinner, SimpleGrid, theme } from '@chakra-ui/react'

// Components Imports
import CardComponent from '../components/Card'
import HeaderComponent from '../components/Header'
import SideBarNavigationComponent from '../components/SideBarNavigation'

// Hooks Imports
import { useReactQuery } from '../hooks/useReactQuery'

// Another Imports
import { FiActivity, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import { XAxis, YAxis, Area, AreaChart, Tooltip, ResponsiveContainer } from 'recharts'

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

  const chart = [
    { name: '07/2022', income: 3200, outcome: 2850 },
    { name: '08/2022', income: 3650, outcome: 3720 },
    { name: '09/2022', income: 3520, outcome: 3400 },
    { name: '10/2022', income: 2900, outcome: 3000 },
    { name: '11/2022', income: 3320, outcome: 2980 },
  ]

  return (
    <Fragment>
      <NextHead>
        <title>my.finance$ | Dashboard</title>
      </NextHead>
      <Flex width={'calc(100vw - 1px)'} height='auto' flexDirection='column'>
        <HeaderComponent />

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

            <Box as='section' paddingY='8'>
              <SimpleGrid spacing='4' width='100%' height='auto' columns={2} paddingX='8'>
                <Box
                  paddingX='6'
                  paddingY='8'
                  width='100%'
                  height='320'
                  borderRadius='10'
                  backgroundColor='gray.800'
                >
                  <Text as='h1' fontSize='18px' fontWeight='semibold' lineHeight='1'>
                    Entradas por mês
                  </Text>
                  <ResponsiveContainer>
                    <AreaChart
                      width={500}
                      height={300}
                      data={chart}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <XAxis
                        dataKey='name'
                        stroke={theme.colors.gray[700]}
                        tick={{ stroke: theme.colors.gray[600], fill: theme.colors.gray[800] }}
                        fontSize='11'
                      />
                      <YAxis
                        stroke={theme.colors.gray[700]}
                        fontSize='11'
                        domain={['auto', 'dataMax + 50']}
                        tick={{ stroke: theme.colors.gray[600], fill: theme.colors.gray[800] }}
                      />
                      <Tooltip
                        viewBox={{ x: 0, y: 0, width: 200, height: 200 }}
                        separator={'0'}
                        cursor={{ stroke: theme.colors.gray[700], strokeWidth: 1.5 }}
                      />
                      <defs>
                        <linearGradient id='income' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='0%' stopColor={theme.colors.green[500]} stopOpacity={1} />
                          <stop
                            offset='100%'
                            stopColor={theme.colors.gray[900]}
                            stopOpacity={0.5}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type='monotone'
                        dataKey='income'
                        dot={{
                          stroke: theme.colors.green[400],
                          fill: theme.colors.green[400],
                          strokeWidth: 4,
                          r: 3,
                        }}
                        activeDot={{
                          stroke: theme.colors.green[400],
                          fill: theme.colors.green[400],
                        }}
                        stroke={theme.colors.green[400]}
                        strokeWidth={3}
                        // fill={theme.colors.green[900]}
                        fillOpacity={1}
                        fill='url(#income)'
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
                <Box
                  paddingX='6'
                  paddingY='8'
                  width='100%'
                  height='320'
                  borderRadius='10'
                  backgroundColor='gray.800'
                >
                  <Text as='h1' fontSize='18px' fontWeight='semibold' lineHeight='1'>
                    Saídas por mês
                  </Text>
                  <ResponsiveContainer>
                    <AreaChart
                      width={500}
                      height={300}
                      data={chart}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <XAxis
                        dataKey='name'
                        stroke={theme.colors.gray[700]}
                        tick={{ stroke: theme.colors.gray[600], fill: theme.colors.gray[800] }}
                        fontSize='11'
                      />
                      <YAxis
                        stroke={theme.colors.gray[700]}
                        fontSize='11'
                        domain={['auto', 'dataMax + 50']}
                        tick={{ stroke: theme.colors.gray[600], fill: theme.colors.gray[800] }}
                      />
                      <Tooltip
                        viewBox={{ x: 0, y: 0, width: 200, height: 200 }}
                        separator={'0'}
                        cursor={{ stroke: theme.colors.gray[700], strokeWidth: 1.5 }}
                      />
                      <defs>
                        <linearGradient id='outcome' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='0%' stopColor={theme.colors.red[500]} stopOpacity={1} />
                          <stop
                            offset='100%'
                            stopColor={theme.colors.gray[900]}
                            stopOpacity={0.5}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type='monotone'
                        dataKey='outcome'
                        dot={{
                          stroke: theme.colors.red[400],
                          fill: theme.colors.red[400],
                          strokeWidth: 4,
                          r: 3,
                        }}
                        activeDot={{ stroke: theme.colors.red[400], fill: theme.colors.red[400] }}
                        stroke={theme.colors.red[400]}
                        strokeWidth={3}
                        // fill={theme.colors.red[900]}
                        fillOpacity={1}
                        fill='url(#outcome)'
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
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
