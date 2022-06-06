// Imports React
import React, { useContext } from "react";

// Chakra Imports
import { Flex, Text, Radio, HStack, VStack, Button, DrawerBody, RadioGroup, DrawerFooter } from "@chakra-ui/react";

// Component Imports
import { InputComponent } from "../../Form/Input";
import { InputValueComponent } from "../../Form/InputValue";
import { InputTextAreaComponent } from "../../Form/InputTextArea";

// Another Imports
import { FiSave, FiX } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

// Context Imports
import { ContextDrawer } from "../../../contexts/contextDrawer";

// Typings[TypeScript]
import { NewTransactionData } from "../types";
import { SelectComponent } from "../../Form/Select";

const validationNewTransactionForm = yup.object().shape({
  id: yup.string().uuid(),
  type: yup.number(),
  status: yup.number(),
  title: yup.string().required("O título é obrigatório!").min(8, "O mínimo de caracteres é 8."),
  description: yup.string().required("A descrição é obrigatória!").min(12, "O mínimo de caracteres é 12."),
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

let Options = [
  {
    id: "001",
    title: "Empresa 01",
    value: "empresa_00001",
  },
  {
    id: "002",
    title: "Empresa 02",
    value: "empresa_00002",
  },
  {
    id: "003",
    title: "Empresa 03",
    value: "empresa_00003",
  },
  {
    id: "004",
    title: "Empresa 04",
    value: "empresa_00004",
  },
];

const NewTransactionBody: React.FC = () => {
  const { handleSubmit, register, formState, reset } = useForm<NewTransactionData>({
    resolver: yupResolver(validationNewTransactionForm),
  });

  const { onClose } = useContext(ContextDrawer);

  const { errors, isSubmitting } = formState;

  const submitNewTransaction: SubmitHandler<NewTransactionData> = async ({ id, ...data }) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log({ id: uuid(), ...data });
        resolve(data);
      }, 3000);
    });
  };

  const cancelSubmitTransaction = () => {
    onClose();
    reset();
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

        <HStack alignItems="flex-start" justifyContent="space-between" spacing="3">
          <VStack alignItems="flex-start" spacing="3">
            <Text as="label" fontSize="lg" padding="0" marginY="2" fontWeight="medium">
              Tipo de lançamento
            </Text>
            <RadioGroup defaultValue={"0"}>
              <HStack spacing="4">
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
            <Text as="label" fontSize="lg" padding="0" marginY="2" fontWeight="medium">
              Status do lançamento
            </Text>
            <RadioGroup defaultValue={"0"}>
              <HStack spacing="4">
                <Radio value={"0"} size="md" colorScheme="yellow" {...register("status")}>
                  Em aberto
                </Radio>
                <Radio value={"1"} size="md" colorScheme="green" {...register("status")}>
                  Concluído
                </Radio>
              </HStack>
            </RadioGroup>
          </VStack>
        </HStack>

        <VStack alignItems="flex-start" spacing="3">
          <SelectComponent
            isRequired
            options={Options}
            label="Credor/Devedor"
            placeholder="Selecionar credor ou devedor..."
            {...register("creditorDebtor")}
          />
        </VStack>

        <VStack alignItems="flex-start" spacing="3">
          <InputValueComponent
            id="valueTransaction"
            isRequired
            label="Valor do lançamento"
            {...register("valueTransaction")}
            errorInput={errors.valueTransaction}
          />
          <InputTextAreaComponent
            id="anotherInformation"
            label="Outras informações"
            placeholder="Outras informações relevantes sobre o lançamento..."
            {...register("anotherInformation")}
            errorInput={errors.anotherInformation}
          />
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <HStack>
          <Button
            type="button"
            leftIcon={<FiX fontSize="18" />}
            colorScheme="red"
            onClick={cancelSubmitTransaction}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" leftIcon={<FiSave fontSize="18" />} colorScheme="green" isLoading={isSubmitting}>
            Salvar
          </Button>
        </HStack>
      </DrawerFooter>
    </Flex>
  );
};

export default NewTransactionBody;
