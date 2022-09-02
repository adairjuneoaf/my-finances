// Imports React
import React, { Fragment } from 'react'
import { useContextSelector } from 'use-context-selector'

// Chakra Imports
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react'

// Components Imports
import { TableTransactions } from '../../pages/transactions/Table'

// Hooks Imports
import { useReactQuery } from '../../../hooks/useReactQuery'

// Another Imports
import { FiFilter } from 'react-icons/fi'
import { RiAddFill } from 'react-icons/ri'
import { TransactionsPageContext } from '../../../contexts/pages/transactions/index'

export const Container: React.FC = () => {
  const { onOpen } = useContextSelector(
    TransactionsPageContext,
    (values) => values.drawerDisclosure,
  )
  const { transactions } = useReactQuery()

  const { isFetching, isLoading } = transactions

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
            Lançamentos
          </Text>
          {isFetching && !isLoading && (
            <Spinner color='green.500' size='md' thickness='4px' speed='0.5s' />
          )}
        </HStack>

        <HStack spacing='4'>
          <Button
            type='button'
            colorScheme='green'
            leftIcon={<RiAddFill fontSize='24' />}
            onClick={onOpen}
          >
            Novo lançamento
          </Button>
        </HStack>
      </HStack>

      <Box as='section'>
        <Box as='div' paddingX='8' paddingBottom='4'>
          <Accordion allowToggle>
            <AccordionItem border='none'>
              <Tooltip hasArrow label='Filtrar lançamentos' colorScheme='gray'>
                <AccordionButton width='fit-content' margin='0 0 0 auto'>
                  <Box as='div' width='100%'>
                    <FiFilter fontSize='21' color='#4B4D63' />
                  </Box>
                </AccordionButton>
              </Tooltip>
              <AccordionPanel paddingY='4' paddingX='0'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur culpa voluptas
                sequi, tempore labore aliquam. Corporis provident, odit quaerat enim quibusdam autem
                repellendus, tenetur consequatur asperiores, in cupiditate nobis nesciunt.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        <Box as='div' paddingX='8'>
          <TableTransactions />
        </Box>
      </Box>
    </Fragment>
  )
}
