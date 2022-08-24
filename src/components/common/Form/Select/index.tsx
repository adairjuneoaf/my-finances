// Imports React
import React, { forwardRef, ForwardRefRenderFunction } from 'react'

// Chakra Imports
import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from '@chakra-ui/react'

// ReactQuery Imports
import { useReactQuery } from '../../../../hooks/useReactQuery'

// Components Imports
import { Skeleton } from '../../Skeleton'

// Another Imports
import { FieldError } from 'react-hook-form'
import OptionSelectComponent from './optionSelect'

// Typings[TypeScript]
import { Option } from './types'

interface SelectOptionsProps extends SelectProps {
  typeList: 'paymentMethods' | 'creditorsDebtors'
  label?: string
  isRequired?: boolean
  errorSelectOption?: FieldError
  isLoadingValue?: boolean
}

const SelectOptions: ForwardRefRenderFunction<HTMLSelectElement, SelectOptionsProps> = (
  { label, typeList, errorSelectOption, isRequired = false, isLoadingValue = true, ...props },
  ref,
) => {
  const { creditorsDebtors, paymentMethods } = useReactQuery()

  return (
    <FormControl isInvalid={!!errorSelectOption} isRequired={isRequired}>
      {!!label && (
        <FormLabel htmlFor={label} fontSize='lg' padding='0' marginY='2' fontWeight='medium'>
          {label}
        </FormLabel>
      )}
      <Skeleton isLoading={isLoadingValue}>
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
          {typeList === 'paymentMethods' &&
            paymentMethods.data &&
            paymentMethods.data?.map((data: Option) => {
              return <OptionSelectComponent key={data.id} {...data} />
            })}
          {typeList === 'paymentMethods' && paymentMethods.data?.length === 0 && (
            <option disabled>Não existem opções...</option>
          )}

          {typeList === 'creditorsDebtors' &&
            creditorsDebtors.data &&
            creditorsDebtors.data?.map((data: Option) => {
              return <OptionSelectComponent key={data.id} {...data} />
            })}
          {typeList === 'creditorsDebtors' && creditorsDebtors.data?.length === 0 && (
            <option disabled>Não existem opções...</option>
          )}
        </Select>
      </Skeleton>
      {errorSelectOption && <FormErrorMessage>{errorSelectOption?.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const InputSelect = forwardRef(SelectOptions)
