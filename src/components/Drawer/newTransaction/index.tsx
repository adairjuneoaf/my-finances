// Imports React
import React from "react";

// Chakra Imports
import {
  Flex,
  Radio,
  RadioGroup,
  VStack,
  Text,
  HStack,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  InputGroup,
  InputLeftAddon,
  DrawerBody,
  DrawerFooter,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

// Another Imports
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Typings[TypeScript]
import { TransactionData } from "../types";
import { InputComponent } from "../../Form/Input";
import { FiSave, FiX } from "react-icons/fi";

const validationNewTransactionForm = yup.object().shape({
  id: yup.string().uuid(),
  title: yup.string().required("O título é obrigatório!").min(8, "O mínimo de caracteres é 8."),
  description: yup.string().required("A descrição é obrigatória!").min(12, "O mínimo de caracteres é 12."),
  type: yup.string(),
  value: yup.number().min(0.01, "O valor mínimo é R$ 0.01!"),
});

const NewTransactionBody: React.FC = () => {
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(validationNewTransactionForm),
  });

  const { errors } = formState;

  const submitNewTransaction: SubmitHandler<TransactionData> = (data) => {
    console.log(data);
  };

  return (
    <Flex
      as="form"
      height="100%"
      width="100%"
      onSubmit={handleSubmit(submitNewTransaction)}
      flexDirection="column"
      justifyContent="flex-start"
    >
      <DrawerBody display="flex" flexDirection="column" justifyContent="flex-start" gap="3">
        <VStack spacing="3">
          <InputComponent
            id="title"
            type="text"
            label="Título do lançamento"
            {...register("title")}
            errorInput={errors.title}
          />
          <InputComponent
            id="description"
            type="text"
            label="Descrição do lançamento"
            {...register("description")}
            errorInput={errors.description}
          />
        </VStack>

        <VStack alignItems="flex-start" spacing="2">
          <Text as="label" fontSize="lg" padding="0" marginY="2" fontWeight="medium">
            Tipo de lançamento
          </Text>
          <RadioGroup defaultValue="0">
            <HStack spacing="6">
              <Radio value="0" size="md" colorScheme="red" {...register("type")}>
                Saída
              </Radio>
              <Radio value="1" size="md" colorScheme="green" {...register("type")}>
                Entrada
              </Radio>
            </HStack>
          </RadioGroup>
        </VStack>

        <VStack alignItems="flex-start" spacing="2">
          <Text as="label" fontSize="lg" padding="0" marginY="2" fontWeight="medium">
            Valor do lançamento
          </Text>
          <InputGroup>
            <InputLeftAddon
              backgroundColor="gray.700"
              border="none"
              color="white"
              fontSize="16px"
              fontWeight="bold"
              children={"R$"}
            />
            <NumberInput
              min={0}
              precision={2}
              defaultValue={0}
              width="100%"
              variant="filled"
              focusBorderColor="green.500"
            >
              <NumberInputField
                borderColor="gray.700"
                backgroundColor="transparent"
                borderRadius="0px 6px 6px 0px"
                _hover={{ backgroundColor: "transparent", borderColor: "gray.600" }}
                {...register("value")}
              />
              <NumberInputStepper>
                <NumberIncrementStepper borderColor="gray.700" />
                <NumberDecrementStepper borderColor="gray.700" />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          {errors.value && <Text>{errors.value?.message}</Text>}
          {/* CRIAR UM COMPONENTE DE INPUT PARA O VALOR DO LANÇAMENTO, É NECESSÁRIO POR CONTA DOS ERROS QUE SÃO PASSADOS NA VALIDAÇÃO DOS DADOS, CASO EXISTA. */}
          <Text></Text>
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <HStack>
          <Button type="button" leftIcon={<FiX fontSize="18" />} colorScheme="red">
            Cancelar
          </Button>
          <Button type="submit" leftIcon={<FiSave fontSize="18" />} colorScheme="green">
            Salvar
          </Button>
        </HStack>
      </DrawerFooter>
    </Flex>
  );
};

export default NewTransactionBody;
