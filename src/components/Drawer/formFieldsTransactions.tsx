// React Imports
import { Fragment, useContext } from "react";

// Chakra Imports
import { Text, Radio, HStack, VStack, Button, DrawerBody, RadioGroup, DrawerFooter } from "@chakra-ui/react";

// Component Imports
import { InputComponent } from "../Form/Input";
import { SelectComponent } from "../Form/Select";
import { InputValueComponent } from "../Form/InputValue";
import { InputTextAreaComponent } from "../Form/InputTextArea";

import validationNewTransactionForm from "./formValidationTransactions";

// Context Imports
import { ContextDrawer } from "../../contexts/contextDrawer";

// Typings[TypeScript]
import { TransactionDataType } from "../../@types/TransactionDataType";

// Another Imports
import { FiSave, FiX } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

let Options = [
  {
    id: "001",
    title: "Empresa 01",
    value: uuid(),
  },
  {
    id: "002",
    title: "Empresa 02",
    value: uuid(),
  },
  {
    id: "003",
    title: "Empresa 03",
    value: uuid(),
  },
  {
    id: "004",
    title: "Empresa 04",
    value: uuid(),
  },
];

let OptionsPayment = [
  {
    id: "001",
    title: "Boleto",
    value: uuid(),
  },
  {
    id: "002",
    title: "PIX",
    value: uuid(),
  },
  {
    id: "003",
    title: "Cartão de Crédito",
    value: uuid(),
  },
  {
    id: "004",
    title: "Débito em conta",
    value: uuid(),
  },
];

export const getFormFieldsTransaction = () => {
  const { handleSubmit, register, formState, reset } = useForm<TransactionDataType>({
    resolver: yupResolver(validationNewTransactionForm),
  });

  const { disclosure } = useContext(ContextDrawer);

  const { onClose } = disclosure;

  const { errors, isSubmitting } = formState;

  const submitTransaction: SubmitHandler<TransactionDataType> = async ({ id, ...data }) => {
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
    <Fragment>
      <DrawerBody
        as="form"
        width="100%"
        height="auto"
        gap="3"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#353646",
          },
        }}
      >
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
            errorSelectOption={errors.creditorDebtor}
            {...register("creditorDebtor")}
          />
        </VStack>

        <VStack alignItems="flex-start" spacing="1">
          <SelectComponent
            options={OptionsPayment}
            label="Método de pagamento"
            errorSelectOption={errors.paymentMethod}
            {...register("paymentMethod")}
          />
          <InputComponent
            id="dataForPayment"
            label="Dados para pagamento"
            placeholder="Nº do boleto, código pix, dados do cartão de crédito..."
            _placeholder={{ fontSize: "14px" }}
            type="text"
            {...register("dataForPayment")}
            errorInput={errors.dataForPayment}
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
      <DrawerFooter borderTop="2px" borderColor="gray.700">
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
          <Button
            type="submit"
            colorScheme="green"
            isLoading={isSubmitting}
            leftIcon={<FiSave fontSize="18" />}
            onClick={handleSubmit(submitTransaction)}
          >
            Salvar
          </Button>
        </HStack>
      </DrawerFooter>
    </Fragment>
  );
};
