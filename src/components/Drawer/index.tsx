// Imports React
import React from "react";

// Imports Next

// Chakra Imports
import { Text, Flex, Drawer, DrawerHeader, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

// Components Imports
import NewTransactionBody from "./newTransaction";
import EditTransactionBody from "./editTransaction";

// Another Imports

// Typings[TypeScript]
type DrawerComponentProps = {
  type?: "default" | "new-transaction" | "edit-transaction";
};

const DrawerComponentComponent: React.FC<DrawerComponentProps> = ({ type = "new-transaction" }) => {
  return (
    <Drawer isOpen={true} onClose={() => {}} placement="right" size="sm" colorScheme="gray">
      <DrawerOverlay />
      <DrawerContent backgroundColor="gray.800">
        <DrawerHeader>
          {type === "default" && <Text as="h2">Drawer padrão</Text>}
          {type === "new-transaction" && (
            <Text as="h2" fontSize="24px">
              Novo lançamento
            </Text>
          )}
          {type === "edit-transaction" && <Text as="h2">Editar lançamento</Text>}
        </DrawerHeader>

        {type === "default" && <Flex>Drawer padrão do app...</Flex>}
        {type === "new-transaction" && <NewTransactionBody />}
        {type === "edit-transaction" && <EditTransactionBody />}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponentComponent;
