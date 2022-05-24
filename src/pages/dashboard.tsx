// Imports React
import React, { Fragment } from "react";

// Imports Next
import NextHead from "next/head";
import { NextPage } from "next";

// Chakra Imports
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  Spinner,
  VStack,
  Tooltip,
} from "@chakra-ui/react";

// Components Imports
import LogoComponent from "../components/Logo";
import CardComponent from "../components/Card";
import ProfileComponent from "../components/Profile";
import ActionBarComponent from "../components/ActionBar";

// Another Imports
import { RiAddFill } from "react-icons/ri";
import { FiDollarSign, FiArrowUp, FiArrowDown } from "react-icons/fi";

const DashboardPage: NextPage = () => {
  return (
    <Fragment>
      <NextHead>
        <title>my.finance$ | Dashboard</title>
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
          <SimpleGrid spacing="4" width="100%" height="auto" columns={2}>
            <Box borderRadius="10" display="flex" flexDirection="column" justifyContent="space-between">
              <CardComponent
                title="Balanço"
                value="R$ 52.000,00"
                icon={<FiDollarSign fontSize="28" color="yellow" />}
              />

              <Flex padding="4" justifyContent="space-around">
                <Tooltip hasArrow label="Lançamentos de entrada" fontSize="12">
                  <HStack>
                    <FiArrowDown fontSize="28" color="green" />
                    <Text as="h3" fontSize="22px" fontWeight="bold">
                      1500
                    </Text>
                  </HStack>
                </Tooltip>
                <Tooltip hasArrow label="Lançamentos de saída" fontSize="12">
                  <HStack>
                    <FiArrowUp fontSize="28" color="red" />
                    <Text as="h3" fontSize="22px" fontWeight="bold">
                      1400
                    </Text>
                  </HStack>
                </Tooltip>
              </Flex>
            </Box>
            <SimpleGrid spacing="4" width="100%" columns={1}>
              <Box borderRadius="10">
                <CardComponent
                  title="Entradas"
                  value="R$ 100.000,00"
                  icon={<FiArrowDown fontSize="28" color="green" />}
                />
              </Box>
              <Box borderRadius="10">
                <CardComponent title="Saídas" value="R$ -48.000,00" icon={<FiArrowUp fontSize="28" color="red" />} />
              </Box>
            </SimpleGrid>
          </SimpleGrid>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default DashboardPage;
