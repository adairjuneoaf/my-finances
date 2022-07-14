// Imports React
import React, { useState } from 'react'

// Imports Next

// Chakra Imports
import {
  Th,
  Tr,
  Flex,
  Text,
  Tfoot,
  Tbody,
  Thead,
  Table,
  Button,
  TableContainer,
} from '@chakra-ui/react'

// Components Imports
import TableHead from './TableHead'
import TableBody from './TableBody'
import SkeletonBody from './SkeletonBody'

// Hooks Imports
import { useReactQuery } from '../../hooks/useReactQuery'

// Another Imports
import { FiZoomIn } from 'react-icons/fi'

const SIZE_PER_LOAD = 5

const TableCreditorsDebtorsComponent: React.FC = () => {
  const { creditorsDebtors } = useReactQuery()

  const { data, isLoading } = creditorsDebtors

  const [loadMore, setLoadMore] = useState(SIZE_PER_LOAD)

  const currentCreditorsDebtors = data?.slice(0, loadMore).map((creditorDebtor) => creditorDebtor)

  const hasLoadMore = !!(loadMore < Number(data?.length))

  const loadMoreCreditorsDebtors = () => {
    setLoadMore(loadMore + SIZE_PER_LOAD)
  }

  return (
    <TableContainer width='100%' backgroundColor='gray.800' padding='8' borderRadius='10'>
      <Table colorScheme='whiteAlpha' variant='simple' whiteSpace='normal'>
        <Thead>
          <TableHead />
        </Thead>
        <Tbody>
          {!data && !isLoading && (
            <Tr>
              <Th
                colSpan={5}
                fontSize='14px'
                color='gray.200'
                fontWeight='bold'
                fontStyle='italic'
                textTransform='none'
              >
                Não existem dados...
              </Th>
            </Tr>
          )}
          {!isLoading &&
            data &&
            currentCreditorsDebtors?.map((data, idx) => {
              return <TableBody key={data.id} {...data} index={idx + 1} />
            })}
          {isLoading && !data && (
            <>
              <SkeletonBody />
              <SkeletonBody />
              <SkeletonBody />
            </>
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th
              colSpan={6}
              width='100%'
              paddingTop='8'
              paddingBottom='0'
              textTransform='none'
              color='gray.300'
            >
              <Flex
                alignItems='flex-end'
                flexDirection='column'
                justifyContent='space-between'
                gap='4'
              >
                <Text fontSize='13px'>
                  {currentCreditorsDebtors?.length} credores/devedores exibidos de {data?.length} no
                  total
                </Text>
                {hasLoadMore && (
                  <Button
                    type='button'
                    width='100%'
                    colorScheme='green'
                    leftIcon={<FiZoomIn fontSize='22' />}
                    onClick={loadMoreCreditorsDebtors}
                  >
                    Mostrar mais credores/devedores
                  </Button>
                )}
              </Flex>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default TableCreditorsDebtorsComponent
