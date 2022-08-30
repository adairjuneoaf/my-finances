import React from 'react'

// Chakra Imports
import {
  Box,
  Flex,
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
import { Skeleton } from '../../../../common'

// Recharts Imports
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'

// Hooks Imports
import { useDataChart } from '../../../../../hooks/useDataChart'

export const CountIncomeOutcomeChart: React.FC<{ isLoading?: boolean }> = ({
  isLoading = false,
}) => {
  const { countIncomeOutcomeMonthYear } = useDataChart()

  return (
    <Flex
      paddingX='6'
      paddingTop='6'
      borderRadius='10'
      paddingBottom='4'
      backgroundColor='gray.800'
      flexDirection='column'
      gap='6'
    >
      <HStack justifyContent='space-between'>
        <Text as='h1' fontSize='18px' fontWeight='semibold' lineHeight='1'>
          Entradas X Mês(UND)
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
              Gráfico que representa a contagem comparativa de entradas e saídas por mês.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <Skeleton isLoading={isLoading}>
        <Box width='100%' height='320'>
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <BarChart width={500} height={320} data={countIncomeOutcomeMonthYear} barSize={36}>
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
              <Bar
                dataKey='income'
                fill={theme.colors.green[600]}
                background={false}
                stroke={theme.colors.gray[700]}
                radius={[3, 3, 0, 0]}
              >
                <LabelList
                  dataKey='income'
                  position='top'
                  fontSize='14'
                  stroke={theme.colors.gray[600]}
                  fill={theme.colors.gray[600]}
                />
              </Bar>
              <Bar
                dataKey='outcome'
                fill={theme.colors.red[600]}
                background={false}
                stroke={theme.colors.gray[700]}
                radius={[3, 3, 0, 0]}
              >
                <LabelList
                  dataKey='outcome'
                  position='top'
                  fontSize='14'
                  stroke={theme.colors.gray[600]}
                  fill={theme.colors.gray[600]}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Skeleton>
    </Flex>
  )
}
