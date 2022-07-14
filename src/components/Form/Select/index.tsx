// Imports React
import React, { forwardRef, ForwardRefRenderFunction } from 'react'

// Chakra Imports
import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from '@chakra-ui/react'

// Components Imports
import SkeletonComponent from '../../Skeleton'

// Another Imports
import { FieldError } from 'react-hook-form'
import OptionSelectComponent from './optionSelect'

// Typings[TypeScript]
import { Option } from './types'

interface SelectOptionsProps extends SelectProps {
  label?: string
  isRequired?: boolean
  errorSelectOption?: FieldError
  options?: Array<Option>
  isLoadingValue?: boolean
}

const SelectOptionsComponent: ForwardRefRenderFunction<HTMLSelectElement, SelectOptionsProps> = (
  { label, options, errorSelectOption, isRequired = false, isLoadingValue = true, ...props },
  ref,
) => {
  return (
    <FormControl isInvalid={!!errorSelectOption} isRequired={isRequired}>
      {!!label && (
        <FormLabel htmlFor={label} fontSize='lg' padding='0' marginY='2' fontWeight='medium'>
          {label}
        </FormLabel>
      )}
      <SkeletonComponent isLoading={isLoadingValue}>
        <Select
          {...props}
          ref={ref}
          variant='filled'
          colorScheme='gray'
          borderColor='gray.700'
          backgroundColor='transparent'
          focusBorderColor='green.500'
          _hover={{ backgroundColor: 'transparent', borderColor: 'gray.600' }}
        >
          {options &&
            options?.map((data: Option) => {
              return <OptionSelectComponent key={data.id} {...data} />
            })}
          {!options && <option>Não existem opções...</option>}
        </Select>
      </SkeletonComponent>
      {errorSelectOption && <FormErrorMessage>{errorSelectOption?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const SelectComponent = forwardRef(SelectOptionsComponent)
