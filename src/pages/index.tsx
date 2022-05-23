// Imports React
import React, { Fragment } from "react";

// Imports Next
import Head from "next/head";
import { NextPage } from "next";

// Chakra Imports
import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, Text, VStack } from "@chakra-ui/react";

// Another Imports

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>my.finances - Controle financeiro pessoal</title>
      </Head>

      <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center">
        <Flex
          as="div"
          width="100%"
          maxWidth={480}
          backgroundColor="gray.800"
          padding="8"
          borderRadius="10"
          flexDirection="column"
        >
          <Text as="h1" fontSize={28} fontWeight="bold" marginBottom="4">
            Login
          </Text>
          <FormControl isRequired>
            <VStack spacing="4">
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                fontSize={18}
                padding="6"
                variant="filled"
                backgroundColor="transparent"
                borderColor="gray.700"
                _hover={{ backgroundColor: "transparent" }}
                focusBorderColor="green.500"
              />
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                fontSize={18}
                padding="6"
                variant="filled"
                backgroundColor="transparent"
                borderColor="gray.700"
                _hover={{ backgroundColor: "transparent" }}
                focusBorderColor="green.500"
              />
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
            <FormHelperText marginTop="6">my.finances - Prisma Systems all rights reserved</FormHelperText>
          </FormControl>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default HomePage;
