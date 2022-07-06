// Imports React
import React from "react";

// Imports Next
import { useRouter } from "next/router";

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
} from "@chakra-ui/react";

// Components Imports
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import SkeletonBody from "./SkeletonBody";

// Another Imports
import { FiZoomIn } from "react-icons/fi";

// Typings[TypeScript]
import { TransactionDataType } from "../../@types/TransactionDataType";
type TableTransactionsData = {
  loadMore?: () => void;
  isLoading?: boolean;
  totalCount?: number;
  hasLoadMore?: boolean;
  currentCount?: number;
  transactions?: Array<TransactionDataType>;
};

const TableTransactionsComponent: React.FC<TableTransactionsData> = ({
  loadMore,
  isLoading,
  hasLoadMore,
  transactions,
  totalCount = 0,
  currentCount = 0,
}) => {
  const { asPath } = useRouter();

  return (
    <TableContainer
      width="100%"
      backgroundColor="gray.800"
      padding="8"
      borderRadius="10"
    >
      <Table colorScheme="whiteAlpha" variant="simple" whiteSpace="normal">
        <Thead>
          <TableHead />
        </Thead>
        <Tbody>
          {!transactions && !isLoading && (
            <Tr>
              <Th
                colSpan={5}
                fontSize="14px"
                color="gray.200"
                fontWeight="bold"
                fontStyle="italic"
                textTransform="none"
              >
                Não existem dados...
              </Th>
            </Tr>
          )}

          {!isLoading &&
            transactions &&
            transactions?.map((data, idx) => {
              return <TableBody key={data.id} {...data} index={idx + 1} />;
            })}

          {isLoading && !transactions && (
            <>
              <SkeletonBody />
              <SkeletonBody />
              <SkeletonBody />
              <SkeletonBody />
              <SkeletonBody />
            </>
          )}
        </Tbody>

        {asPath === "/dashboard" && (
          <Tfoot>
            <Tr>
              <Th
                colSpan={5}
                paddingTop="6"
                textTransform="none"
                color="gray.300"
              >
                ** Apenas os últimos 5 lançamentos são exibidos aqui, veja todos
                acessando a página de lançamentos no menu ao lado.
              </Th>
            </Tr>
          </Tfoot>
        )}

        {hasLoadMore && asPath === "/transactions" && (
          <Tfoot>
            <Tr>
              <Th
                colSpan={6}
                width="100%"
                paddingTop="8"
                paddingBottom="0"
                paddingX="0"
                textTransform="none"
                color="gray.300"
              >
                <Flex
                  alignItems="flex-end"
                  flexDirection="column"
                  justifyContent="space-between"
                  gap="4"
                >
                  <Text fontSize="13px">
                    {currentCount} lançamentos exibidos de {totalCount} no total
                  </Text>
                  <Button
                    type="button"
                    width="100%"
                    colorScheme="green"
                    leftIcon={<FiZoomIn fontSize="22" />}
                    onClick={loadMore}
                  >
                    Mostrar mais
                  </Button>
                </Flex>
              </Th>
            </Tr>
          </Tfoot>
        )}

        {!hasLoadMore && asPath === "/transactions" && (
          <Tfoot>
            <Tr>
              <Th
                colSpan={6}
                width="100%"
                paddingTop="8"
                paddingBottom="0"
                paddingX="0"
                textTransform="none"
                color="gray.300"
              >
                <Flex
                  alignItems="center"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Text>
                    ** Fim da lista, não existem mais registros há serem
                    carregados.
                  </Text>
                  <Text fontSize="13px">
                    {currentCount} lançamentos exibidos de {totalCount} no total
                  </Text>
                </Flex>
              </Th>
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  );
};

export default TableTransactionsComponent;
