// Imports React
import { Fragment, useMemo } from 'react'

// Imports Chakra
import { Box, HStack, SimpleGrid, Spinner, Text } from '@chakra-ui/react'

// Hooks Imports
import { useReactQuery } from '../../../hooks/useReactQuery'

// Components Imports
import { Card } from '../../common'

// Charts Imports
import { CountIncomeOutcomeChart } from './Charts/countIncomeOutcome'
import { IncomeChart } from './Charts/incomeChart'
import { OutcomeChart } from './Charts/outcomeChart'

// Another Imports
import { FiActivity, FiTrendingDown, FiTrendingUp } from 'react-icons/fi'

export const Container: React.FC = () => {
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
    </Fragment>
  )
}
