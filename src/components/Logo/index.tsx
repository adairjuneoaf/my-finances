// Imports React
import React from "react";

// Imports Next
import NextLink from "next/link";

// Chakra Imports
import { Avatar, IconButton, Text, Wrap, WrapItem, Flex, Tooltip, Image, HStack } from "@chakra-ui/react";

// Components Imports

// Another Imports

const LogoComponent: React.FC = () => {
  return (
    <NextLink passHref href="/">
      <Flex
        gap="2"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="row"
        cursor="pointer"
        title="my.finance$"
      >
        <Image src="/logo.svg" width="36px" height="auto" />
        <HStack spacing="0" fontSize="24px" fontWeight="700" color="white">
          <Text>my</Text>
          <Text>.</Text>
          <Text>finance</Text>
          <Text color="green.500">$</Text>
        </HStack>
      </Flex>
    </NextLink>
  );
};

export default LogoComponent;
