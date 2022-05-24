// Imports React
import React, { Fragment } from "react";

// Imports Next
import NextHead from "next/head";
import { NextPage } from "next";

// Chakra Imports
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";

// Components Imports

// Another Imports
import { RiAddFill } from "react-icons/ri";

const DashboardPage: NextPage = () => {
  return (
    <Fragment>
      <NextHead>
        <title>my.finances | Dashboard</title>
      </NextHead>
      <Flex width="100vw" height="auto" flexDirection="column">
        <Flex width="100vw" maxHeight="88px" backgroundColor="gray.800">
          <Box
            as="header"
            width="80vw"
            height="100%"
            margin="auto"
            paddingY="8px"
            display="flex"
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
          >
            <h1>TOP BAR</h1>
            <h1>TOP BAR</h1>
            <h1>TOP BAR</h1>
            <h1>TOP BAR</h1>
            <h1>TOP BAR</h1>
            <h1>TOP BAR</h1>
          </Box>
        </Flex>

        <HStack width="68vw" height="100%" margin="auto" marginY="8" justifyContent="space-between" flexDirection="row">
          <Text as="h1" fontSize="3xl" fontWeight="extrabold">
            Dashboard
          </Text>

          <Button type="button" colorScheme="green" leftIcon={<RiAddFill fontSize="24" />}>
            Novo lançamento
          </Button>
        </HStack>

        <Flex
          as="section"
          width="68vw"
          height="100%"
          padding="8"
          margin="auto"
          borderRadius="10"
          backgroundColor="gray.800"
        >
          <h1>data</h1>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default DashboardPage;
