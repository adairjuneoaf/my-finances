// Imports React
import React, { Fragment } from "react";

// Imports Next
import Head from "next/head";
import { NextPage } from "next";
import NextLink from "next/link";

// Chakra Imports
import { Box, Button, Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";

// Components Imports
import InputComponent from "../components/Form/Input";

// Another Imports
import { RiGithubLine, RiGoogleFill } from "react-icons/ri";

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>my.finances | Controle financeiro pessoal</title>
      </Head>

      <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center" flexDirection="column">
        <Flex
          as="form"
          width="100%"
          maxWidth={480}
          backgroundColor="gray.800"
          padding="8"
          borderRadius="10"
          flexDirection="column"
        >
          <Flex as="section" alignItems="center" justifyContent="space-between" flexDirection="row">
            <Text as="h1" fontSize={28} fontWeight="bold" marginBottom="4">
              Login
            </Text>

            <HStack spacing="2">
              <NextLink passHref href="/dashboard">
                <IconButton
                  as="a"
                  size="md"
                  colorScheme="gray"
                  aria-label="github-login"
                  title="Login com GitHub"
                  icon={<RiGithubLine fontSize="24" />}
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "gray.900" }}
                  cursor="pointer"
                />
              </NextLink>

              <NextLink passHref href="/dashboard">
                <IconButton
                  as="a"
                  size="md"
                  colorScheme="gray"
                  aria-label="github-login"
                  title="Login com Google"
                  icon={<RiGoogleFill fontSize="24" />}
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "gray.900" }}
                  cursor="pointer"
                />
              </NextLink>
            </HStack>
          </Flex>

          <VStack spacing="4">
            <InputComponent name="email" type="email" placeholder="E-mail" size="lg" />

            <InputComponent name="password" type="password" placeholder="Senha" size="lg" />
          </VStack>

          <Button
            type="submit"
            width="100%"
            padding="6"
            marginTop="6"
            fontSize="18"
            fontWeight="medium"
            colorScheme="green"
            backgroundColor="green.500"
            _hover={{ backgroundColor: "green.600" }}
          >
            ENTRAR
          </Button>
        </Flex>

        <Box as="footer" marginY="2" padding="2">
          <Text as="h4" fontSize="small" color="gray.600">
            my.finances - Prisma Systems all rights reserved
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default HomePage;
