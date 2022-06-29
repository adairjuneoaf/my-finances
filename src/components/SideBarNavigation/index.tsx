// Imports React
import React, { useContext } from "react";
import { useRouter } from "next/router";

// Chakra Imports
import { Box, Button, Flex, HStack } from "@chakra-ui/react";

// Components Imports
import MenuSectionNavigation from "./MenuSection";
import MenuItemNavigation from "./MenuItemSection";

// Contexts Imports
import { ContextDrawer } from "../../contexts/contextDrawer";

// Another Imports
import { FiUserPlus, FiCreditCard } from "react-icons/fi";
import { RiAddFill, RiDashboardLine, RiFileListLine } from "react-icons/ri";

// Typings[TypeScript]

const SideBarNavigationComponent: React.FC = () => {
  const { handleDrawerNewTransaction } = useContext(ContextDrawer);

  const { asPath } = useRouter();

  return (
    <Flex
      gap="5"
      padding="6"
      width="100%"
      height="86vh"
      minWidth="288px"
      borderRadius="10"
      flexDirection="column"
      justifyContent="space-between"
      backgroundColor="gray.800"
    >
      <Box as="div" display="flex" flex="1" flexDirection="column" gap="10">
        <MenuSectionNavigation title="Geral">
          <MenuItemNavigation
            title="Dashboard"
            icon={RiDashboardLine}
            route="/dashboard"
            description="Ir até a página de Dashboard"
          />
          <MenuItemNavigation
            title="Lançamentos"
            icon={RiFileListLine}
            route="/transactions"
            description="Ir até a página de Lançamentos"
          />
        </MenuSectionNavigation>
        <MenuSectionNavigation title="Cadastros">
          <MenuItemNavigation
            title="Credores/Devedores"
            icon={FiUserPlus}
            route="/records"
            description="Ir até a página de Cadastros"
          />
          <MenuItemNavigation
            title="Forma de pagamento"
            icon={FiCreditCard}
            route="/records"
            description="Ir até a página de Cadastros"
          />
        </MenuSectionNavigation>
      </Box>

      <Box as="div" display="flex" width="100%" height="auto">
        <HStack spacing="4" width="100%" height="100%">
          {asPath.trim() !== "/transactions" && (
            <Button
              width="100%"
              type="button"
              colorScheme="green"
              fontWeight="semibold"
              leftIcon={<RiAddFill fontSize="24" />}
              onClick={handleDrawerNewTransaction}
            >
              Novo lançamento
            </Button>
          )}
        </HStack>
      </Box>
    </Flex>
  );
};

export default SideBarNavigationComponent;
