export type TransactionDataType = {
  id: string;
  type: string;
  title: string;
  status: string;
  description: string;
  paymentMethod: string;
  dataForPayment: string;
  creditorDebtor: string;
  valueTransaction: number;
  dateDueTransaction: Date;
  anotherInformation: string;
  dateEntriesTransaction: Date;
};