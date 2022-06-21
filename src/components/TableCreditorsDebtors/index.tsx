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
import { CreditorDebtorType } from "../../@types/CreditorDebtorType";

type TableCreditorsDebtorsData = {
  creditorsDebtors?: Array<CreditorDebtorType>;
  isLoading?: boolean;
};

const TableCreditorsDebtorsComponent: React.FC<TableCreditorsDebtorsData> = ({ creditorsDebtors, isLoading }) => {
  return (
    <TableContainer width="100%" backgroundColor="gray.800" padding="8" borderRadius="10">
      <Table colorScheme="whiteAlpha" variant="simple" whiteSpace="normal">
        <Thead>
          <TableHead />
        </Thead>
        <Tbody>
          {!creditorsDebtors && !isLoading && (
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
            creditorsDebtors &&
            creditorsDebtors?.map((data, idx) => {
              return <TableBody key={data.id} {...data} index={idx + 1} />;
            })}
          {isLoading && !creditorsDebtors && (
            <Tr>
              <Th colSpan={5} textTransform="none" color="gray.300">
                <HStack spacing="4" marginY="6" alignItems="center" justifyContent="center">
                  <Spinner color="green.500" size="md" thickness="4px" speed="0.5s" />
                </HStack>
              </Th>
            </Tr>
          )}
        </Tbody>
        <Tfoot height="4" />
      </Table>
    </TableContainer>
  );
};

export default TableCreditorsDebtorsComponent;
