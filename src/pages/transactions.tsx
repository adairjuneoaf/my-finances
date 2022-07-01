// Imports React
import React, { Fragment, useContext } from "react";

// Imports Next
import NextHead from "next/head";
import { getServerSession } from "next-auth";
import { GetServerSideProps, NextPage } from "next";
import { authOptions } from "./api/auth/[...nextauth]";

// Chakra Imports
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  HStack,
  Spinner,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

// Components Imports
import HeaderComponent from "../components/Header";
import DrawerComponentComponent from "../components/Drawer";
import SideBarNavigationComponent from "../components/SideBarNavigation";
import TableTransactionsComponent from "../components/TableTransactions";

// Contexts Imports
import { ContextDrawer } from "../contexts/contextDrawer";

// Hooks Imports
import { useReactQuery } from "../hooks/useReactQuery";

// Another Imports
import { FiSearch } from "react-icons/fi";
import { RiAddFill } from "react-icons/ri";

import { getAllTransactionsAPIRoute } from "../services/api";

const TransactionsPage: NextPage = () => {
  const { handleDrawerNewTransaction } = useContext(ContextDrawer);

  const { transactions } = useReactQuery();

  const { data: transactionsList, isFetching, isLoading } = transactions;

  return (
    <Fragment>
      <NextHead>
        <title>my.finance$ | Lançamentos</title>
      </NextHead>
      <Flex width="100vw" height="auto" flexDirection="column">
        <HeaderComponent />
        <DrawerComponentComponent />

        <Flex
          gap="12"
          width="100%"
          marginTop="10"
          marginBottom="6"
          marginX="auto"
          maxWidth={1480}
        >
          <Flex flexDirection="column">
            <SideBarNavigationComponent />
          </Flex>

          <Flex flexDirection="column" width="100%" flex="1" paddingTop="6">
            <Box as="section">
              <HStack
                spacing="4"
                alignItems="center"
                marginBottom="6"
                flexDirection="row"
                justifyContent="space-between"
              >
                <HStack spacing="4" alignItems="center">
                  <Text
                    as="h1"
                    fontSize="3xl"
                    fontWeight="extrabold"
                    lineHeight="0"
                  >
                    Lançamentos
                  </Text>
                  {isFetching && !isLoading && (
                    <Spinner
                      color="green.500"
                      size="md"
                      thickness="4px"
                      speed="0.5s"
                    />
                  )}
                </HStack>

                <HStack spacing="4">
                  <Button
                    colorScheme="facebook"
                    onClick={getAllTransactionsAPIRoute}
                  >
                    teste_api
                  </Button>
                  <Button
                    type="button"
                    colorScheme="green"
                    leftIcon={<RiAddFill fontSize="24" />}
                    onClick={handleDrawerNewTransaction}
                  >
                    Novo lançamento
                  </Button>
                </HStack>
              </HStack>
            </Box>

            <Box as="section">
              <InputGroup paddingX="8" paddingBottom="8">
                <InputLeftAddon
                  border="none"
                  pointerEvents="none"
                  color="gray.500"
                  backgroundColor="gray.700"
                >
                  <FiSearch fontSize="18" />
                </InputLeftAddon>
                <Input
                  placeholder="Buscar lançamento"
                  id="search"
                  name="search"
                  type="search"
                  variant="filled"
                  fontSize="18"
                  borderColor="gray.700"
                  backgroundColor="transparent"
                  focusBorderColor="green.500"
                  _hover={{ backgroundColor: "transparent" }}
                />
              </InputGroup>

              <Box as="div" paddingX="8">
                <TableTransactionsComponent
                  transactions={transactionsList}
                  isLoading={isLoading}
                />
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/?${"authorized=false"}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default TransactionsPage;
