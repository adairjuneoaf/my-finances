// Imports React
import React, { Fragment } from "react";

// Chakra Imports
import { Th, Tr } from "@chakra-ui/react";

const TableHead: React.FC = () => {
  return (
    <Fragment>
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
        <Th width="2%" fontSize="14px" color="gray.200" fontWeight="extrabold">
          AÇÕES
        </Th>
      </Tr>
    </Fragment>
  );
};

export default TableHead;
