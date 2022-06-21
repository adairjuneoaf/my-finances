// Imports React
import React, { Fragment, useContext, useMemo, useState } from "react";

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
import TableTransactionsComponent from "../components/TableTransactions";

// Contexts Imports
import { ContextDrawer } from "../contexts/contextDrawer";

// Hooks Imports
import { useReactQuery } from "../hooks/useReactQuery";

// Another Imports
import { RiAddFill } from "react-icons/ri";
import { FiList, FiSettings, FiTrendingDown, FiTrendingUp, FiActivity } from "react-icons/fi";
import { formatValueToMoney } from "../utils/formatValueToMoney";

const DashboardPage: NextPage = () => {
  const [totalInput, setTotalInput] = useState('R$ 0,00');
  const [totalOutput, setTotalOutput] = useState('R$ 0,00');
  const [totalBalance, setTotalBalance] = useState('R$ 0,00');

  const { handleDrawerNewTransaction } = useContext(ContextDrawer);

  const { transactions } = useReactQuery();

  const { data, isFetching, isLoading } = transactions;

  const transactionsList = data?.slice(0, 5);

  useMemo(() => {
    let TotalInput = 0;
    let TotalOutput = 0;
    let TotalBalance = 0;

    data?.reduce((total, data) => {
      if (data.type === '0') {
        return TotalOutput = total + data.valueTransaction
      }

      return 0;
    }, 0);

    data?.reduce((total, data) => {
      if (data.type === '1') {
        return TotalInput = total + data.valueTransaction
      }

      return 0;
    }, 0);


    TotalBalance = (TotalInput - TotalOutput);

    setTotalInput(formatValueToMoney(TotalInput));
    setTotalOutput(formatValueToMoney(TotalOutput));
    setTotalBalance(formatValueToMoney(TotalBalance));

  }, [data]);

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
            {isFetching && !isLoading && <Spinner color="green.500" size="md" thickness="4px" speed="0.5s" />}
          </HStack>
          <HStack spacing="4">
            <NextLink passHref href="/records">
              <Button type="button" colorScheme="blue" leftIcon={<FiSettings fontSize="18" />}>
                Cadastros
              </Button>
            </NextLink>
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
            <CardComponent title="Balanço" value={totalBalance} icon={<FiActivity fontSize="28" color="yellow" />} />
            <CardComponent title="Entradas" value={totalInput} icon={<FiTrendingDown fontSize="28" color="green" />} />
            <CardComponent title="Saídas" value={totalOutput} icon={<FiTrendingUp fontSize="28" color="red" />} />
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
          <TableTransactionsComponent transactions={transactionsList} isLoading={isLoading} />
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default DashboardPage;
