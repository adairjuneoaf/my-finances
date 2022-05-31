// Imports React
import React from "react";

// Chakra Imports
import { Flex, Text, Radio, HStack, VStack, Button, DrawerBody, RadioGroup, DrawerFooter } from "@chakra-ui/react";

// Component Imports
import { InputComponent } from "../../Form/Input";

// Another Imports
import { FiSave, FiX } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";

// Typings[TypeScript]
import { TransactionData } from "../types";
import { InputValueComponent } from "../../Form/InputValue";
import { InputTextAreaComponent } from "../../Form/InputTextArea";

const validationNewTransactionForm = yup.object().shape({
  id: yup.string().uuid(),
  title: yup.string().required("O título é obrigatório!").min(8, "O mínimo de caracteres é 8."),
  description: yup.string().required("A descrição é obrigatória!").min(12, "O mínimo de caracteres é 12."),
  type: yup.number(),
  valueTransaction: yup.number().required("O valor da transação é obrigatório!").min(0.01, "O valor mínimo é R$ 0.01"),
  dateEntriesTransaction: yup
    .number()
    .transform((_, date) => {
      return date ? new Date(date).getTime() : 0;
    })
    .min(1, "Informe a data de lançamento")
    .required("A data de lançamento é obrigatória!"),
  dateDueTransaction: yup
    .number()
    .transform((_, date) => {
      return date ? new Date(date).getTime() : 0;
    })
    .min(1, "Informe a data de vencimento")
    .required("A data de vencimento é obrigatória!"),
  anotherInformation: yup.string(),
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
            isRequired
            {...register("title")}
            errorInput={errors.title}
          />
          <InputComponent
            id="description"
            type="text"
            isRequired
            label="Descrição do lançamento"
            {...register("description")}
            errorInput={errors.description}
          />
        </VStack>
        <HStack alignItems="flex-start" spacing="3">
          <InputComponent
            id="dateEntriesTransaction"
            label="Data de lançamento"
            type="date"
            isRequired
            {...register("dateEntriesTransaction")}
            errorInput={errors.dateEntriesTransaction}
          />
          <InputComponent
            id="dateDueTransaction"
            label="Data de vencimento"
            type="date"
            isRequired
            {...register("dateDueTransaction")}
            errorInput={errors.dateDueTransaction}
          />
        </HStack>

        <VStack alignItems="flex-start" spacing="3">
          <Text as="label" fontSize="lg" padding="0" marginY="2" fontWeight="medium">
            Tipo de lançamento
          </Text>
          <RadioGroup defaultValue={"0"}>
            <HStack spacing="6">
              <Radio value={"0"} size="md" colorScheme="red" {...register("type")}>
                Saída
              </Radio>
              <Radio value={"1"} size="md" colorScheme="green" {...register("type")}>
                Entrada
              </Radio>
            </HStack>
          </RadioGroup>
        </VStack>

        <VStack alignItems="flex-start" spacing="3">
          <InputValueComponent
            id="valueTransaction"
            type="number"
            isRequired
            label="Valor do lançamento"
            {...register("valueTransaction")}
            errorInput={errors.valueTransaction}
          />
          <InputTextAreaComponent
            id="anotherInformation"
            label="Outras informações"
            placeholder="Outras informações sobre o lançamento..."
            {...register("anotherInformation")}
            errorInput={errors.anotherInformation}
          />
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <HStack>
          <Button type="reset" leftIcon={<FiX fontSize="18" />} colorScheme="red">
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
