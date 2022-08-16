import React from 'react';

// Chakra Imports
import { Box, Text, theme } from '@chakra-ui/react';

// Recharts Imports
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';

// Hooks Imports
import { useDataChart } from '../../../../../hooks/useDataChart';

const OutcomeChart: React.FC = () => {
  const { incomeOutcomeMonthYear } = useDataChart()

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
        Saídas X Mês
      </Text>
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={300}
          data={incomeOutcomeMonthYear}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey='monthYear'
            fontSize='11'
            stroke={theme.colors.gray[700]}
            tick={{ stroke: theme.colors.gray[600], fill: theme.colors.gray[800] }}
            tickLine={{ stroke: theme.colors.gray[700], fill: theme.colors.gray[700] }}
          />
          <YAxis
            type='number'
            domain={['auto', 'dataMax + 50']}
            fontSize='11'
            tickFormatter={(value) => {
              return `R$ ${value}`
            }}
            stroke={theme.colors.gray[700]}
            tickLine={{ stroke: theme.colors.gray[700], fill: theme.colors.gray[700] }}
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
            fillOpacity={1}
            fill='url(#outcome)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default OutcomeChart