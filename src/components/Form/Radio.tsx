// React Imports
import React, { CSSProperties, forwardRef, ForwardRefRenderFunction, ReactNode } from "react";

// Chakra Imports
import {
  Radio as RadioChakra,
  RadioProps as RadioPropsChakra,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

// Another Imports
import { FieldError } from "react-hook-form";
import { HStack } from "@chakra-ui/react";

// Styles In JS
// const stylesRadio: CSSProperties = {
//   cursor: "pointer",

//   width: "16px",
//   height: "16px",
// };

// Typings[TypeScript]
interface IRadioComponentProps extends RadioPropsChakra {
  id: string;
  // label?: string;
  children?: ReactNode;
  isRequired?: boolean;
  errorRadio?: FieldError;
}

const Radio: ForwardRefRenderFunction<HTMLInputElement, IRadioComponentProps> = (
  { id, errorRadio = null, isRequired = false, children, ...props },
  ref
) => {
  return (
    <FormControl isInvalid={!!errorRadio} isRequired={isRequired}>
      {/* <HStack spacing="2">
        <input {...props} id={id} ref={ref} type="radio" value={value} style={stylesRadio} />
        {!!label && (
          <FormLabel
            htmlFor={label}
            fontSize="16px"
            color="gray.100"
            padding="0"
            marginY="2"
            fontWeight="medium"
            whiteSpace="nowrap"
          >
            {label}
          </FormLabel>
        )}
      </HStack> */}
      <RadioChakra ref={ref} {...props}>
        {children}
      </RadioChakra>
      {errorRadio && <FormErrorMessage>{errorRadio?.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const RadioComponent = forwardRef(Radio);
