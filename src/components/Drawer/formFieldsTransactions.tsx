// React Imports
import { Fragment, useContext, useEffect } from "react";

// Chakra Imports
import {
  Text,
  Radio,
  HStack,
  VStack,
  Button,
  Spinner,
  DrawerBody,
  RadioGroup,
  DrawerFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Skeleton,
} from "@chakra-ui/react";

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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import validationTransactionForm from "./formValidationTransactions";
import SkeletonComponent from "../Skeleton";

export const getFormFieldsTransaction = () => {
  const { handleSubmit, register, formState, reset, setValue, control, resetField } = useForm<TransactionDataType>({
    resolver: yupResolver(validationTransactionForm),
    mode: "onBlur",
  });

  const {
    isEditing,
    disclosure,
    drawerType,
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
      resetField("type", {
        defaultValue: "0",
      });
      resetField("status", {
        defaultValue: "0",
      });
      resetField("valueTransaction", {
        defaultValue: 0,
      });

      handleResetTransactionID();
    });
  };

  const cancelSubmitTransaction = () => {
    onClose();
    reset();
    resetField("type", {
      defaultValue: "0",
    });
    resetField("status", {
      defaultValue: "0",
    });
    resetField("valueTransaction", {
      defaultValue: 0,
    });

    if (isEditing) {
      handleResetTransactionID();
    }
  };

  useEffect(() => {
    if (transactionID !== null && drawerType === "edit-transaction") {
      getUniqueTransaction(transactionID)
        .then((response) => {
          Object.entries(response).forEach(([name, value]) => setValue(name as keyof TransactionDataType, value));
          console.log(response);
        })
        .catch((error) => {
          console.error("Error", error);
        })
        .finally(() => {
          handleIsLoadingDataForEdit();
        });
    }
  }, [isEditing]);

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
            isLoadingValue={isLoadingDataForEdit}
            {...register("title")}
            errorInput={errors.title}
          />
          <InputComponent
            id="description"
            type="text"
            isRequired
            isLoadingValue={isLoadingDataForEdit}
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
            isLoadingValue={isLoadingDataForEdit}
            {...register("dateEntriesTransaction")}
            errorInput={errors.dateEntriesTransaction}
          />
          <InputComponent
            id="dateDueTransaction"
            label="Data de vencimento"
            type="date"
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            {...register("dateDueTransaction")}
            errorInput={errors.dateDueTransaction}
          />
        </HStack>

        <HStack alignItems="flex-start">
          <VStack alignItems="flex-start" spacing="3" flex="1">
            <FormControl isInvalid={!!errors.type} isRequired>
              <FormLabel htmlFor="status" fontSize="lg" padding="0" marginY="2" fontWeight="medium">
                Tipo de lançamento
              </FormLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <SkeletonComponent isLoading={isLoadingDataForEdit}>
                    <RadioGroup {...field}>
                      <HStack spacing="3">
                        <Radio value="0" colorScheme="red">
                          Saída
                        </Radio>
                        <Radio value="1" colorScheme="green">
                          Entrada
                        </Radio>
                      </HStack>
                    </RadioGroup>
                  </SkeletonComponent>
                )}
              />
              {errors.type && <FormErrorMessage>{errors?.type.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
          <VStack alignItems="flex-start" spacing="3" flex="1">
            <FormControl isInvalid={!!errors.status} isRequired>
              <FormLabel htmlFor="status" fontSize="lg" padding="0" marginY="2" fontWeight="medium">
                Status do lançamento
              </FormLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <SkeletonComponent isLoading={isLoadingDataForEdit}>
                    <RadioGroup {...field}>
                      <HStack spacing="3">
                        <Radio value="0" colorScheme="yellow">
                          Em aberto
                        </Radio>
                        <Radio value="1" colorScheme="green">
                          Concluído
                        </Radio>
                      </HStack>
                    </RadioGroup>
                  </SkeletonComponent>
                )}
              />
              {errors.status && <FormErrorMessage>{errors?.status.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
        </HStack>

        <VStack alignItems="flex-start" spacing="3">
          <SelectComponent
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            options={creditorsDebtorsList}
            label="Credor/Devedor"
            placeholder="Selecionar credor ou devedor..."
            errorSelectOption={errors.creditorDebtor}
            {...register("creditorDebtor")}
          />
        </VStack>

        <VStack alignItems="flex-start" spacing="1">
          <SelectComponent
            isLoadingValue={isLoadingDataForEdit}
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
            isLoadingValue={isLoadingDataForEdit}
            errorInput={errors.dataForPayment}
            {...register("dataForPayment")}
          />
        </VStack>

        <VStack alignItems="flex-start" spacing="3">
          <InputValueComponent
            id="valueTransaction"
            isRequired
            label="Valor do lançamento"
            isLoadingValue={isLoadingDataForEdit}
            errorInput={errors.valueTransaction}
            {...register("valueTransaction")}
          />
          <InputTextAreaComponent
            id="anotherInformation"
            label="Outras informações"
            placeholder="Outras informações relevantes sobre o lançamento..."
            isLoadingValue={isLoadingDataForEdit}
            errorInput={errors.anotherInformation}
            {...register("anotherInformation")}
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
            disabled={isSubmitting || isLoadingDataForEdit}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            colorScheme="green"
            isLoading={isSubmitting}
            leftIcon={<FiSave fontSize="18" />}
            onClick={handleSubmit(submitTransaction)}
            disabled={isSubmitting || isLoadingDataForEdit}
          >
            Salvar
          </Button>
        </HStack>
      </DrawerFooter>
    </Fragment>
  );
};
