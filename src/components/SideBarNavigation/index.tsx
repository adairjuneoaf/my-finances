// Imports React
import React from "react";

// Chakra Imports
import { Flex } from "@chakra-ui/react";

// Components Imports
import MenuSectionNavigation from "./MenuSection";
import MenuItemNavigation from "./MenuItemSection";

// Another Imports
import { FiActivity, FiList, FiUserPlus, FiCreditCard } from "react-icons/fi";

// Typings[TypeScript]
type SideBarNavigationProps = {};

const SideBarNavigationComponent: React.FC<SideBarNavigationProps> = () => {
  return (
    <Flex flexDirection="column" gap="6">
      <MenuSectionNavigation title="Geral">
        <MenuItemNavigation
          title="Dashboard"
          icon={FiActivity}
          route="/dashboard"
        />
        <MenuItemNavigation
          title="Lançamentos"
          icon={FiList}
          route="/transactions"
        />
      </MenuSectionNavigation>
      <MenuSectionNavigation title="Cadastros">
        <MenuItemNavigation
          title="Credores/Devedores"
          icon={FiUserPlus}
          route="/records"
        />
        <MenuItemNavigation
          title="Forma de pagamento"
          icon={FiCreditCard}
          route="/records"
        />
      </MenuSectionNavigation>
    </Flex>
  );
};

export default SideBarNavigationComponent;
