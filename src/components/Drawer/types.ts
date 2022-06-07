export type NewTransactionData = {
  id: string;
  type: number;
  title: string;
  status: number;
  description: string;
  paymentMethod: string;
  dataForPayment: string;
  creditorDebtor: string;
  valueTransaction: number;
  dateDueTransaction: number;
  anotherInformation: string;
  dateEntriesTransaction: number;
};
