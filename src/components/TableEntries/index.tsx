// Imports React
import React from "react";

// Imports Next
import {} from "next/link";

// Chakra Imports
import { HStack, IconButton, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

// Components Imports

// Another Imports
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";

// Typings[TypeScript]
// type CardComponentProps = {
//   title: string;
//   icon?: ReactNode;
//   value: string;
// };

// const TableEntriesComponent: React.FC<CardComponentProps> = ({ title, value, icon }) => {
const TableEntriesComponent: React.FC = () => {
  return (
    <TableContainer width="100%" backgroundColor="gray.800" padding="8" borderRadius="10">
      <Table colorScheme="whiteAlpha" variant="simple">
        <Thead>
          <Tr>
            <Th width="5%" fontSize="14px" color="gray.200" fontWeight="extrabold">
              COD
            </Th>
            <Th width="8%" fontSize="14px" color="gray.200" fontWeight="extrabold">
              TIPO
            </Th>
            <Th fontSize="14px" color="gray.200" fontWeight="extrabold">
              DESCRIÇÃO
            </Th>
            <Th isNumeric width="8%" fontSize="14px" color="gray.200" fontWeight="extrabold">
              VALOR
            </Th>
            <Th width="2%" fontSize="14px" color="gray.200" fontWeight="extrabold"></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th fontSize="16px" color="gray.100">
              001
            </Th>
            <Th fontSize="16px" color="gray.100">
              ENTRADA
            </Th>
            <Th fontSize="16px" color="gray.100" textTransform="initial">
              Pagamento mensal da empresa Companhia LTDA
            </Th>
            <Th isNumeric fontSize="16px" color="gray.100">
              R$ 5.000,00
            </Th>
            <Th fontSize="16px" color="gray.100">
              <HStack>
                <IconButton
                  aria-label="more-details-transaction"
                  icon={<FiEye fontSize="24" color="white" />}
                  backgroundColor="blue.500"
                  colorScheme="blue"
                />
                <IconButton
                  aria-label="edit-transaction"
                  icon={<FiEdit fontSize="24" color="white" />}
                  backgroundColor="green.500"
                  colorScheme="green"
                />
                <IconButton
                  aria-label="delete-transaction"
                  icon={<FiTrash fontSize="24" color="white" />}
                  backgroundColor="red.500"
                  colorScheme="red"
                />
              </HStack>
            </Th>
          </Tr>
          <Tr>
            <Th fontSize="16px" color="gray.100">
              002
            </Th>
            <Th fontSize="16px" color="gray.100">
              SAÍDA
            </Th>
            <Th fontSize="16px" color="gray.100" textTransform="initial">
              Despesas com aluguel.
            </Th>
            <Th isNumeric fontSize="16px" color="gray.100">
              R$ -1.000,00
            </Th>
            <Th fontSize="16px" color="gray.100">
              <HStack>
                <IconButton
                  aria-label="more-details-transaction"
                  icon={<FiEye fontSize="24" color="white" />}
                  backgroundColor="blue.500"
                  colorScheme="blue"
                />
                <IconButton
                  aria-label="edit-transaction"
                  icon={<FiEdit fontSize="24" color="white" />}
                  backgroundColor="green.500"
                  colorScheme="green"
                />
                <IconButton
                  aria-label="delete-transaction"
                  icon={<FiTrash fontSize="24" color="white" />}
                  backgroundColor="red.500"
                  colorScheme="red"
                />
              </HStack>
            </Th>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableEntriesComponent;
