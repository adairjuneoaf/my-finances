// Imports React
import React, { useMemo, useState } from 'react'

// Imports Next
import { useRouter } from 'next/router'

// Chakra Imports
import {
  Tr,
  Th,
  Text,
  Flex,
  Tfoot,
  Table,
  Tbody,
  Thead,
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
import _ from 'lodash'

const SIZE_PER_LOAD = 5

const TableTransactionsComponent: React.FC = () => {
  const { asPath } = useRouter()

  const { transactions } = useReactQuery()

  const { data, isLoading } = transactions

  const [loadMore, setLoadMore] = useState(SIZE_PER_LOAD)

  const currentTransactions = useMemo(() => {
    const dataOrdered = _.orderBy(data, ['dateEntriesTransaction'], ['desc'])
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

          {data?.length !== 0 &&
            !isLoading &&
            currentTransactions?.map((data, idx) => {
              return <TableBody key={data.id} {...data} index={idx + 1} />
            })}

          {data?.length === 0 && isLoading && (
            <>
              <SkeletonBody />
              <SkeletonBody />
              <SkeletonBody />
              <SkeletonBody />
              <SkeletonBody />
            </>
          )}
        </Tbody>

        {asPath === '/dashboard' && (
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
                ** Apenas os últimos 5 lançamentos são exibidos aqui, veja todos acessando a página
                de lançamentos no menu ao lado.
              </Th>
            </Tr>
          </Tfoot>
        )}

        {hasLoadMore && asPath === '/transactions' && (
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
                  <Button
                    type='button'
                    width='100%'
                    colorScheme='green'
                    leftIcon={<FiZoomIn fontSize='22' />}
                    onClick={loadMoreTransactions}
                  >
                    Mostrar mais lançamentos
                  </Button>
                </Flex>
              </Th>
            </Tr>
          </Tfoot>
        )}

        {!hasLoadMore && asPath === '/transactions' && (
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
                <Flex alignItems='center' flexDirection='row' justifyContent='space-between'>
                  <Text>** Fim da lista, não existem mais lançamentos há serem carregados.</Text>
                  <Text fontSize='13px'>
                    {currentTransactions?.length} lançamentos exibidos de {data?.length} no total
                  </Text>
                </Flex>
              </Th>
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  )
}

export default TableTransactionsComponent
