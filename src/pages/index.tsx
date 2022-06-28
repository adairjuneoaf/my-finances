// Imports React
import React, { Fragment } from "react";

// Imports Next
import Head from "next/head";
import NextLink from "next/link";
import { signIn } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import { getServerSession } from "next-auth";
import { GetServerSideProps, NextPage } from "next";
import { authOptions } from "./api/auth/[...nextauth]";

// Chakra Imports
import {
  Box,
  Flex,
  Link,
  Text,
  Alert,
  Button,
  HStack,
  VStack,
  AlertIcon,
  AlertTitle,
  IconButton,
  AlertDescription,
} from "@chakra-ui/react";

// Components Imports
import { InputComponent } from "../components/Form/Input";

// Another Imports
import { RiGithubLine, RiGoogleFill } from "react-icons/ri";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Typings[TypeScript]
type FormLoginData = {
  email: string;
  password: string;
};

interface QueryProps extends ParsedUrlQuery {
  authorized?: "false" | "true";
}

const validationSubmitSignInForm = yup.object().shape({
  email: yup
    .string()
    .required("O endereço de e-mail é obrigatório.")
    .email("E-mail inválido!"),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(8, "O mínimo de caracteres é 8."),
});

const HomePage: NextPage<QueryProps> = ({ authorized }) => {
  const { register, handleSubmit, formState } = useForm<FormLoginData>({
    resolver: yupResolver(validationSubmitSignInForm),
  });

  const { errors, isSubmitting } = formState;

  const handlerSubmitSignInForm: SubmitHandler<FormLoginData> = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <Fragment>
      <Head>
        <title>my.finance$ | Controle financeiro pessoal</title>
      </Head>

      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Flex
          width="100%"
          maxWidth={480}
          backgroundColor="gray.800"
          padding="8"
          borderRadius="10"
          flexDirection="column"
        >
          {authorized === "false" && (
            <Alert
              status="warning"
              backgroundColor="rgb(251 211 141 / 16%)"
              marginBottom="4"
              borderRadius="10"
            >
              <AlertIcon color="orange.200" />
              <VStack alignItems="flex-start" spacing="1">
                <AlertTitle>Sessão não encontrada</AlertTitle>
                <AlertDescription>
                  Efetue o login para acessar a plataforma
                </AlertDescription>
              </VStack>
            </Alert>
          )}
          <Flex
            as="section"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Text as="h1" fontSize={28} fontWeight="bold" marginBottom="4">
              Login
            </Text>

            <HStack spacing="2">
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
                onClick={() => {
                  signIn("github", {
                    callbackUrl: "/dashboard",
                  });
                }}
              />

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

          <VStack
            spacing="4"
            as="form"
            onSubmit={handleSubmit(handlerSubmitSignInForm)}
          >
            <InputComponent
              id="email"
              type="email"
              placeholder="E-mail"
              size="lg"
              {...register("email")}
              errorInput={errors.email}
            />

            <InputComponent
              id="password"
              type="password"
              placeholder="Senha"
              size="lg"
              {...register("password")}
              errorInput={errors.password}
            />

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
              isLoading={isSubmitting}
            >
              ENTRAR
            </Button>
          </VStack>
        </Flex>

        <Box as="footer" marginY="2" padding="2">
          <Text as="h4" fontSize="small" color="gray.600">
            my.finances -&nbsp;
            <Link
              href="https://portfolio-adairjuneo.vercel.app/"
              isExternal
              _hover={{ color: "gray.300", textDecoration: "underline" }}
            >
              Adair Juneo
            </Link>
            &nbsp;all rights reserved
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context, authOptions);

  const { authorized = null } = context.query as QueryProps;

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      authorized,
    },
  };
};

export default HomePage;
