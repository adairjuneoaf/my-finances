// Imports React
import React, { useMemo, useState } from 'react'

// Chakra Imports
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

// Components Imports
import SkeletonBody from './SkeletonBody'
import TableBody from './TableBody'
import TableHead from './TableHead'

// Hooks Imports
import { useReactQuery } from '../../../../hooks/useReactQuery'

// Another Imports
import _ from 'lodash'
import { FiZoomIn } from 'react-icons/fi'

const SIZE_PER_LOAD = 5

export const TableTransactions: React.FC = () => {
  const { transactions } = useReactQuery()

  const { data, isLoading } = transactions

  const [loadMore, setLoadMore] = useState(SIZE_PER_LOAD)

  const currentTransactions = useMemo(() => {
    const dataOrdered = _.orderBy(data, ['createdAt'], ['desc'])
      ?.slice(0, loadMore)
      .map((transaction) => transaction)

    return dataOrdered
  }, [data, loadMore])

  const hasLoadMore = !!(loadMore < Number(data?.length))

  const loadMoreTransactions = () => {
    setLoadMore(loadMore + SIZE_PER_LOAD)
  }

  return (
    <TableContainer width='100%' backgroundColor='gray.800' padding='8' borderRadius='10'>
      <Table colorScheme='whiteAlpha' variant='simple' whiteSpace='normal'>
        <Thead>
          <TableHead />
        </Thead>
        <Tbody>
          {data?.length === 0 && !isLoading && (
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

          {!data && isLoading && (
            <>
              <SkeletonBody isLoading={isLoading} />
              <SkeletonBody isLoading={isLoading} />
              <SkeletonBody isLoading={isLoading} />
              <SkeletonBody isLoading={isLoading} />
              <SkeletonBody isLoading={isLoading} />
            </>
          )}

          {data &&
            !isLoading &&
            currentTransactions?.map((data, idx) => {
              return <TableBody key={data.id} {...data} index={idx + 1} />
            })}
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
                  {currentTransactions?.length} lançamentos exibidos de {data?.length} no total
                </Text>
                {hasLoadMore && (
                  <Button
                    type='button'
                    width='100%'
                    colorScheme='green'
                    leftIcon={<FiZoomIn fontSize='22' />}
                    onClick={loadMoreTransactions}
                  >
                    Mostrar mais lançamentos
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
