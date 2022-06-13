// Imports React
import React from "react";

// Imports Next
import { useRouter } from "next/router";

// Chakra Imports
import { Table, Tbody, Thead, Tr, Th, Tfoot, TableContainer, HStack, Spinner } from "@chakra-ui/react";

// Components Imports
import TableHead from "./TableHead";
import TableBody from "./TableBody";

// Another Imports

// Typings[TypeScript]
import { TransactionDataType } from "../../@types/TransactionDataType";
type TableTransactionsData = {
  transactions?: Array<TransactionDataType>;
  isLoading?: boolean;
};

const TableTransactionsComponent: React.FC<TableTransactionsData> = ({ transactions, isLoading }) => {
  const { asPath } = useRouter();

  return (
    <TableContainer width="100%" backgroundColor="gray.800" padding="8" borderRadius="10">
      <Table colorScheme="whiteAlpha" variant="simple">
        <Thead>
          <TableHead />
        </Thead>
        <Tbody>
          {!transactions ? (
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
          ) : (
            transactions?.map((data, idx) => {
              return <TableBody key={data.id} {...data} index={idx + 1} />;
            })
          )}
        </Tbody>
        {isLoading && (
          <Tfoot>
            <Tr>
              <Th colSpan={5} textTransform="none" color="gray.300">
                <HStack spacing="4" marginTop="6" alignItems="center" justifyContent="center">
                  <Spinner color="green.500" size="md" thickness="4px" speed="0.5s" />
                </HStack>
              </Th>
            </Tr>
          </Tfoot>
        )}
        {asPath === "/dashboard" && (
          <Tfoot>
            <Tr>
              <Th colSpan={5} textTransform="none" color="gray.300">
                ** Apenas os últimos 5 lançamentos são exibidos, veja todos clicando no botão "Ver todos" acima da
                tabela.
              </Th>
            </Tr>
          </Tfoot>
        )}
      </Table>
    </TableContainer>
  );
};

export default TableTransactionsComponent;
