// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { DefaultSession } from "next-auth";
import { getSession } from "next-auth/react";

// Imports FaunaDB
import fauna from "../../../services/fauna";
import { query } from "faunadb";

// Typings[TypeScript]
import { TransactionDataType } from "../../../@types/TransactionDataType";

type DataResponseAPI = Array<TransactionDataType> | {} | void;
type DataRequestBodyAPI = { transactionData: TransactionDataType };
type DataCollectionFaunaDB = {
  data: TransactionDataType;
  ref: {
    id: string;
  };
};

type UserData = {
  ref: {
    id: string;
  };
};

const getAllTransactions = async (req: NextApiRequest, res: NextApiResponse<DataResponseAPI>) => {
  if (req.headers.authorization !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
    res.status(401).end("You are not authorized to call this API!");
  }
  const { transactionData } = req.body as DataRequestBodyAPI;

  const session = await getSession({ req });

  const userData = await fauna.query<UserData>(
    query.Get(query.Match(query.Index("user_by_email"), query.Casefold(String(session?.user?.email))))
  );

  const { ref } = userData;

  switch (req.method) {
    case "GET":
      const getAllTransactionsByUser = await fauna
        .query<Array<DataCollectionFaunaDB>>(
          query.Map(
            query.Select(
              ["data"],
              query.Paginate(query.Match(query.Index("transaction_by_userId"), query.Casefold(ref.id)))
            ),
            query.Lambda((x) => query.Get(x))
          )
        )
        .then((response) => {
          const transactions = response.map((transaction) => transaction.data);
          return transactions;
        })
        .catch((err) => console.log("Error:", err.message));

      return res.status(200).json(getAllTransactionsByUser);

    case "POST":
      const postUniqueTransactionsByUser = await fauna
        .query(
          query.Create("transactions", {
            data: {
              userId: ref.id,
              ...transactionData,
            },
          })
        )
        .then((response) => {
          return response;
        })
        .catch((err) => {
          console.error(err.message);
        });

      return res.status(200).json({ ...postUniqueTransactionsByUser });

    default:
      res.status(405).end("Method not allowed!");
  }
};

export default getAllTransactions;
