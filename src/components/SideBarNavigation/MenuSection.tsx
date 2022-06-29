// Imports React
import React, { PropsWithChildren } from "react";

// Imports Next

// Chakra Imports
import { Flex, Text, VStack } from "@chakra-ui/react";

// Components Imports

// Another Imports

// Typings[TypeScript]
interface MenuSectionNavigationProps {
  title?: string;
}

const MenuSectionNavigation: React.FC<
  PropsWithChildren<MenuSectionNavigationProps>
> = ({ title, children }) => {
  return (
    <Flex
      width="100%"
      height="auto"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Text
        as="h2"
        fontWeight="semibold"
        fontStyle="normal"
        textTransform="uppercase"
      >
        {title}
      </Text>
      <VStack spacing="5" marginLeft="4" marginTop="4">
        {children}
      </VStack>
    </Flex>
  );
};

export default MenuSectionNavigation;
