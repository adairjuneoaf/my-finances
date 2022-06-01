// React Imports
import React, { forwardRef, ForwardRefRenderFunction } from "react";

// Chakra Imports
import {
  FormLabel,
  InputGroup,
  FormControl,
  NumberInput,
  InputLeftAddon,
  FormErrorMessage,
  NumberInputField,
  NumberInputStepper,
  NumberInputFieldProps,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

// Another Imports
import { FieldError } from "react-hook-form";

// Typings[TypeScript]
interface IInputComponentProps extends NumberInputFieldProps {
  id: string;
  label?: string;
  isRequired?: boolean;
  errorInput?: FieldError;
}

const InputValue: ForwardRefRenderFunction<HTMLInputElement, IInputComponentProps> = (
  { id, label, errorInput = null, isRequired = false, ...props },
  ref
) => {
  return (
    <FormControl isInvalid={!!errorInput} isRequired={isRequired}>
      {!!label && (
        <FormLabel htmlFor={label} fontSize="lg" padding="0" marginY="2" fontWeight="medium">
          {label}
        </FormLabel>
      )}
      {/* CRIAR OPÇÕES DE PERSONALIZAÇÃO PARA O COMPONENTE DE INPUT VALUE(OPÇÕES COMO LEFT-ICON, BOTÃO DE INCREMENT/DECREMENT, ETC....) */}
      <InputGroup>
        <InputLeftAddon
          backgroundColor="gray.700"
          border="none"
          color="white"
          fontSize="16px"
          fontWeight="bold"
          children={"R$"}
        />
        <NumberInput min={0} precision={2} defaultValue={0} width="100%" variant="filled" focusBorderColor="green.500">
          <NumberInputField
            {...props}
            id={id}
            ref={ref}
            borderColor="gray.700"
            backgroundColor="transparent"
            borderRadius="0px 6px 6px 0px"
            _hover={{ backgroundColor: "transparent", borderColor: "gray.600" }}
          />
          <NumberInputStepper>
            <NumberIncrementStepper borderColor="gray.700" />
            <NumberDecrementStepper borderColor="gray.700" />
          </NumberInputStepper>
        </NumberInput>
      </InputGroup>
      {errorInput && <FormErrorMessage>{errorInput?.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputValueComponent = forwardRef(InputValue);
