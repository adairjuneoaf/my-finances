// Imports React
import React, { ReactNode } from 'react'

// Chakra Imports
import { HStack, Box, VStack, Text, Heading } from '@chakra-ui/react'

// Components Imports
import { Skeleton } from '../Skeleton'

// Utils Imports
import { formatValueToMoney } from '../../../utils/formatValueToMoney'

// Typings[TypeScript]
type CardProps = {
  title: string
  icon?: ReactNode
  value?: number
  isLoading?: boolean
}

export const Card: React.FC<CardProps> = ({ icon, title, value, isLoading }) => {
  return (
    <Box
      padding='8'
      gap='3'
      display='flex'
      flexDirection='column'
      width='100%'
      height='auto'
      borderRadius='10'
      backgroundColor='gray.800'
    >
      <HStack flexDirection='row' justifyContent='flex-start' alignItems='center'>
        {!!icon && icon}
        <Text as='h2' fontSize='24' fontWeight='semibold'>
          {title}
        </Text>
      </HStack>
      <Skeleton isLoading={isLoading}>
        <VStack width='100%' height='auto' justifyContent='flex-start' alignItems='flex-start'>
          <Heading fontSize='28'>{formatValueToMoney(value)}</Heading>
        </VStack>
      </Skeleton>
    </Box>
  )
}
