import React from 'react';

// Chakra Imports
import { Box, Text, theme } from '@chakra-ui/react';

// Recharts Imports
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';

const chart = [
  { name: '07/2022', outcome: 2850 },
  { name: '08/2022', outcome: 3720 },
  { name: '09/2022', outcome: 3400 },
  { name: '10/2022', outcome: 3000 },
  { name: '11/2022', outcome: 2980 },
]

export const OutcomeChart: React.FC = () => {
  return (
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
            fillOpacity={1}
            fill='url(#outcome)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}