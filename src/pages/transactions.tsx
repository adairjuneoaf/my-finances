// Imports React
import React, { Fragment, useContext } from "react";

// Imports Next
import NextHead from "next/head";
import NextLink from "next/link";
import { NextPage } from "next";

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
import { FiActivity, FiSearch, FiSettings } from "react-icons/fi";
import { RiAddFill } from "react-icons/ri";

import {
  getAllPaymentMethodsAPIRoute,
  getAllTransactionsAPIRoute,
  getUniqueCreditorDebtorAPIRoute,
  getUniquePaymentMethodAPIRoute,
  getAllCreditorsDebtorsAPIRoute,
  getUniqueTransactionAPIRoute,
  postUniqueTransactionAPIRoute,
  postUniquePaymentMethodAPIRoute,
  postUniqueCreditorDebtorAPIRoute,
  putUniqueTransactionAPIRoute,
  patchUniqueTransactionAPIRoute,
  patchUniquePaymentMethodAPIRoute,
  patchUniqueCreditorDebtorAPIRoute,
  putUniqueCreditorDebtorAPIRoute,
} from "../services/api";

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

        <HStack
          width="68vw"
          height="100%"
          margin="auto"
          marginY="8"
          justifyContent="space-between"
          flexDirection="row"
        >
          <HStack spacing="4" alignItems="center">
            <Text as="h1" fontSize="3xl" fontWeight="extrabold">
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
            <NextLink passHref href="/dashboard">
              <Button
                type="button"
                colorScheme="whiteAlpha"
                leftIcon={<FiActivity fontSize="18" />}
              >
                Dashboard
              </Button>
            </NextLink>
            <NextLink passHref href="/records">
              <Button
                type="button"
                colorScheme="blue"
                leftIcon={<FiSettings fontSize="18" />}
              >
                Cadastros
              </Button>
            </NextLink>

            <Button
              type="button"
              colorScheme="red"
              onClick={() => {
                // postUniqueTransactionAPIRoute({
                //   id: "ee2fc04c-f343-11ec-b939-0242ac120002",
                //   type: "0",
                //   status: "1",
                //   valueTransaction: 301,
                //   dateDueTransaction: new Date(1655251200000),
                //   dateEntriesTransaction: new Date(1654992000000),
                //   title: "Financiamento apartamento CAIXA",
                //   description: "Lançamento de saída para pagamento sendo efetuado para testes com o Drawer",
                //   paymentMethod: "68f35a6a-eb41-11ec-8fea-0242ac120002",
                //   creditorDebtor: "a9f62e0c-eb41-11ec-8fea-0242ac120002",
                //   dataForPayment: "01926642635",
                //   anotherInformation: "Recebimento já concretizado antes da data de vencimento.",
                // });
                // getAllTransactionsAPIRoute();
                // getUniqueTransactionAPIRoute(
                //   "be808b96-eb42-11ec-8fea-0242ac120002"
                // );

                // putUniqueTransactionAPIRoute(
                //   "be808b96-eb42-11ec-8fea-0242ac120002",
                //   {
                //     type: "1",
                //     status: "1",
                //     valueTransaction: 4500,
                //     dateDueTransaction: 1655251200000,
                //     dateEntriesTransaction: 1654992000000,
                //     title: "Recebimento de salário",
                //     description:
                //       "Lançamento de ENTRADA para pagamento sendo efetuado para testes com a API ROUTE.",
                //     paymentMethod: "68f35a6a-eb41-11ec-8fea-0242ac120002",
                //     creditorDebtor: "a9f62e0c-eb41-11ec-8fea-0242ac120002",
                //     dataForPayment: "01926642635",
                //     anotherInformation:
                //       "Recebimento já concretizado antes da data de vencimento.",
                //   }
                // );

                patchUniqueTransactionAPIRoute(
                  "be808b96-eb42-11ec-8fea-0242ac120002",
                  {
                    status: "1",
                  }
                );
              }}
            >
              Transactions
            </Button>

            <Button
              type="button"
              colorScheme="yellow"
              onClick={() => {
                // getAllPaymentMethodsAPIRoute();

                // postUniquePaymentMethodAPIRoute({
                //   id: "647c8780-f60f-11ec-b939-0242ac120002",
                //   title: "Método Teste",
                //   status: "0",
                //   anotherInformation: "Novo método de pagamento teste cadastrado pela API Route."
                // })

                // getUniquePaymentMethodAPIRoute(
                //   "68f35920-eb41-11ec-8fea-0242ac120002"
                // );

                patchUniquePaymentMethodAPIRoute(
                  "647c8780-f60f-11ec-b939-0242ac120002",
                  {
                    status: "1",
                  }
                );
              }}
            >
              PaymentMethod
            </Button>

            <Button
              type="button"
              colorScheme="purple"
              onClick={() => {
                // getUniqueCreditorDebtorAPIRoute(
                //   "a9f62d30-eb41-11ec-8fea-0242ac120002"
                // );

                // getAllCreditorsDebtorsAPIRoute();

                // postUniqueCreditorDebtorAPIRoute({
                //   id: "04eb3c75-cf62-41a5-a28f-108364fb4fb0",
                //   title: "Binance Corretora",
                //   status: "0",
                //   anotherInformation:
                //     "Corretora responsável pelo retorno dos ganhos com investimento em cripto moedas.",
                // });

                // patchUniqueCreditorDebtorAPIRoute(
                //   "04eb3c75-cf62-41a5-a28f-108364fb4fb0",
                //   {
                //     status: "1",
                //   }
                // );

                putUniqueCreditorDebtorAPIRoute(
                  "04eb3c75-cf62-41a5-a28f-108364fb4fb0",
                  {
                    title: "Binance Corretora ALTERAÇÃO",
                    status: "0",
                    anotherInformation:
                      "Alteração COM PUT DA API ROUTE - Corretora responsável pelo retorno dos ganhos com investimento em cripto moedas.",
                  }
                );
              }}
            >
              CreditorDebtor
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

        <Flex
          as="section"
          width="68vw"
          height="100%"
          paddingY="4"
          paddingX="8"
          margin="auto"
        >
          <InputGroup>
            <InputLeftAddon
              border="none"
              pointerEvents="none"
              children={<FiSearch fontSize="18" />}
              color="gray.500"
              backgroundColor="gray.700"
            />
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

        <Flex width="68vw" height="100%" padding="8" margin="auto">
          <TableTransactionsComponent
            transactions={transactionsList}
            isLoading={isLoading}
          />
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default TransactionsPage;
