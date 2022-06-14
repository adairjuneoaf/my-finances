// React Imports
import { Fragment, useContext, useEffect } from "react";

// Chakra Imports
import { Text, Radio, HStack, VStack, Button, DrawerBody, RadioGroup, DrawerFooter, Spinner } from "@chakra-ui/react";

// Component Imports
import { InputComponent } from "../Form/Input";
import { SelectComponent } from "../Form/Select";
import { InputValueComponent } from "../Form/InputValue";
import { InputTextAreaComponent } from "../Form/InputTextArea";

// Context Imports
import { ContextDrawer } from "../../contexts/contextDrawer";

// Hook Imports
import { useReactQuery } from "../../hooks/useReactQuery";

// API Services
import { getUniqueTransaction } from "../../services/api";

// Typings[TypeScript]
import { TransactionDataType } from "../../@types/TransactionDataType";

// Another Imports
import { FiSave, FiX } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import validationNewTransactionForm from "./formValidationTransactions";
import { RadioComponent } from "../Form/Radio";

export const getFormFieldsTransaction = () => {
  const { handleSubmit, register, formState, reset, setValue } = useForm<TransactionDataType>({
    resolver: yupResolver(validationNewTransactionForm),
  });

  const {
    isEditing,
    disclosure,
    transactionID,
    isLoadingDataForEdit,
    handleResetTransactionID,
    handleIsLoadingDataForEdit,
  } = useContext(ContextDrawer);

  const { onClose } = disclosure;

  const { errors, isSubmitting } = formState;

  const { creditorsDebtors, paymentMethods } = useReactQuery();

  const { data: creditorsDebtorsList } = creditorsDebtors;
  const { data: paymentMethodsList } = paymentMethods;

  const submitTransaction: SubmitHandler<TransactionDataType> = async ({ id, ...data }) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log({ ...data });
        resolve(data);
      }, 3000);
    }).then(() => {
      reset();
      handleResetTransactionID();
    });
  };

  const cancelSubmitTransaction = () => {
    onClose();
    reset();

    if (isEditing) {
      handleResetTransactionID();
    }
  };

  useEffect(() => {
    if (transactionID !== null) {
      getUniqueTransaction(transactionID)
        .then((response) => {
          Object.entries(response).forEach(([name, value]) => setValue(name as keyof TransactionDataType, value));
          console.log(response);
        })
        .catch((error) => {
          console.log("Error", error);
        })
        .finally(() => {
          handleIsLoadingDataForEdit();
        });
    }
  }, [isEditing]);

  if (isLoadingDataForEdit) {
    return (
      <DrawerBody
        as="div"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner color="green.500" size="md" thickness="4px" speed="0.5s" />
      </DrawerBody>
    );
  }

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

        <HStack alignItems="flex-start">
          <VStack alignItems="flex-start" spacing="3" flex="1">
            <Text as="label" fontSize="lg" padding="0" marginY="2" fontWeight="medium">
              Tipo de lançamento
            </Text>

            <HStack spacing="3">
              <RadioComponent id="type" label="Saída" value={"0"} {...register("type")} />
              <RadioComponent id="type" label="Entrada" value={"1"} {...register("type")} />
            </HStack>
          </VStack>
          <VStack alignItems="flex-start" spacing="3" flex="1">
            <Text as="label" fontSize="lg" padding="0" marginY="2" fontWeight="medium">
              Status do lançamento
            </Text>

            <HStack spacing="3">
              <RadioComponent id="type" label="Em aberto" value={"0"} {...register("status")} />
              <RadioComponent id="type" label="Concluído" value={"1"} {...register("status")} />
            </HStack>
          </VStack>
        </HStack>

        <VStack alignItems="flex-start" spacing="3">
          <SelectComponent
            isRequired
            options={creditorsDebtorsList}
            label="Credor/Devedor"
            placeholder="Selecionar credor ou devedor..."
            errorSelectOption={errors.creditorDebtor}
            {...register("creditorDebtor")}
          />
        </VStack>

        <VStack alignItems="flex-start" spacing="1">
          <SelectComponent
            options={paymentMethodsList}
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
