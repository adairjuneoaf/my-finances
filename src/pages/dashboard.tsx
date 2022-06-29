// Imports React
import React, { Fragment, useMemo, useState } from "react";

// Imports Next
import NextHead from "next/head";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

// Chakra Imports
import {
  Box,
  Flex,
  Text,
  Center,
  HStack,
  Spinner,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";

// Components Imports
import LogoComponent from "../components/Logo";
import CardComponent from "../components/Card";
import DrawerComponent from "../components/Drawer";
import ProfileComponent from "../components/Profile";
import ActionBarComponent from "../components/ActionBar";
import SideBarNavigationComponent from "../components/SideBarNavigation";
import TableTransactionsComponent from "../components/TableTransactions";

// Hooks Imports
import { useReactQuery } from "../hooks/useReactQuery";

// Utils Imports
import { formatValueToMoney } from "../utils/formatValueToMoney";

// Another Imports
import { FiActivity, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const DashboardPage: NextPage = () => {
  const [totalInput, setTotalInput] = useState("R$ 0,00");
  const [totalOutput, setTotalOutput] = useState("R$ 0,00");
  const [totalBalance, setTotalBalance] = useState("R$ 0,00");

  const { transactions } = useReactQuery();

  const { data, isFetching, isLoading } = transactions;

  const transactionsList = data?.slice(0, 5);

  useMemo(() => {
    let TotalInput = 0;
    let TotalOutput = 0;
    let TotalBalance = 0;

    data?.reduce((total, data) => {
      if (data.type === "0") {
        return (TotalOutput = total + data.valueTransaction);
      }

      return 0;
    }, 0);

    data?.reduce((total, data) => {
      if (data.type === "1") {
        return (TotalInput = total + data.valueTransaction);
      }

      return 0;
    }, 0);

    TotalBalance = TotalInput - TotalOutput;

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
          <DrawerComponent />
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
                  lineHeight="1"
                >
                  Dashboard
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
            </HStack>

            <Flex
              width="72vw"
              height="100%"
              paddingY="4"
              paddingX="8"
              margin="auto"
            >
              <SimpleGrid spacing="4" width="100%" height="auto" columns={3}>
                <CardComponent
                  title="Balanço"
                  value={totalBalance}
                  isLoading={isLoading}
                  icon={<FiActivity fontSize="28" color="yellow" />}
                />
                <CardComponent
                  title="Entradas"
                  value={totalInput}
                  isLoading={isLoading}
                  icon={<FiTrendingDown fontSize="28" color="green" />}
                />
                <CardComponent
                  title="Saídas"
                  value={totalOutput}
                  isLoading={isLoading}
                  icon={<FiTrendingUp fontSize="28" color="red" />}
                />
              </SimpleGrid>
            </Flex>

            <HStack
              width="72vw"
              height="100%"
              margin="auto"
              marginY="4"
              justifyContent="space-between"
              flexDirection="row"
            >
              <HStack spacing="4" alignItems="center">
                <Text as="h1" fontSize="3xl" fontWeight="extrabold">
                  Últimos lançamentos
                </Text>
              </HStack>
            </HStack>

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

export default DashboardPage;
