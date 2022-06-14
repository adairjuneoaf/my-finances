// Imports React
import React, { Fragment } from "react";

// Components Imports
import PopoverSubMenuComponent from "./PopoverSubMenu";

// Chakra Imports
import { Badge, Th, Tr } from "@chakra-ui/react";

// Typings[TypeScript]
import { TransactionDataType } from "../../@types/TransactionDataType";
interface TableBodyProps extends TransactionDataType {
  index: number;
}

const TableBody: React.FC<TableBodyProps> = ({ index, id, type, status, description, valueTransaction }) => {
  return (
    <Fragment>
      <Tr>
        <Th fontSize="16px" color="gray.100">
          {index}
        </Th>
        <Th fontSize="16px" color="gray.100">
          {type === "1" && (
            <Badge variant="solid" colorScheme="green" padding="1">
              ENTRADA
            </Badge>
          )}
          {type === "0" && (
            <Badge variant="solid" colorScheme="red" padding="1">
              SAÍDA
            </Badge>
          )}
        </Th>
        <Th fontSize="16px" color="gray.100">
          {status === "1" && (
            <Badge variant="solid" colorScheme="green" padding="1">
              CONCLUÍDO
            </Badge>
          )}
          {status === "0" && (
            <Badge variant="solid" colorScheme="yellow" padding="1">
              EM ABERTO
            </Badge>
          )}
        </Th>
        <Th fontSize="16px" color="gray.100" textTransform="initial">
          {description}
        </Th>
        <Th isNumeric fontSize="16px" color="gray.100">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(valueTransaction)}
        </Th>
        <Th fontSize="16px" color="gray.100">
          <PopoverSubMenuComponent transactionID={id} />
        </Th>
      </Tr>
    </Fragment>
  );
};

export default TableBody;
