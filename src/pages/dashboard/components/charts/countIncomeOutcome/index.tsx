import React from 'react'

// Chakra Imports
import { Box, Text, theme } from '@chakra-ui/react'

// Components Imports
import { SkeletonComponent } from '../../../../../components/Skeleton'

// Recharts Imports
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart } from 'recharts'

// Hooks Imports
import { useDataChart } from '../../../../../hooks/useDataChart'

const CountIncomeOutcomeChart: React.FC<{ isLoading?: boolean }> = ({ isLoading = false }) => {
  const { countIncomeOutcomeMonthYear } = useDataChart()

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
      <Text as='h1' fontSize='18px' fontWeight='semibold' lineHeight='1'>
        Entradas X Mês(UNIT)
      </Text>
      {isLoading ? (
        <ResponsiveContainer height='90%'>
          <SkeletonComponent isLoading={true} marginTop='4'>
            <BarChart width={500} height={300} />
          </SkeletonComponent>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={countIncomeOutcomeMonthYear}
            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
            barSize={36}
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
              stroke={theme.colors.gray[700]}
              tickFormatter={(value) => {
                return `${value}`
              }}
              tickLine={{ stroke: theme.colors.gray[700], fill: theme.colors.gray[700] }}
              tick={{ stroke: theme.colors.gray[600], fill: theme.colors.gray[800] }}
            />
            <Tooltip
              viewBox={{ x: 0, y: 0, width: 200, height: 200 }}
              separator={' - '}
              cursor={{ stroke: 'transparent', strokeWidth: 1.5, fill: 'transparent' }}
            />
            <Bar
              dataKey='income'
              fill={theme.colors.green[600]}
              background={false}
              stroke={theme.colors.gray[700]}
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey='outcome'
              fill={theme.colors.red[600]}
              background={false}
              stroke={theme.colors.gray[700]}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  )
}

export default CountIncomeOutcomeChart
