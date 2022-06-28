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
  FormControl,
  DrawerFooter,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

// Component Imports
import { InputComponent } from "../Form/Input";
import { InputTextAreaComponent } from "../Form/InputTextArea";

// Context Imports
import { ContextDrawer } from "../../contexts/contextDrawer";

// API Services
import { getUniqueCreditorDebtor } from "../../services/api";

// Typings[TypeScript]
import { CreditorDebtorType } from "../../@types/CreditorDebtorType";

// Another Imports
import { FiSave, FiX } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import validationCreditorDebtorForm from "./formValidationCreditorDebtor";

export const GetFormFieldsCreditorDebtor = () => {
  const { handleSubmit, register, formState, reset, control, setValue } =
    useForm<CreditorDebtorType>({
      resolver: yupResolver(validationCreditorDebtorForm),
    });

  const {
    isEditing,
    disclosure,
    creditorDebtorID,
    isLoadingDataForEdit,
    handleResetCreditorDebtorID,
    handleIsLoadingDataForEdit,
  } = useContext(ContextDrawer);

  const { onClose } = disclosure;

  const { errors, isSubmitting } = formState;

  const submitCreditorDebtor: SubmitHandler<CreditorDebtorType> = async ({
    id,
    ...data
  }) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log({ ...data });
        resolve({ ...data });
      }, 3000);
    }).then(() => {
      reset();
      handleResetCreditorDebtorID();
    });
  };

  const cancelSubmitCreditorDebtor = () => {
    onClose();
    reset();

    if (isEditing) {
      handleResetCreditorDebtorID();
    }
  };

  useEffect(() => {
    if (creditorDebtorID !== null) {
      getUniqueCreditorDebtor(creditorDebtorID)
        .then((response) => {
          Object.entries(response).forEach(([name, value]) =>
            setValue(name as keyof CreditorDebtorType, value)
          );
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
            label="Nome do Credor/Devedor"
            isRequired
            {...register("title")}
            errorInput={errors.title}
          />
        </VStack>

        <HStack alignItems="flex-start">
          <VStack alignItems="flex-start" flex="1">
            <FormControl isInvalid={!!errors.status} isRequired>
              <FormLabel
                htmlFor="status"
                fontSize="lg"
                padding="0"
                marginY="2"
                fontWeight="medium"
              >
                Status do Credor/Devedor
              </FormLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <HStack spacing="3">
                      <Radio value="0" colorScheme="red">
                        Inativo
                      </Radio>
                      <Radio value="1" colorScheme="green">
                        Ativo
                      </Radio>
                    </HStack>
                  </RadioGroup>
                )}
              />
              {errors.status && (
                <FormErrorMessage>{errors?.status.message}</FormErrorMessage>
              )}
            </FormControl>
          </VStack>
        </HStack>

        <VStack alignItems="flex-start" spacing="3">
          <InputTextAreaComponent
            id="anotherInformation"
            label="Outras informações"
            placeholder="Outras informações relevantes sobre o Credor/Devedor..."
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
            onClick={cancelSubmitCreditorDebtor}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            colorScheme="green"
            isLoading={isSubmitting}
            leftIcon={<FiSave fontSize="18" />}
            onClick={handleSubmit(submitCreditorDebtor)}
          >
            Salvar
          </Button>
        </HStack>
      </DrawerFooter>
    </Fragment>
  );
};
