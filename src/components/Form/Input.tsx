// React Imports
import React, { forwardRef, ForwardRefRenderFunction } from "react";

// Chakra Imports
import {
  Input as InputChakra,
  InputProps as InputPropsChakra,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

// Another Imports
import { FieldError } from "react-hook-form";

// Typings[TypeScript]
interface IInputComponentProps extends InputPropsChakra {
  id: string;
  label?: string;
  errorInput?: FieldError;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, IInputComponentProps> = (
  { id, label, errorInput = null, ...props },
  ref
) => {
  return (
    <FormControl isInvalid={!!errorInput}>
      {!!label && (
        <FormLabel htmlFor={label} fontSize="lg" padding="0" marginY="2" fontWeight="medium">
          {label}
        </FormLabel>
      )}
      <InputChakra
        {...props}
        id={id}
        ref={ref}
        variant="filled"
        borderColor="gray.700"
        backgroundColor="transparent"
        focusBorderColor="green.500"
        _hover={{ backgroundColor: "transparent", borderColor: "gray.600" }}
      />
      {errorInput && <FormErrorMessage>{errorInput?.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputComponent = forwardRef(Input);
