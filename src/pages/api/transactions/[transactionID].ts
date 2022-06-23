// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Imports FaunaDB
import fauna from "../../../services/fauna";
import { query } from "faunadb";

// Typings[TypeScript]
import { TransactionDataType } from "../../../@types/TransactionDataType";
import { DefaultSession } from "next-auth";

type DataResponseAPI = TransactionDataType | {} | void;
type DataRequestBodyAPI = { transactionData: TransactionDataType };

type ReqQuery = {
  transactionID: string;
};

interface SessionUser extends DefaultSession {
  userRef: {
    ref: {
      id: string;
    };
  };
}

const uniqueTransaction = async (req: NextApiRequest, res: NextApiResponse<DataResponseAPI>) => {
  if (req.headers.authorization !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
    res.status(401).end("You are not authorized to call this API!");
  }

  const session = await getSession({ req });
  const { transactionID } = req.query as ReqQuery;
  const { transactionData } = req.body as DataRequestBodyAPI;

  const { userRef } = session as SessionUser;

  switch (req.method) {
    case "GET":
      const getUniqueTransactionByID = await fauna
        .query<Array<TransactionDataType>>(
          query.Select(
            ["data", "transactions"],
            query.Get(query.Match(query.Index("user_by_email"), query.Casefold(String(session?.user?.email)))),
            "This transaction not exist!"
          )
        )
        .then((response) => {
          return response.find((value) => value.id === transactionID);
        })
        .catch((err) => {
          console.error(err.message);
        });

      return res.status(200).json(getUniqueTransactionByID);

    case "PUT":
      return res.status(200).json({ method: "Allowed PUT" });

    case "PATCH":
      return res.status(200).json({ method: "Allowed PATCH" });

    default:
      res.status(405).end("Method not allowed!");
  }
};

export default uniqueTransaction;
