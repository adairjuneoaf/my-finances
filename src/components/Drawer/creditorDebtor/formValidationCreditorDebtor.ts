import * as yup from 'yup'

const validationCreditorDebtorForm = yup.object().shape({
  id: yup.string().uuid(),
  status: yup.string().required('Informe o status.'),
  title: yup
    .string()
    .required('Informe um título para o credor/devedor.')
    .min(3, 'O mínimo de caracteres é 3.'),
  anotherInformation: yup.string(),
})

export default validationCreditorDebtorForm
