export type TransactionData = {
  [key: string]: {
    id: string;
    title: string;
    description: string;
    details?: string;
    value: number;
    type: string;
    payment_data?: string;
  };
};
