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
  Icon,
  Text,
  Button,
  Center,
  HStack,
  Divider,
  Spinner,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";

// Components Imports
import LogoComponent from "../components/Logo";
import ProfileComponent from "../components/Profile";
import ActionBarComponent from "../components/ActionBar";
import DrawerComponentComponent from "../components/Drawer";

// Contexts Imports
import { ContextDrawer } from "../contexts/contextDrawer";

// Hooks Imports
import { useReactQuery } from "../hooks/useReactQuery";

// Another Imports
import { FiActivity, FiCreditCard, FiList, FiUser, FiUserPlus } from "react-icons/fi";
import TablePaymentMethodsComponent from "../components/TablePaymentMethods";
import TableCreditorsDebtorsComponent from "../components/TableCreditorsDebtors/index";

const TransactionsPage: NextPage = () => {
  const { handleDrawerNewPaymentMethod, handleDrawerNewCreditorDebtor } = useContext(ContextDrawer);

  const { creditorsDebtors, paymentMethods } = useReactQuery();

  const {
    data: listCreditorsDebtors,
    isFetching: isFetchingCreditorsDebtors,
    isLoading: isLoadingCreditorsDebtors,
  } = creditorsDebtors;
  const {
    data: listPaymentMethods,
    isFetching: isFetchingPaymentMethods,
    isLoading: isLoadingPaymentMethods,
  } = paymentMethods;

  return (
    <Fragment>
      <NextHead>
        <title>my.finance$ | Cadastros</title>
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
              Cadastros
            </Text>
            {(isFetchingCreditorsDebtors || isFetchingPaymentMethods) &&
              (!isFetchingCreditorsDebtors || !isLoadingPaymentMethods) && (
                <Spinner color="green.500" size="md" thickness="4px" speed="0.5s" />
              )}
          </HStack>
          <HStack spacing="4">
            <NextLink passHref href="/dashboard">
              <Button type="button" colorScheme="whiteAlpha" leftIcon={<FiActivity fontSize="18" />}>
                Dashboard
              </Button>
            </NextLink>
            <NextLink passHref href="/transactions">
              <Button type="button" colorScheme="green" leftIcon={<FiList fontSize="24" />}>
                Lançamentos
              </Button>
            </NextLink>
          </HStack>
        </HStack>

        <Flex width="68vw" height="100%" padding="8" margin="auto">
          <Accordion allowToggle width="100%">
            <AccordionItem>
              <AccordionButton>
                <HStack spacing="3" flex="1">
                  <Icon as={FiCreditCard} fontSize="24" />
                  <Text as="h2" fontSize="xl" fontWeight="medium" textAlign="left">
                    Métodos de pagamento
                  </Text>
                </HStack>
                <AccordionIcon fontSize="24" />
              </AccordionButton>
              <AccordionPanel>
                <HStack paddingTop="2" paddingBottom="6">
                  <Button
                    type="button"
                    colorScheme="green"
                    fontSize="14"
                    fontWeight="medium"
                    leftIcon={<FiCreditCard fontSize="18" />}
                    onClick={handleDrawerNewPaymentMethod}
                  >
                    Novo Método de pagamento
                  </Button>
                </HStack>
                Segue abaixo uma tabela com todos os métodos de pagamento cadastros.
                <Flex width="100%" height="100%" paddingY="8" margin="auto">
                  <TablePaymentMethodsComponent
                    paymentMethods={listPaymentMethods}
                    isLoading={isLoadingPaymentMethods}
                  />
                </Flex>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <HStack spacing="3" flex="1">
                  <Icon as={FiUser} fontSize="24" />
                  <Text as="h2" fontSize="xl" fontWeight="medium" textAlign="left" flex="1">
                    Credores/Devedores
                  </Text>
                </HStack>
                <AccordionIcon fontSize="24" />
              </AccordionButton>
              <AccordionPanel>
                <HStack paddingTop="2" paddingBottom="6">
                  <Button
                    type="button"
                    colorScheme="green"
                    fontSize="14"
                    fontWeight="medium"
                    leftIcon={<FiUserPlus fontSize="18" />}
                    onClick={handleDrawerNewCreditorDebtor}
                  >
                    Novo Credor/Devedor
                  </Button>
                </HStack>
                Segue abaixo uma tabela com todos os credores/devedor cadastros.
                <Flex width="100%" height="100%" paddingY="8" margin="auto">
                  <TableCreditorsDebtorsComponent
                    creditorsDebtors={listCreditorsDebtors}
                    isLoading={isLoadingCreditorsDebtors}
                  />
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default TransactionsPage;
