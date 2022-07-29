// React Imports
import { Fragment, useContext, useEffect } from 'react'

// Chakra Imports
import {
  Radio,
  HStack,
  VStack,
  Button,
  useToast,
  FormLabel,
  DrawerBody,
  RadioGroup,
  FormControl,
  DrawerFooter,
  FormErrorMessage,
} from '@chakra-ui/react'

// Component Imports
import { SkeletonComponent } from '../../Skeleton'
import { InputComponent } from '../../Form/Input'
import { SelectComponent } from '../../Form/Select'
import { InputValueComponent } from '../../Form/InputValue'
import { InputTextAreaComponent } from '../../Form/InputTextArea'

// Context Imports
import { ContextDrawer } from '../../../contexts/contextDrawer'

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
} from '../../../services/api'

// Validation Imports
import { formValidation } from './formValidations'

// Another Imports
import { v4 as uuid } from 'uuid'
import { FiEdit, FiSave, FiX } from 'react-icons/fi'

// Typings[TypeScript]
import { TransactionDataType } from '../../../@types/TransactionDataType'

export const GetFormFieldsTransaction = () => {
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
    disclosure,
    drawerType,
    transactionID,
    isLoadingDataForEdit,
    handleResetTransactionID,
    handleIsLoadingDataForEdit,
  } = useContext(ContextDrawer)

  const toast = useToast({
    position: 'top',
    duration: 1000 * 3, // 3 Seconds
    title: 'Lançamentos',
  });

  const { onClose } = disclosure

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
          onClose()
          reset()
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
      handleResetTransactionID()
    }
  }

  useEffect(() => {
    if (transactionID !== null && drawerType === 'edit-transaction') {
      getUniqueTransaction(transactionID)
        .then((response) => {
          Object.entries(response).forEach(([name, value]) =>
            setValue(name as keyof TransactionDataType, value),
          )
        })
        .catch((error) => {
          onClose()
          console.error('Error', error)
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
            label='Título do lançamento'
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            {...register('title')}
            errorInput={errors.title}
          />
          <InputComponent
            id='description'
            type='text'
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            label='Descrição do lançamento'
            {...register('description')}
            errorInput={errors.description}
          />
        </VStack>
        <HStack alignItems='flex-start' spacing='3'>
          <InputComponent
            id='dateEntriesTransaction'
            label='Data de lançamento'
            type='date'
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            {...register('dateEntriesTransaction')}
            errorInput={errors.dateEntriesTransaction}
          />
          <InputComponent
            id='dateDueTransaction'
            label='Data de vencimento'
            type='date'
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            {...register('dateDueTransaction')}
            errorInput={errors.dateDueTransaction}
          />
        </HStack>

        <HStack alignItems='flex-start'>
          <VStack alignItems='flex-start' spacing='3' flex='1'>
            <FormControl isInvalid={!!errors.type} isRequired>
              <FormLabel htmlFor='status' fontSize='lg' padding='0' marginY='2' fontWeight='medium'>
                Tipo de lançamento
              </FormLabel>
              <Controller
                name='type'
                control={control}
                render={({ field }) => (
                  <SkeletonComponent isLoading={isLoadingDataForEdit}>
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
                  </SkeletonComponent>
                )}
              />
              {errors.type && <FormErrorMessage>{errors?.type.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
          <VStack alignItems='flex-start' spacing='3' flex='1'>
            <FormControl isInvalid={!!errors.status} isRequired>
              <FormLabel htmlFor='status' fontSize='lg' padding='0' marginY='2' fontWeight='medium'>
                Status do lançamento
              </FormLabel>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <SkeletonComponent isLoading={isLoadingDataForEdit}>
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
                  </SkeletonComponent>
                )}
              />
              {errors.status && <FormErrorMessage>{errors?.status.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
        </HStack>

        <VStack alignItems='flex-start' spacing='3'>
          <SelectComponent
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            typeList='creditorsDebtors'
            label='Credor/Devedor'
            errorSelectOption={errors.creditorDebtor}
            {...register('creditorDebtor')}
          />
        </VStack>

        <VStack alignItems='flex-start' spacing='1'>
          <SelectComponent
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            typeList='paymentMethods'
            label='Método de pagamento'
            errorSelectOption={errors.paymentMethod}
            {...register('paymentMethod')}
          />
          <InputComponent
            id='dataForPayment'
            label='Dados para pagamento'
            placeholder='Nº do boleto, código pix, dados do cartão de crédito...'
            _placeholder={{ fontSize: '14px' }}
            type='text'
            isLoadingValue={isLoadingDataForEdit}
            errorInput={errors.dataForPayment}
            {...register('dataForPayment')}
          />
        </VStack>

        <VStack alignItems='flex-start' spacing='3'>
          <InputValueComponent
            id='valueTransaction'
            isRequired
            label='Valor do lançamento'
            isLoadingValue={isLoadingDataForEdit}
            errorInput={errors.valueTransaction}
            {...register('valueTransaction')}
          />
          <InputTextAreaComponent
            id='anotherInformation'
            label='Outras informações'
            placeholder='Outras informações relevantes sobre o lançamento...'
            isLoadingValue={isLoadingDataForEdit}
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
            disabled={isSubmitting || isLoadingDataForEdit}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            colorScheme='green'
            isLoading={isSubmitting}
            leftIcon={
              drawerType === 'new-transaction' ? <FiSave fontSize='18' /> : <FiEdit fontSize='18' />
            }
            onClick={
              drawerType === 'new-transaction'
                ? handleSubmit(submitNewTransaction)
                : handleSubmit(submitEditTransaction)
            }
            disabled={isSubmitting || isLoadingDataForEdit}
          >
            Salvar
          </Button>
        </HStack>
      </DrawerFooter>
    </Fragment>
  )
}
