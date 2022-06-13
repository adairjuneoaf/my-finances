// Imports React
import React, { Fragment, useContext } from "react";

// Imports Next
import NextHead from "next/head";
import NextLink from "next/link";
import { NextPage } from "next";

// Chakra Imports
import { Box, Button, Center, Divider, Flex, HStack, SimpleGrid, Text, Spinner } from "@chakra-ui/react";

// Components Imports
import LogoComponent from "../components/Logo";
import CardComponent from "../components/Card";
import ProfileComponent from "../components/Profile";
import ActionBarComponent from "../components/ActionBar";
import DrawerComponentComponent from "../components/Drawer";
import MenuRecordsComponent from "../components/Menu/records";
import TableTransactionsComponent from "../components/TableTransactions";

// Contexts Imports
import { ContextDrawer } from "../contexts/contextDrawer";

// React-Query Imports
import { useQuery } from "react-query";

// API Imports
import { getAllTransactions } from "../services/api";

// Another Imports
import { RiAddFill } from "react-icons/ri";
import { FiList, FiDollarSign, FiArrowUp, FiArrowDown } from "react-icons/fi";

let valuesTest: any = [
  { id: "0001", description: "Teste de lançamento 1", type: 1, value: "R$ 2000" },
  { id: "0002", description: "Teste de lançamento 2", type: 0, value: "R$ -1000" },
  { id: "0003", description: "Teste de lançamento 3", type: 1, value: "R$ 1500" },
  { id: "0004", description: "Teste de lançamento 4", type: 1, value: "R$ 5000" },
  { id: "0005", description: "Teste de lançamento 5", type: 0, value: "R$ -3000" },
];

const DashboardPage: NextPage = () => {
  const { handleDrawerNewTransaction } = useContext(ContextDrawer);

  const transactionsData = useQuery("transactions", getAllTransactions, {
    cacheTime: 1000 * 60 * 1, // 1 Minute
    staleTime: 1000 * 60 * 1, // 1 Minute
    refetchInterval: 1000 * 60 * 1, // 1 Minute
    refetchOnWindowFocus: true,
    retry: false,
  });

  return (
    <Fragment>
      <NextHead>
        <title>my.finance$ | Dashboard</title>
      </NextHead>
      <Flex width="100vw" height="auto" flexDirection="column">
        <DrawerComponentComponent />
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
            justifyContent="space-between"
          >
            <Flex flex="2" paddingX="2">
              <LogoComponent />
            </Flex>
            <Flex alignItems="center" justifyContent="center" flex="10" paddingX="2"></Flex>
            <Flex alignItems="center" justifyContent="flex-end" flexDirection="row" flex="5" paddingX="2">
              <ActionBarComponent />
              <Center height="32px" paddingX="4">
                <Divider orientation="vertical" color="gray.100" />
              </Center>
              <ProfileComponent />
            </Flex>
          </Box>
        </Flex>

        <HStack width="68vw" height="100%" margin="auto" marginY="8" justifyContent="space-between" flexDirection="row">
          <HStack spacing="4" alignItems="center">
            <Text as="h1" fontSize="3xl" fontWeight="extrabold">
              Dashboard
            </Text>
            <Spinner color="green.500" size="md" thickness="4px" speed="0.5s" />
          </HStack>
          <HStack spacing="4">
            <MenuRecordsComponent />
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

        <Flex as="section" width="68vw" height="100%" padding="8" margin="auto">
          <SimpleGrid spacing="4" width="100%" height="auto" columns={3}>
            <CardComponent title="Balanço" value="R$ 52.000,00" icon={<FiDollarSign fontSize="28" color="yellow" />} />
            <CardComponent title="Entradas" value="R$ 100.000,00" icon={<FiArrowDown fontSize="28" color="green" />} />
            <CardComponent title="Saídas" value="R$ -48.000,00" icon={<FiArrowUp fontSize="28" color="red" />} />
          </SimpleGrid>
        </Flex>

        <HStack width="68vw" height="100%" margin="auto" marginY="8" justifyContent="space-between" flexDirection="row">
          <HStack spacing="4" alignItems="center">
            <Text as="h1" fontSize="3xl" fontWeight="extrabold">
              Últimos lançamentos
            </Text>
          </HStack>
          <NextLink passHref href="/transactions">
            <Button type="button" colorScheme="green" leftIcon={<FiList fontSize="24" />}>
              Ver todos
            </Button>
          </NextLink>
        </HStack>

        <Flex width="68vw" height="100%" padding="8" margin="auto">
          <TableTransactionsComponent transactions={valuesTest} />
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default DashboardPage;
