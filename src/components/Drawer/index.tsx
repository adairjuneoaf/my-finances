// Imports React
import React, { useContext } from "react";

// Imports Next

// Chakra Imports
import {
  Text,
  Flex,
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/react";

// Components Imports
import NewTransactionBody from "./newTransaction";
import EditTransactionBody from "./editTransaction";
import NewPaymentMethod from "./newPaymentMethod";
import EditPaymentMethod from "./editPaymentMethod";
import NewCreditorDebtor from "./newCreditorDebtor";
import EditCreditorDebtor from "./editCreditorDebtor";

// ContextImports Imports
import { ContextDrawer } from "../../contexts/contextDrawer";

// Typings[TypeScript]

const DrawerComponent: React.FC = () => {
  const { disclosure, drawerType } = useContext(ContextDrawer);

  const { onClose, isOpen } = disclosure;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="md"
      colorScheme="gray"
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor="gray.800">
        <DrawerCloseButton />
        <DrawerHeader borderBottom="2px" borderColor="gray.700">
          {drawerType === "default" && (
            <Text as="h2" fontSize="24px">
              Drawer padrão
            </Text>
          )}

          {drawerType === "new-transaction" && (
            <Text as="h2" fontSize="24px">
              Novo lançamento
            </Text>
          )}

          {drawerType === "edit-transaction" && (
            <Text as="h2" fontSize="24px">
              Editar lançamento
            </Text>
          )}

          {drawerType === "new-payment-method" && (
            <Text as="h2" fontSize="24px">
              Novo método de pagamento
            </Text>
          )}

          {drawerType === "edit-payment-method" && (
            <Text as="h2" fontSize="24px">
              Editar método de pagamento
            </Text>
          )}

          {drawerType === "new-creditor-debtor" && (
            <Text as="h2" fontSize="24px">
              Novo credor/devedor
            </Text>
          )}

          {drawerType === "edit-creditor-debtor" && (
            <Text as="h2" fontSize="24px">
              Editar credor/devedor
            </Text>
          )}
        </DrawerHeader>

        {drawerType === "default" && (
          <Flex
            width="100%"
            height="auto"
            paddingY={"2"}
            paddingX={"6"}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
          >
            Drawer padrão do app...
          </Flex>
        )}

        {drawerType === "new-transaction" && <NewTransactionBody />}
        {drawerType === "new-payment-method" && <NewPaymentMethod />}
        {drawerType === "new-creditor-debtor" && <NewCreditorDebtor />}

        {drawerType === "edit-transaction" && <EditTransactionBody />}
        {drawerType === "edit-payment-method" && <EditPaymentMethod />}
        {drawerType === "edit-creditor-debtor" && <EditCreditorDebtor />}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
