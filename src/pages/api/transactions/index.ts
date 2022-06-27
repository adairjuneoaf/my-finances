// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// Imports FaunaDB
import fauna from "../../../services/fauna";
import { query } from "faunadb";

// Typings[TypeScript]
import { SessionDataType } from "../../../@types/SessionDataType";
import { TransactionDataType } from "../../../@types/TransactionDataType";
import { DataCollectionFaunaDB } from "../../../@types/DataCollectionFaunaDB";

type DataResponseAPI = Array<TransactionDataType> | {} | void;
type DataRequestBodyAPI = { transactionData: TransactionDataType };

const getAllTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse<DataResponseAPI>
) => {
  const sessionData = (await getServerSession(
    { req: req, res: res },
    authOptions
  )) as SessionDataType | null;

  if (
    (sessionData !== undefined || null) &&
    req.headers.authorization === process.env.NEXT_PUBLIC_API_ROUTE_SECRET
  ) {
    const { transactionData } = req.body as DataRequestBodyAPI;

    switch (req.method) {
      case "GET":
        const getAllTransactionsByUser = await fauna
          .query<Array<DataCollectionFaunaDB<TransactionDataType>>>(
            query.Map(
              query.Select(
                ["data"],
                query.Paginate(
                  query.Match(
                    query.Index("transaction_by_userId"),
                    query.Casefold(String(sessionData?.userRef.id))
                  )
                )
              ),
              query.Lambda((x) => query.Get(x))
            )
          )
          .then((response) => {
            const transactions = response.map(
              (transaction) => transaction.data
            );
            return transactions;
          })
          .catch((err) => console.error("Error:", err.message));

        return res.status(200).json(getAllTransactionsByUser);

      case "POST":
        const postUniqueTransactionsByUser = await fauna
          .query(
            query.Create("transactions", {
              data: {
                userId: sessionData?.userRef.id,
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
  } else {
    return res.status(401).end("You are not authorized to call this API!");
  }
};

export default getAllTransactions;
