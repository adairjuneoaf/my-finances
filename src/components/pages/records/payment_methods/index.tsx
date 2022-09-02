// Imports React
import React, { Fragment } from 'react'
import { useContextSelector } from 'use-context-selector'

// Chakra Imports
import { Box, Button, HStack, Spinner, Text } from '@chakra-ui/react'

// Components Imports
import { TablePaymentMethods } from '../../../pages/records/payment_methods/Table'

// Contexts Imports
import { PaymentMethodsPageContext } from '../../../../contexts/pages/records'

// Hooks Imports
import { useReactQuery } from '../../../../hooks/useReactQuery'

// Another Imports
import { FiCreditCard } from 'react-icons/fi'

export const Container: React.FC = () => {
  const { onOpen } = useContextSelector(
    PaymentMethodsPageContext,
    (values) => values.drawerDisclosure,
  )
  const { paymentMethods } = useReactQuery()

  const { isFetching, isLoading } = paymentMethods

  return (
    <Fragment>
      <HStack
        spacing='4'
        alignItems='center'
        marginBottom='6'
        flexDirection='row'
        justifyContent='space-between'
      >
        <HStack spacing='4' alignItems='center'>
          <Text as='h1' fontSize='3xl' fontWeight='extrabold' lineHeight='1'>
            Métodos de Pagamento
          </Text>
          {isFetching && !isLoading && (
            <Spinner color='green.500' size='md' thickness='4px' speed='0.5s' />
          )}
        </HStack>

        <HStack spacing='4'>
          <Button
            type='button'
            colorScheme='green'
            leftIcon={<FiCreditCard fontSize='18' />}
            onClick={onOpen}
          >
            Novo método de pagamento
          </Button>
        </HStack>
      </HStack>

      <Box as='div' paddingX='8'>
        <TablePaymentMethods />
      </Box>
    </Fragment>
  )
}
