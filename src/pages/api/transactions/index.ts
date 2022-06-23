// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Imports FaunaDB
import fauna from "../../../services/fauna";
import { query } from "faunadb";

// Typings[TypeScript]
import { TransactionDataType } from "../../../@types/TransactionDataType";

type DataResponseAPI = Array<TransactionDataType> | {} | void;

const getAllTransactions = async (req: NextApiRequest, res: NextApiResponse<DataResponseAPI>) => {
  if (req.headers.authorization !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
    res.status(401).end("You are not authorized to call this API!");
  }

  if (req.method === "GET") {
    const session = await getSession({ req });

    const getAllTransactionsByUser = await fauna
      .query<Array<TransactionDataType>>(
        query.Select(
          ["data", "transactions"],
          query.Get(query.Match(query.Index("user_by_email"), query.Casefold(String(session?.user?.email))))
        )
      )
      .then((response) => {
        return response;
      })
      .catch((err) => console.log("Error:", err.message));

    return res.status(200).json(getAllTransactionsByUser);
  } else {
    res.status(405).end("Method not allowed!");
  }
};

export default getAllTransactions;
