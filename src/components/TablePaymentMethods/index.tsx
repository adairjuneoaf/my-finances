// Imports React
import React from "react";

// Imports Next

// Chakra Imports
import { Table, Tbody, Thead, Tr, Th, Tfoot, TableContainer, HStack, Spinner } from "@chakra-ui/react";

// Components Imports
import TableHead from "./TableHead";
import TableBody from "./TableBody";

// Another Imports

// Typings[TypeScript]
import { PaymentMethodType } from "../../@types/PaymentMethodType";
type TableTransactionsData = {
  paymentMethods?: Array<PaymentMethodType>;
  isLoading?: boolean;
};

const TableTransactionsComponent: React.FC<TableTransactionsData> = ({ paymentMethods, isLoading }) => {

  return (
    <TableContainer width="100%" backgroundColor="gray.800" padding="8" borderRadius="10">
      <Table colorScheme="whiteAlpha" variant="simple" whiteSpace="normal">
        <Thead>
          <TableHead />
        </Thead>
        <Tbody>
          {!paymentMethods && !isLoading && (
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
            paymentMethods &&
            paymentMethods?.map((data, idx) => {
              return <TableBody key={data.id} {...data} index={idx + 1} />;
            })}
          {isLoading && !paymentMethods && (
            <Tr>
              <Th colSpan={5} textTransform="none" color="gray.300">
                <HStack spacing="4" marginY="6" alignItems="center" justifyContent="center">
                  <Spinner color="green.500" size="md" thickness="4px" speed="0.5s" />
                </HStack>
              </Th>
            </Tr>
          )}
        </Tbody>
        <Tfoot paddingY='4' />
      </Table>
    </TableContainer>
  );
};

export default TableTransactionsComponent;
