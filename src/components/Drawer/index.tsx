// Imports React
import React, { useContext } from "react";

// Imports Next

// Chakra Imports
import { Text, Flex, Drawer, DrawerHeader, DrawerContent, DrawerOverlay, DrawerCloseButton } from "@chakra-ui/react";

// Components Imports
import NewTransactionBody from "./newTransaction";
import EditTransactionBody from "./editTransaction";

// ContextImports Imports
import { ContextDrawer } from "../../contexts/contextDrawer";

// Typings[TypeScript]
type DrawerComponentProps = {
  type?: "default" | "new-transaction" | "edit-transaction";
};

const DrawerComponentComponent: React.FC<DrawerComponentProps> = ({ type = "new-transaction" }) => {
  const { onClose, isOpen } = useContext(ContextDrawer);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="sm"
      colorScheme="gray"
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor="gray.800">
        <DrawerCloseButton />
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
