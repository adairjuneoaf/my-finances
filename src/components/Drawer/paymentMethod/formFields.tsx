// React Imports
import { Fragment, useContext, useEffect } from 'react'

// Chakra Imports
import {
  Radio,
  HStack,
  VStack,
  Button,
  FormLabel,
  DrawerBody,
  RadioGroup,
  FormControl,
  DrawerFooter,
  FormErrorMessage,
} from '@chakra-ui/react'

// Component Imports
import SkeletonComponent from '../../Skeleton'
import { InputComponent } from '../../Form/Input'
import { InputTextAreaComponent } from '../../Form/InputTextArea'

// Context Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { ContextDrawer } from '../../../contexts/contextDrawer'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// ReactHookForm Imports
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// API Services
import { getUniquePaymentMethod, postUniquePaymentMethod } from '../../../services/api'

// Validation Imports
import { formValidations } from './formValidations'

// Another Imports
import { v4 as uuid } from 'uuid'
import { FiSave, FiX } from 'react-icons/fi'

// Typings[TypeScript]
import { PaymentMethodType } from '../../../@types/PaymentMethodType'

export const GetFormFieldsPaymentMethod = () => {
  const { handleSubmit, register, formState, reset, control, setValue } =
    useForm<PaymentMethodType>({
      resolver: yupResolver(formValidations),
      mode: 'onBlur',
      defaultValues: {
        title: '',
        status: '',
        anotherInformation: '',
      },
    })

  const {
    isEditing,
    disclosure,
    paymentMethodID,
    isLoadingDataForEdit,
    handleResetPaymentMethodID,
    handleIsLoadingDataForEdit,
  } = useContext(ContextDrawer)

  const { onClose } = disclosure

  const { errors, isSubmitting } = formState

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(postUniquePaymentMethod, {
    onSuccess: () => {
      queryClient.refetchQueries(['payment_methods'])
    },
  })

  const submitPaymentMethod: SubmitHandler<Omit<PaymentMethodType, 'id' | 'createdAt'>> = async (
    data,
  ) => {
    await mutateAsync(
      {
        id: uuid(),
        createdAt: new Date().getTime(),
        ...data,
      },
      {
        onSuccess: () => {
          console.info('Sucesso na criação do novo Método de Pagamento. ✅')
          reset()
        },
        onError: () => {
          console.warn('Error na criação do novo Método de Pagamento! ❌')
        },
      },
    )
  }

  const cancelSubmitPaymentMethod = () => {
    onClose()
    reset()

    if (isEditing) {
      handleResetPaymentMethodID()
    }
  }

  useEffect(() => {
    if (paymentMethodID !== null) {
      getUniquePaymentMethod(paymentMethodID)
        .then((response) => {
          Object.entries(response).forEach(([name, value]) =>
            setValue(name as keyof PaymentMethodType, value),
          )
          console.log(response)
        })
        .catch((error) => {
          console.log('Error', error)
        })
        .finally(() => {
          handleIsLoadingDataForEdit()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  return (
    <Fragment>
      <DrawerBody
        as='form'
        width='100%'
        height='auto'
        gap='3'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        css={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#353646',
          },
        }}
      >
        <VStack spacing='3'>
          <InputComponent
            id='title'
            type='text'
            label='Título do método de pagamento'
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            {...register('title')}
            errorInput={errors.title}
          />
        </VStack>

        <HStack alignItems='flex-start'>
          <VStack alignItems='flex-start' flex='1'>
            <FormControl isInvalid={!!errors.status} isRequired>
              <FormLabel htmlFor='status' fontSize='lg' padding='0' marginY='2' fontWeight='medium'>
                Status do método de pagamento
              </FormLabel>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <SkeletonComponent isLoading={isLoadingDataForEdit}>
                    <RadioGroup {...field}>
                      <HStack spacing='3'>
                        <Radio value='0' colorScheme='red'>
                          Inativo
                        </Radio>
                        <Radio value='1' colorScheme='green'>
                          Ativo
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

        <VStack alignItems='flex-start' spacing='3'>
          <InputTextAreaComponent
            id='anotherInformation'
            label='Outras informações'
            isLoadingValue={isLoadingDataForEdit}
            placeholder='Outras informações relevantes sobre o método de pagamento...'
            {...register('anotherInformation')}
            errorInput={errors.anotherInformation}
          />
        </VStack>
      </DrawerBody>
      <DrawerFooter borderTop='2px' borderColor='gray.700'>
        <HStack>
          <Button
            type='button'
            leftIcon={<FiX fontSize='18' />}
            colorScheme='red'
            onClick={cancelSubmitPaymentMethod}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            colorScheme='green'
            isLoading={isSubmitting}
            leftIcon={<FiSave fontSize='18' />}
            onClick={handleSubmit(submitPaymentMethod)}
          >
            Salvar
          </Button>
        </HStack>
      </DrawerFooter>
    </Fragment>
  )
}
