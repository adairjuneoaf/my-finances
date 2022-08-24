// React Imports
import React from 'react'

// Chakra Imports
import { Box, Divider, Flex, Text, HStack } from '@chakra-ui/react'

// Utils Imports
import { formatValueToMoney } from '../../../../utils/formatValueToMoney'

type AreaChartToolTipProps = {
  active?: boolean
  payload?: Array<{
    dataKey?: string
    payload: {
      income: number
      outcome: number
      monthYear: string
    }
  }>
}

export const AreaChartCustomTooltip: React.FC<AreaChartToolTipProps> = ({
  payload,
  active = false,
}) => {
  if (active && payload && payload.length > 0) {
    return (
      <Box
        padding='2'
        display='flex'
        flexWrap='wrap'
        borderRadius='6'
        flexDirection='column'
        backgroundColor='rgba(24, 27, 35, 0.75)'
        width='fit-content'
        maxWidth='256px'
        borderWidth='1px'
        borderColor='gray.700'
      >
        <Text fontSize='14px' fontWeight='semibold'>
          {payload[0].payload.monthYear}
        </Text>
        <Divider marginY='1' />
        <Flex flexDirection='column' gap='1'>
          <HStack>
            <Text fontSize='14px'>
              {payload[0].dataKey === 'income'
                ? formatValueToMoney(payload[0].payload.income)
                : formatValueToMoney(payload[0].payload.outcome)}
            </Text>
          </HStack>
        </Flex>
      </Box>
    )
  }

  return null
}
