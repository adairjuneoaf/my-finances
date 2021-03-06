import * as yup from 'yup'

export const formValidations = yup.object().shape({
  id: yup.string().uuid(),
  status: yup.string().required('Informe o status.'),
  title: yup
    .string()
    .required('Informe um título para forma de pagamento.')
    .min(3, 'O mínimo de caracteres é 3.'),
  anotherInformation: yup.string(),
})
