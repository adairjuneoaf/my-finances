import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import fauna from "../../services/fauna";
import { query } from "faunadb";

import { TransactionDataType } from "../../@types/TransactionDataType";
import { PaymentMethodType } from "../../@types/PaymentMethodType";
import { CreditorDebtorType } from "../../@types/CreditorDebtorType";

type DataReturnFaunaAPI = {
  userId: string;
  name: string;
  email: string;
  transactions: Array<TransactionDataType>;
  paymentMethods: Array<PaymentMethodType>;
  creditorsDebtors: Array<CreditorDebtorType>;
};

const allTransactions = async (req: NextApiRequest, res: NextApiResponse<Array<TransactionDataType>>) => {
  if (req.headers.authorization !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
    res.status(401).end("You are not authorized to call this API!");
  }

  if (req.method === "GET") {
    const session = await getSession({ req });

    const getAllTransactionsByUser = await fauna.query<DataReturnFaunaAPI>(
      query.Select(
        "data",
        query.Get(query.Match(query.Index("user_by_email"), query.Casefold(String(session?.user?.email))))
      )
    );

    return res.status(200).json([...getAllTransactionsByUser.transactions]);
  } else {
    res.status(405).end("Method not allowed!");
  }
};

export default allTransactions;
