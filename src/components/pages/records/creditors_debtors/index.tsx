// Imports React
import React, { useContext } from 'react'

// Chakra Imports
import { Box, Flex, Text, Button, HStack, Spinner } from '@chakra-ui/react'

// Components Imports
import HeaderComponent from '../../../common/Header'
import { TableCreditorsDebtors } from '../../../pages/records/creditors_debtors/Table'
import { DrawerCreditorsDebtors } from '../../../pages/records/creditors_debtors/Drawer'
import SideBarNavigationComponent from '../../../common/SideBarNavigation'

// Contexts Imports
import { CreditorsDebtorsPageContext } from '../../../../contexts/pages/records'

// Hooks Imports
import { useReactQuery } from '../../../../hooks/useReactQuery'

// Another Imports
import { FiUserPlus } from 'react-icons/fi'

export const Container: React.FC = () => {
  const { disclosure } = useContext(CreditorsDebtorsPageContext)
  const { creditorsDebtors } = useReactQuery()

  const { onOpen } = disclosure

  const { isFetching, isLoading } = creditorsDebtors

  return (
    <Flex width={'calc(100vw - 1px)'} height='auto' flexDirection='column'>
      <HeaderComponent />
      <DrawerCreditorsDebtors />

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
          <SideBarNavigationComponent />
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
                Credores/Devedores
              </Text>
              {isFetching && !isLoading && (
                <Spinner color='green.500' size='md' thickness='4px' speed='0.5s' />
              )}
            </HStack>

            <HStack spacing='4'>
              <Button
                type='button'
                colorScheme='green'
                leftIcon={<FiUserPlus fontSize='18' />}
                onClick={onOpen}
              >
                Novo Credor/Devedor
              </Button>
            </HStack>
          </HStack>

          <Box as='div' paddingX='8'>
            <TableCreditorsDebtors />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
