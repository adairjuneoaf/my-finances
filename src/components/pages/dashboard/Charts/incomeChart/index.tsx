import React from 'react'

// Chakra Imports
import {
  Box,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  theme,
} from '@chakra-ui/react'

// Components Imports
import { SkeletonComponent } from '../../../../common/Skeleton'


// Recharts Imports
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'
import { AreaChartCustomTooltip } from '../customTooltip'

// Hooks Imports
import { useDataChart } from '../../../../../hooks/useDataChart'

export const IncomeChart: React.FC<{ isLoading?: boolean }> = ({ isLoading = false }) => {
  const { sumIncomeOutcomeMonthYear } = useDataChart()

  return (
    <Box
      paddingX='6'
      paddingTop='6'
      paddingBottom='8'
      width='100%'
      height='320'
      borderRadius='10'
      backgroundColor='gray.800'
    >
      <HStack justifyContent='space-between'>
        <Text as='h1' fontSize='18px' fontWeight='semibold' lineHeight='1'>
          Entradas X Mês(R$)
        </Text>
        <Popover isLazy trigger='hover' placement='left'>
          <PopoverTrigger>
            <Icon
              aria-label='info-about-income-chart-area'
              width={5}
              height={5}
              color='gray.600'
              _hover={{ color: theme.colors.gray[500] }}
            />
          </PopoverTrigger>
          <PopoverContent
            backgroundColor='gray.800'
            width='fit-content'
            maxWidth='256px'
            borderColor='gray.700'
            pointerEvents='none'
          >
            <PopoverArrow backgroundColor='gray.800' />
            <PopoverBody fontSize='12'>
              Gráfico que representa o somatório de todas as transações de entrada por mês.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      {isLoading ? (
        <ResponsiveContainer height='90%'>
          <SkeletonComponent isLoading={true} marginTop='4'>
            <AreaChart width={500} height={300} />
          </SkeletonComponent>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer>
          <AreaChart
            width={500}
            height={300}
            data={sumIncomeOutcomeMonthYear}
            margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey='monthYear'
              fontSize='11'
              stroke={theme.colors.gray[700]}
              tick={{ stroke: theme.colors.gray[600], fill: theme.colors.gray[800] }}
              tickLine={{ stroke: theme.colors.gray[700], fill: theme.colors.gray[700] }}
            />
            <YAxis
              fontSize='11'
              domain={['auto', 'dataMax + 50']}
              stroke={theme.colors.gray[700]}
              tickFormatter={(value) => {
                return `R$ ${value}`
              }}
              tickLine={{ stroke: theme.colors.gray[700], fill: theme.colors.gray[700] }}
              tick={{ stroke: theme.colors.gray[600], fill: theme.colors.gray[800] }}
            />
            <Tooltip
              viewBox={{ x: 0, y: 0, width: 200, height: 200 }}
              separator={': '}
              cursor={{ stroke: theme.colors.gray[700], strokeWidth: 1.5 }}
              content={<AreaChartCustomTooltip />}
            />
            <defs>
              <linearGradient id='income' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor={theme.colors.green[500]} stopOpacity={1} />
                <stop offset='100%' stopColor={theme.colors.gray[900]} stopOpacity={0.5} />
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
              fillOpacity={1}
              fill='url(#income)'
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Box>
  )
}
