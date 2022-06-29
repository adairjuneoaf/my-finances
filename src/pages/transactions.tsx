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
  Center,
  HStack,
  Divider,
  Spinner,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

// Components Imports
import LogoComponent from "../components/Logo";
import ProfileComponent from "../components/Profile";
import ActionBarComponent from "../components/ActionBar";
import DrawerComponentComponent from "../components/Drawer";
import TableTransactionsComponent from "../components/TableTransactions";

// Contexts Imports
import { ContextDrawer } from "../contexts/contextDrawer";

// Hooks Imports
import { useReactQuery } from "../hooks/useReactQuery";

// Another Imports
import { FiSearch } from "react-icons/fi";
import { RiAddFill } from "react-icons/ri";

import SideBarNavigationComponent from "../components/SideBarNavigation";

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
        <DrawerComponentComponent />
        <Flex width="100vw" maxHeight="88px" backgroundColor="gray.800">
          <Box
            as="header"
            width="90vw"
            height="100%"
            margin="auto"
            paddingY="8px"
            display="flex"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Flex flex="2" paddingX="2">
              <LogoComponent />
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              flex="10"
              paddingX="2"
            ></Flex>
            <Flex
              alignItems="center"
              justifyContent="flex-end"
              flexDirection="row"
              flex="5"
              paddingX="2"
            >
              <ActionBarComponent />
              <Center height="32px" paddingX="4">
                <Divider orientation="vertical" color="gray.100" />
              </Center>
              <ProfileComponent />
            </Flex>
          </Box>
        </Flex>

        <Flex
          flexDirection="row"
          gap="8"
          width="86vw"
          margin="auto"
          marginY="8"
        >
          <Flex width="100%" flexDirection="column">
            <SideBarNavigationComponent />
          </Flex>
          <Flex flex="1" flexDirection="column">
            <HStack
              width="72vw"
              height="100%"
              margin="auto"
              marginBottom="3"
              justifyContent="space-between"
              flexDirection="row"
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
                  type="button"
                  colorScheme="green"
                  leftIcon={<RiAddFill fontSize="24" />}
                  onClick={handleDrawerNewTransaction}
                >
                  Novo lançamento
                </Button>
              </HStack>
            </HStack>

            <Flex
              as="div"
              width="72vw"
              height="100%"
              paddingY="4"
              paddingX="8"
              margin="auto"
            >
              <InputGroup>
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
            </Flex>

            <Flex
              width="72vw"
              height="100%"
              paddingY="4"
              paddingX="8"
              margin="auto"
            >
              <TableTransactionsComponent
                transactions={transactionsList}
                isLoading={isLoading}
              />
            </Flex>
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
