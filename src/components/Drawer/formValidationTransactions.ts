import * as yup from "yup";

const validationTransactionForm = yup.object().shape({
  id: yup.string().uuid(),
  type: yup.string().required("O tipo é obrigatório!"),
  status: yup.string().required("O status é obrigatório!"),
  title: yup.string().required("O título é obrigatório!").min(8, "O mínimo de caracteres é 8."),
  description: yup.string().required("A descrição é obrigatória!").min(12, "O mínimo de caracteres é 12."),
  valueTransaction: yup.number().required("O valor da transação é obrigatório!").min(0.01, "O valor mínimo é R$ 0.01"),
  dateEntriesTransaction: yup
    .number()
    .transform((_, date) => {
      return date ? new Date(date).getTime() : 0;
    })
    .min(1, "Informe a data de lançamento")
    .max(yup.ref("dateDueTransaction"), "A data de lançamento não pode ser superior ao vencimento.")
    .required("A data de lançamento é obrigatória!"),
  dateDueTransaction: yup
    .number()
    .transform((_, date) => {
      return date ? new Date(date).getTime() : 0;
    })
    .min(1, "Informe a data de vencimento")
    .min(yup.ref("dateEntriesTransaction"), "A data de vencimento não pode ser inferior ao lançamento.")
    .required("A data de vencimento é obrigatória!"),
  creditorDebtor: yup.string().required("A empresa responsável do lançamento é obrigatória!"),
  anotherInformation: yup.string(),
});

export default validationTransactionForm;
