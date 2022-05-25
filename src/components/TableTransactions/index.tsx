// Imports React
import React from "react";

// Chakra Imports
import { Table, TableContainer, Tbody, Thead, Text, Tr, Th, Tfoot } from "@chakra-ui/react";

// Components Imports
import TableHead from "./TableHead";
import TableBody from "./TableBody";

// Another Imports

// Typings[TypeScript]
type TableTransactionsData = {
  transactions?: [
    {
      id?: string;
      type?: number;
      description?: string;
      value?: number;
    }
  ];
};

const TableTransactionsComponent: React.FC<TableTransactionsData> = ({ transactions }) => {
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
            transactions?.map((data) => {
              return <TableBody {...data} />;
            })
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={5} textTransform="none" color="gray.300">
              ** Apenas os últimos 5 lançamentos são exibidos, veja todos clicando no botão "Ver todos" acima da tabela.
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default TableTransactionsComponent;
