// Imports React
import React from "react";

// Imports Next
import { useRouter } from "next/router";

// Chakra Imports
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Tfoot,
  TableContainer,
  HStack,
  Spinner,
} from "@chakra-ui/react";

// Components Imports
import TableHead from "./TableHead";
import TableBody from "./TableBody";

// Another Imports

// Typings[TypeScript]
import { TransactionDataType } from "../../@types/TransactionDataType";
import SkeletonBody from "./SkeletonBody";
type TableTransactionsData = {
  transactions?: Array<TransactionDataType>;
  isLoading?: boolean;
};

const TableTransactionsComponent: React.FC<TableTransactionsData> = ({
  transactions,
  isLoading,
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

        {asPath === "/transactions" && (
          <Tfoot>
            <Tr>
              <Th
                colSpan={5}
                paddingTop="6"
                textTransform="none"
                color="gray.300"
              >
                ** Essa página conta com a funcionalidade de scroll infinito,
                efetue a rolagem para baixo exibindo assim outros registros,
                caso existam mais.
              </Th>
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  );
};

export default TableTransactionsComponent;
