// Imports React
import React, { Fragment } from "react";

// Components Imports
import PopoverSubMenuComponent from "./PopoverSubMenu";

// Chakra Imports
import { Badge, Th, Tr } from "@chakra-ui/react";

// Typings[TypeScript]
import { TransactionDataType } from "../../@types/TransactionDataType";
import { formatValueToMoney } from "../../utils/formatValueToMoney";
interface TableBodyProps extends TransactionDataType {
  index: number;
}

const TableBody: React.FC<TableBodyProps> = ({
  index,
  id,
  type,
  status,
  title,
  valueTransaction,
}) => {
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
          {title}
        </Th>
        <Th isNumeric fontSize="16px" color="gray.100">
          {formatValueToMoney(valueTransaction)}
        </Th>
        <Th fontSize="16px" color="gray.100">
          <PopoverSubMenuComponent transactionID={id} />
        </Th>
      </Tr>
    </Fragment>
  );
};

export default TableBody;
