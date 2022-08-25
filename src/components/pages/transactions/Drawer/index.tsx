// Imports React
import React, { useContext, useEffect } from 'react'

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
import { Input, InputSelect, InputTextArea, InputValue, Skeleton } from '../../../common'

// Context Imports
import { TransactionsPageContext } from '../../../../contexts/pages/transactions'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// ReactHookForm Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// API Services
import {
  getUniqueTransaction,
  postUniqueTransaction,
  putUniqueTransaction,
} from '../../../../services/api'

// Validation Imports
import { formValidation } from './formValidations'

// Another Imports
import { FiEdit, FiSave, FiX } from 'react-icons/fi'
import { v4 as uuid } from 'uuid'

// Typings[TypeScript]
import { TransactionDataType } from '../../../../@types/TransactionDataType'

const DrawerTransactions: React.FC = () => {
  const { reset, control, setValue, register, formState, handleSubmit } =
    useForm<TransactionDataType>({
      resolver: yupResolver(formValidation),
      mode: 'onBlur',
      defaultValues: {
        type: '',
        title: '',
        status: '',
        description: '',
        anotherInformation: '',
      },
    })

  const {
    isEditing,
    isLoading,
    disclosure,
    toggleIsEditing,
    toggleIsLoading,
    transactionIdForEdit,
    resetTransactionIdForEdit,
  } = useContext(TransactionsPageContext)

  const toast = useToast({
    position: 'top',
    duration: 1000 * 3, // 3 Seconds
    title: 'Lançamentos',
  })

  const { onClose, isOpen } = disclosure

  const { errors, isSubmitting } = formState

  const queryClient = useQueryClient()

  const { mutateAsync: mutateAsyncNewTransaction } = useMutation(postUniqueTransaction, {
    onSuccess: () => {
      queryClient.refetchQueries(['transactions'])
    },
  })

  const { mutateAsync: mutateAsyncEditTransaction } = useMutation(putUniqueTransaction, {
    onSuccess: () => {
      queryClient.refetchQueries(['transactions'])
    },
  })

  const submitNewTransaction: SubmitHandler<Omit<TransactionDataType, 'id' | 'createdAt'>> = async (
    data,
  ) => {
    await mutateAsyncNewTransaction(
      { id: uuid(), createdAt: new Date().getTime(), ...data },
      {
        onSuccess: () => {
          toast({ description: 'Lançamento criado com sucesso!', status: 'success' })
          reset()
        },
        onError: () => {
          toast({ description: 'Erro na criação do lançamento.', status: 'error' })
        },
      },
    )
  }

  const submitEditTransaction: SubmitHandler<TransactionDataType> = async (data) => {
    await mutateAsyncEditTransaction(
      { id: data.id, data },
      {
        onSuccess: () => {
          toast({ description: 'Lançamento editado com sucesso!', status: 'success' })
          reset()
          onClose()
          toggleIsEditing()
          resetTransactionIdForEdit()
        },
        onError: () => {
          toast({ description: 'Erro na edição do lançamento.', status: 'error' })
        },
      },
    )
  }

  const cancelSubmitTransaction = () => {
    onClose()
    reset()

    if (isEditing) {
      toggleIsEditing()
      resetTransactionIdForEdit()
    }
  }

  useEffect(() => {
    if (transactionIdForEdit !== null && isEditing) {
      getUniqueTransaction(transactionIdForEdit)
        .then((response) => {
          Object.entries(response).forEach(([name, value]) =>
            setValue(name as keyof TransactionDataType, value),
          )
        })
        .catch((error) => {
          onClose()
          toggleIsLoading()
          toggleIsEditing()
          resetTransactionIdForEdit()
          console.error('Error', error)
        })
        .finally(() => {
          toggleIsLoading()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  return (
    <Drawer
      isOpen={isOpen}
      onClose={cancelSubmitTransaction}
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
              Novo lançamento
            </Text>
          ) : (
            <Text as='h2' fontSize='24px'>
              Editar lançamento
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
              label='Título do lançamento'
              isRequired
              isLoadingValue={isLoading}
              {...register('title')}
              errorInput={errors.title}
            />
            <Input
              id='description'
              type='text'
              isRequired
              isLoadingValue={isLoading}
              label='Descrição do lançamento'
              {...register('description')}
              errorInput={errors.description}
            />
          </VStack>
          <HStack alignItems='flex-start' spacing='3'>
            <Input
              id='dateEntriesTransaction'
              label='Data de lançamento'
              type='date'
              isRequired
              isLoadingValue={isLoading}
              {...register('dateEntriesTransaction')}
              errorInput={errors.dateEntriesTransaction}
            />
            <Input
              id='dateDueTransaction'
              label='Data de vencimento'
              type='date'
              isRequired
              isLoadingValue={isLoading}
              {...register('dateDueTransaction')}
              errorInput={errors.dateDueTransaction}
            />
          </HStack>

          <HStack alignItems='flex-start'>
            <VStack alignItems='flex-start' spacing='3' flex='1'>
              <FormControl isInvalid={!!errors.type} isRequired>
                <FormLabel
                  htmlFor='status'
                  fontSize='lg'
                  padding='0'
                  marginY='2'
                  fontWeight='medium'
                >
                  Tipo de lançamento
                </FormLabel>
                <Controller
                  name='type'
                  control={control}
                  render={({ field }) => (
                    <Skeleton isLoading={isLoading}>
                      <RadioGroup {...field}>
                        <HStack spacing='3'>
                          <Radio value='0' colorScheme='red'>
                            Saída
                          </Radio>
                          <Radio value='1' colorScheme='green'>
                            Entrada
                          </Radio>
                        </HStack>
                      </RadioGroup>
                    </Skeleton>
                  )}
                />
                {errors.type && <FormErrorMessage>{errors?.type.message}</FormErrorMessage>}
              </FormControl>
            </VStack>
            <VStack alignItems='flex-start' spacing='3' flex='1'>
              <FormControl isInvalid={!!errors.status} isRequired>
                <FormLabel
                  htmlFor='status'
                  fontSize='lg'
                  padding='0'
                  marginY='2'
                  fontWeight='medium'
                >
                  Status do lançamento
                </FormLabel>
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) => (
                    <Skeleton isLoading={isLoading}>
                      <RadioGroup {...field}>
                        <HStack spacing='3'>
                          <Radio value='0' colorScheme='yellow'>
                            Em aberto
                          </Radio>
                          <Radio value='1' colorScheme='green'>
                            Concluído
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
            <InputSelect
              isRequired
              isLoadingValue={isLoading}
              typeList='creditorsDebtors'
              label='Credor/Devedor'
              errorSelectOption={errors.creditorDebtor}
              {...register('creditorDebtor')}
            />
          </VStack>

          <VStack alignItems='flex-start' spacing='1'>
            <InputSelect
              isRequired
              isLoadingValue={isLoading}
              typeList='paymentMethods'
              label='Método de pagamento'
              errorSelectOption={errors.paymentMethod}
              {...register('paymentMethod')}
            />
            <Input
              id='dataForPayment'
              label='Dados para pagamento'
              placeholder='Nº do boleto, código pix, dados do cartão de crédito...'
              _placeholder={{ fontSize: '14px' }}
              type='text'
              isLoadingValue={isLoading}
              errorInput={errors.dataForPayment}
              {...register('dataForPayment')}
            />
          </VStack>

          <VStack alignItems='flex-start' spacing='3'>
            <InputValue
              id='valueTransaction'
              isRequired
              label='Valor do lançamento'
              isLoadingValue={isLoading}
              errorInput={errors.valueTransaction}
              {...register('valueTransaction', {
                valueAsNumber: true,
              })}
            />
            <InputTextArea
              id='anotherInformation'
              label='Outras informações'
              placeholder='Outras informações relevantes sobre o lançamento...'
              isLoadingValue={isLoading}
              errorInput={errors.anotherInformation}
              {...register('anotherInformation')}
            />
          </VStack>
        </DrawerBody>
        <DrawerFooter borderTop='2px' borderColor='gray.700'>
          <HStack>
            <Button
              type='button'
              leftIcon={<FiX fontSize='18' />}
              colorScheme='red'
              onClick={cancelSubmitTransaction}
              disabled={isSubmitting || isLoading}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              colorScheme='green'
              isLoading={isSubmitting}
              leftIcon={!isEditing ? <FiSave fontSize='18' /> : <FiEdit fontSize='18' />}
              onClick={
                !isEditing
                  ? handleSubmit(submitNewTransaction)
                  : handleSubmit(submitEditTransaction)
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

export default DrawerTransactions
