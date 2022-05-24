// React Imports
import React, { Fragment } from "react";

// Chakra Imports
import { Input as InputChakra, InputProps, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

// Another Imports

// Typings[TypeScript]
interface IInputComponent extends InputProps {
  name: string;
  label?: string;
  errorInput?: string;
}

const InputComponent: React.FC<IInputComponent> = ({ name, label, errorInput = null, ...props }) => {
  return (
    <FormControl isInvalid={!!errorInput}>
      {label && (
        <FormLabel htmlFor={label} fontSize="lg" padding="0" marginY="2" fontWeight="medium">
          {label}
        </FormLabel>
      )}
      <InputChakra
        {...props}
        id={name}
        name={name}
        variant="filled"
        borderColor="gray.700"
        backgroundColor="transparent"
        focusBorderColor="green.500"
        _hover={{ backgroundColor: "transparent" }}
      />
      {errorInput && <FormErrorMessage>{errorInput}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputComponent;
