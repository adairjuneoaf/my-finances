// Imports React
import React, { Fragment, useContext } from 'react'

// Imports Next
import NextHead from 'next/head'
import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth'
import { GetServerSideProps, NextPage } from 'next'
import { authOptions } from './api/auth/[...nextauth]'

// Chakra Imports
import {
  Box,
  Flex,
  Icon,
  Text,
  Button,
  HStack,
  Spinner,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react'

// Components Imports
import HeaderComponent from '../components/Header'
import SideBarNavigation from '../components/SideBarNavigation'
import TablePaymentMethods from '../components/TablePaymentMethods'
import TableCreditorsDebtors from '../components/TableCreditorsDebtors'
const DrawerComponent = dynamic(() => import('../components/Drawer'), {
  ssr: false,
  suspense: false,
  loading: () => <Spinner color='green.500' size='md' thickness='4px' speed='0.5s' />,
})

// Contexts Imports
import { ContextDrawer } from '../contexts/contextDrawer'

// Hooks Imports
import { useReactQuery } from '../hooks/useReactQuery'

// Another Imports
import { FiCreditCard, FiUser, FiUserPlus } from 'react-icons/fi'

const TransactionsPage: NextPage = () => {
  const { handleDrawerNewPaymentMethod, handleDrawerNewCreditorDebtor } = useContext(ContextDrawer)

  const { creditorsDebtors, paymentMethods } = useReactQuery()

  const { isFetching: isFetchingCreditorsDebtors } = creditorsDebtors
  const { isFetching: isFetchingPaymentMethods } = paymentMethods

  return (
    <Fragment>
      <NextHead>
        <title>my.finance$ | Cadastros</title>
      </NextHead>
      <Flex width={'calc(100vw - 1px)'} height='auto' flexDirection='column'>
        <HeaderComponent />
        <DrawerComponent />

        <Flex
          gap='12'
          width='100%'
          marginTop='10'
          marginBottom='6'
          marginX='auto'
          maxWidth={1480}
          paddingX='6'
        >
          <Flex>
            <SideBarNavigation />
          </Flex>

          <Flex flexDirection='column' width='100%' flex='1'>
            <Box as='section'>
              <HStack spacing='4' alignItems='center'>
                <Text as='h1' fontSize='3xl' fontWeight='extrabold' lineHeight='1'>
                  Cadastros
                </Text>
                {(isFetchingCreditorsDebtors || isFetchingPaymentMethods) && (
                  <Spinner color='green.500' size='md' thickness='4px' speed='0.5s' />
                )}
              </HStack>
            </Box>

            <Box as='section'>
              <Accordion allowToggle width='100%' marginY='8' paddingX='8'>
                <AccordionItem>
                  <AccordionButton>
                    <HStack spacing='3' flex='1'>
                      <Icon as={FiCreditCard} fontSize='24' />
                      <Text as='h2' fontSize='xl' fontWeight='medium' textAlign='left'>
                        Métodos de pagamento
                      </Text>
                    </HStack>
                    <AccordionIcon fontSize='24' />
                  </AccordionButton>
                  <AccordionPanel>
                    <HStack paddingY='4'>
                      <Button
                        type='button'
                        colorScheme='green'
                        fontSize='14'
                        fontWeight='medium'
                        leftIcon={<FiCreditCard fontSize='18' />}
                        onClick={handleDrawerNewPaymentMethod}
                      >
                        Novo método de pagamento
                      </Button>
                    </HStack>
                    Segue abaixo uma tabela com todos os métodos de pagamento cadastros.
                    <Flex width='100%' height='100%' paddingY='4' margin='auto'>
                      <TablePaymentMethods />
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <HStack spacing='3' flex='1'>
                      <Icon as={FiUser} fontSize='24' />
                      <Text as='h2' fontSize='xl' fontWeight='medium' textAlign='left' flex='1'>
                        Credores/Devedores
                      </Text>
                    </HStack>
                    <AccordionIcon fontSize='24' />
                  </AccordionButton>
                  <AccordionPanel>
                    <HStack paddingY='4'>
                      <Button
                        type='button'
                        colorScheme='green'
                        fontSize='14'
                        fontWeight='medium'
                        leftIcon={<FiUserPlus fontSize='18' />}
                        onClick={handleDrawerNewCreditorDebtor}
                      >
                        Novo Credor/Devedor
                      </Button>
                    </HStack>
                    Segue abaixo uma tabela com todos os credores/devedor cadastros.
                    <Flex width='100%' height='100%' paddingY='4' margin='auto'>
                      <TableCreditorsDebtors />
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: `/?${'authorized=false'}`,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default TransactionsPage
