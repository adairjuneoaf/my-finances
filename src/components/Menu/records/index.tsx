// Imports React
import React from "react";

// Imports Next

// Chakra Imports
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

// Components Imports

// ContextImports Imports

// Another Imports
import { FiCreditCard, FiSettings, FiUsers } from "react-icons/fi";

// Typings[TypeScript]

const MenuRecordsComponent: React.FC = () => {
  return (
    <Menu>
      <MenuButton as={Button} leftIcon={<FiSettings fontSize={"18px"} />} colorScheme="blue">
        Cadastros
      </MenuButton>
      <MenuList backgroundColor="gray.800" borderColor="gray.700">
        <MenuItem
          icon={<FiCreditCard fontSize={"16px"} />}
          _focus={{ backgroundColor: "gray.700" }}
          _hover={{ backgroundColor: "gray.700" }}
        >
          Formas de Pagamento
        </MenuItem>
        <MenuItem
          icon={<FiUsers fontSize={"16px"} />}
          _focus={{ backgroundColor: "gray.700" }}
          _hover={{ backgroundColor: "gray.700" }}
        >
          Credores/Devedores
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuRecordsComponent;
