/* eslint-disable camelcase */
import * as zod from 'zod'

const dateSchemaProcess = zod.preprocess((dateValue) => {
  if (typeof dateValue == 'string' || dateValue instanceof Date) return new Date(dateValue)
}, zod.date())

export const formValidation = zod
  .object({
    type: zod.string().min(1, 'Informe o tipo.'),
    status: zod.string().min(1, 'Informe o status.'),
    title: zod
      .string({ required_error: 'Informe um título para o lançamento.' })
      .min(8, 'O mínimo de caracteres é 8.'),
    description: zod
      .string({ required_error: 'Informe uma descrição para o lançamento.' })
      .min(12, 'O mínimo de caracteres é 12.'),
    valueTransaction: zod
      .number({ required_error: 'Informe o valor do lançamento.' })
      .min(0.01, 'O valor mínimo é R$ 0.01'),
    dateEntriesTransaction: dateSchemaProcess.transform((date) => {
      const ddMmYyyy = new Date(date).toISOString().substring(0, 11)
      const currentTime = new Date().toISOString().substring(11)
      return ddMmYyyy + currentTime
    }),
    dateDueTransaction: dateSchemaProcess.transform((date) => {
      const ddMmYyyy = new Date(date).toISOString().substring(0, 11)
      const currentTime = new Date().toISOString().substring(11)
      return ddMmYyyy + currentTime
    }),
    creditorDebtor: zod.string({
      required_error: 'A empresa responsável do lançamento é obrigatória!',
    }),
    paymentMethod: zod.string({ required_error: 'É obrigatório informar uma forma de pagamento!' }),
    anotherInformation: zod.string(),
  })
  .superRefine((data, ctx) => {
    const dateDue = new Date(data.dateDueTransaction).getTime()
    const dateEntries = new Date(data.dateEntriesTransaction).getTime()

    if (dateDue < dateEntries) {
      ctx.addIssue({
        code: zod.ZodIssueCode.invalid_date,
        message: 'A data de vencimento não pode ser inferior ao lançamento.',
        path: ['dateDueTransaction'],
      })
    }
  })
