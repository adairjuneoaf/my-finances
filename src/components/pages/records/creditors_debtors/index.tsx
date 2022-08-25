// Imports React
import React, { Fragment, useContext } from 'react'

// Chakra Imports
import { Box, Button, HStack, Spinner, Text } from '@chakra-ui/react'

// Components Imports
import { TableCreditorsDebtors } from '../../../pages/records/creditors_debtors/Table'

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
    </Fragment>
  )
}
