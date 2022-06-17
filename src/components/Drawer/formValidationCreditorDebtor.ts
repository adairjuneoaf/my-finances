import * as yup from "yup";

const validationCreditorDebtorForm = yup.object().shape({
  id: yup.string().uuid(),
  status: yup.string().required("O status é obrigatório!"),
  title: yup.string().required("O título é obrigatório!").min(3, "O mínimo de caracteres é 3."),
  anotherInformation: yup.string(),
});

export default validationCreditorDebtorForm;
