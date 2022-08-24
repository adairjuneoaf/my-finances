// React Imports
import React, { forwardRef, ForwardRefRenderFunction } from 'react'

// Chakra Imports
import {
  Textarea as TextareaChakra,
  TextareaProps as TextareaPropsChakra,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

// Components Imports
import { SkeletonComponent } from '../Skeleton'

// Another Imports
import { FieldError } from 'react-hook-form'

// Typings[TypeScript]
interface IInputComponentProps extends TextareaPropsChakra {
  id: string
  label?: string
  isRequired?: boolean
  errorInput?: FieldError
  isLoadingValue?: boolean
}

const InputTextArea: ForwardRefRenderFunction<HTMLTextAreaElement, IInputComponentProps> = (
  { id, label, errorInput = null, isRequired = false, isLoadingValue = false, ...props },
  ref,
) => {
  return (
    <FormControl isInvalid={!!errorInput} isRequired={isRequired}>
      {!!label && (
        <FormLabel htmlFor={label} fontSize='lg' padding='0' marginY='2' fontWeight='medium'>
          {label}
        </FormLabel>
      )}
      <SkeletonComponent isLoading={isLoadingValue}>
        <TextareaChakra
          {...props}
          id={id}
          ref={ref}
          minHeight='32'
          maxHeight='48'
          variant='filled'
          resize='vertical'
          borderColor='gray.700'
          backgroundColor='transparent'
          focusBorderColor='green.500'
          _hover={{ backgroundColor: 'transparent', borderColor: 'gray.600' }}
        />
      </SkeletonComponent>
      {errorInput && <FormErrorMessage>{errorInput?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const InputTextAreaComponent = forwardRef(InputTextArea)
