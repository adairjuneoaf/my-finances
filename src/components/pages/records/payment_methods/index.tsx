// Imports React
import React, { useContext } from 'react'

// Chakra Imports
import { Box, Flex, Text, Button, HStack, Spinner } from '@chakra-ui/react'

// Components Imports
import { Header, SideBarNavigation } from '../../../common'
import { TablePaymentMethods } from '../../../pages/records/payment_methods/Table'
import { DrawerPaymentMethods } from '../../../pages/records/payment_methods/Drawer'

// Contexts Imports
import { PaymentMethodsPageContext } from '../../../../contexts/pages/records'

// Hooks Imports
import { useReactQuery } from '../../../../hooks/useReactQuery'

// Another Imports
import { FiCreditCard } from 'react-icons/fi'

export const Container: React.FC = () => {
  const { disclosure } = useContext(PaymentMethodsPageContext)
  const { paymentMethods } = useReactQuery()

  const { onOpen } = disclosure

  const { isFetching, isLoading } = paymentMethods

  return (
    <Flex width={'calc(100vw - 1px)'} height='auto' flexDirection='column'>
      <Header />
      <DrawerPaymentMethods />

      <Flex
        gap='12'
        width='100%'
        marginTop='10'
        marginBottom='6'
        marginX='auto'
        maxWidth={1480}
        paddingX='6'
      >
        <Flex flexDirection='column'>
          <SideBarNavigation />
        </Flex>

        <Flex flexDirection='column' width='100%' flex='1'>
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
        </Flex>
      </Flex>
    </Flex>
  )
}
