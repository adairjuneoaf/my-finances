// Imports React
import React, { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'

// Chakra Imports
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'

// Components Imports
import { Input, InputTextArea, Skeleton } from '../../../../common'

// Context Imports
import { PaymentMethodsPageContext } from '../../../../../contexts/pages/records'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// ReactHookForm Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// API Services
import {
  getUniquePaymentMethod,
  postUniquePaymentMethod,
  putUniquePaymentMethod,
} from '../../../../../services/api'

// Validation Imports
import { formValidations } from './formValidations'

// Another Imports
import { FiEdit, FiSave, FiX } from 'react-icons/fi'
import { v4 as uuid } from 'uuid'

// Typings[TypeScript]
import { PaymentMethodType } from '../../../../../@types/PaymentMethodType'

const DrawerPaymentMethods: React.FC = () => {
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

  const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethodType>()

  const isEditing = useContextSelector(PaymentMethodsPageContext, (values) => values.isEditing)
  const isLoading = useContextSelector(PaymentMethodsPageContext, (values) => values.isLoading)
  const { onClose, isOpen } = useContextSelector(
    PaymentMethodsPageContext,
    (values) => values.drawerDisclosure,
  )
  const toggleIsEditing = useContextSelector(
    PaymentMethodsPageContext,
    (values) => values.toggleIsEditing,
  )
  const toggleIsLoading = useContextSelector(
    PaymentMethodsPageContext,
    (values) => values.toggleIsLoading,
  )
  const paymentMethodIdForEdit = useContextSelector(
    PaymentMethodsPageContext,
    (values) => values.paymentMethodIdForEdit,
  )
  const resetPaymentMethodIdForEdit = useContextSelector(
    PaymentMethodsPageContext,
    (values) => values.resetPaymentMethodIdForEdit,
  )

  const toast = useToast({
    position: 'top',
    duration: 1000 * 3, // 3 Seconds
    title: 'Métodos de Pagamento',
  })

  const { errors, isSubmitting } = formState

  const queryClient = useQueryClient()

  const { mutateAsync: mutateAsyncNewPaymentMethod } = useMutation(postUniquePaymentMethod, {
    onSuccess: () => {
      queryClient.refetchQueries(['payment_methods'])
    },
  })

  const { mutateAsync: mutateAsyncEditPaymentMethod } = useMutation(putUniquePaymentMethod, {
    onSuccess: () => {
      queryClient.refetchQueries(['payment_methods'])
    },
  })

  const submitNewPaymentMethod: SubmitHandler<Omit<PaymentMethodType, 'id' | 'createdAt'>> = async (
    data,
  ) => {
    await mutateAsyncNewPaymentMethod(
      {
        id: uuid(),
        createdAt: new Date().toJSON(),
        ...data,
      },
      {
        onSuccess: () => {
          toast({ description: 'Método de Pagamento criado com sucesso!', status: 'success' })
          reset()
        },
        onError: () => {
          toast({ description: 'Erro na criação do Método de Pagamento.', status: 'error' })
        },
      },
    )
  }

  const submitEditPaymentMethod: SubmitHandler<PaymentMethodType> = async (data) => {
    if (!paymentMethodIdForEdit || !paymentMethodData) {
      return null
    }

    await mutateAsyncEditPaymentMethod(
      {
        id: paymentMethodIdForEdit,
        data: {
          ...data,
          createdAt: paymentMethodData.createdAt,
        },
      },
      {
        onSuccess: () => {
          toast({ description: 'Método de Pagamento editado com sucesso!', status: 'success' })
          onClose()
          reset()
          toggleIsEditing()
          resetPaymentMethodIdForEdit()
        },
        onError: () => {
          toast({ description: 'Erro na edição do Método de Pagamento.', status: 'error' })
        },
      },
    )
  }

  const cancelSubmitPaymentMethod = () => {
    onClose()
    reset()

    if (isEditing) {
      toggleIsEditing()
      resetPaymentMethodIdForEdit()
    }
  }

  useEffect(() => {
    if (paymentMethodIdForEdit !== null && isEditing) {
      getUniquePaymentMethod(paymentMethodIdForEdit)
        .then((response) => {
          Object.entries(response).forEach(([name, value]) =>
            setValue(name as keyof PaymentMethodType, value),
          )
          setPaymentMethodData(response)
        })
        .catch((error) => {
          onClose()
          toggleIsLoading()
          toggleIsEditing()
          resetPaymentMethodIdForEdit()
          console.log('Error', error)
        })
        .finally(() => {
          toggleIsLoading()
        })
    }

    return () => setPaymentMethodData(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  return (
    <Drawer
      isOpen={isOpen}
      onClose={cancelSubmitPaymentMethod}
      placement='right'
      size='md'
      colorScheme='gray'
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay />
      <DrawerContent backgroundColor='gray.800'>
        <DrawerCloseButton />
        <DrawerHeader borderBottom='2px' borderColor='gray.700'>
          {!isEditing ? (
            <Text as='h2' fontSize='24px'>
              Novo método de pagamento
            </Text>
          ) : (
            <Text as='h2' fontSize='24px'>
              Editar método de pagamento
            </Text>
          )}
        </DrawerHeader>

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
            <Input
              id='title'
              type='text'
              label='Título do método de pagamento'
              isRequired
              isLoadingValue={isLoading}
              {...register('title')}
              errorInput={errors.title}
            />
          </VStack>

          <HStack alignItems='flex-start'>
            <VStack alignItems='flex-start' flex='1'>
              <FormControl isInvalid={!!errors.status} isRequired>
                <FormLabel
                  htmlFor='status'
                  fontSize='lg'
                  padding='0'
                  marginY='2'
                  fontWeight='medium'
                >
                  Status do método de pagamento
                </FormLabel>
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) => (
                    <Skeleton isLoading={isLoading}>
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
                    </Skeleton>
                  )}
                />
                {errors.status && <FormErrorMessage>{errors?.status.message}</FormErrorMessage>}
              </FormControl>
            </VStack>
          </HStack>

          <VStack alignItems='flex-start' spacing='3'>
            <InputTextArea
              id='anotherInformation'
              label='Outras informações'
              isLoadingValue={isLoading}
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
              disabled={isSubmitting || isLoading}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              colorScheme='green'
              isLoading={isSubmitting}
              leftIcon={!isLoading ? <FiSave fontSize='18' /> : <FiEdit fontSize='18' />}
              onClick={
                !isLoading
                  ? handleSubmit(submitNewPaymentMethod)
                  : handleSubmit(submitEditPaymentMethod)
              }
              disabled={isSubmitting || isLoading}
            >
              Salvar
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerPaymentMethods
