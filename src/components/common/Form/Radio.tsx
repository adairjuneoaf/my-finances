// React Imports
import React, { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'

// Chakra Imports
import {
  Radio as RadioChakra,
  RadioProps as RadioPropsChakra,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'

// Another Imports
import { FieldError } from 'react-hook-form'

// Typings[TypeScript]
interface IRadioComponentProps extends RadioPropsChakra {
  id: string
  children?: ReactNode
  isRequired?: boolean
  errorRadio?: FieldError
}

const Radio: ForwardRefRenderFunction<HTMLInputElement, IRadioComponentProps> = (
  { errorRadio = null, isRequired = false, children, ...props },
  ref,
) => {
  return (
    <FormControl isInvalid={!!errorRadio} isRequired={isRequired}>
      <RadioChakra ref={ref} {...props}>
        {children}
      </RadioChakra>
      {errorRadio && <FormErrorMessage>{errorRadio?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const RadioButton = forwardRef(Radio)
