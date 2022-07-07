// Imports Next-Auth/Next.js
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";

// Imports FaunaDB
import { query } from "faunadb";
import fauna from "../../../services/fauna";

// Typings[TypeScript]
import { SessionDataType } from "../../../@types/SessionDataType";
import { DataResponseAPI } from "../../../@types/DataResponseAPI";
import { DataRequestBodyAPI } from "../../../@types/DataRequestBodyAPI";
import { TransactionDataType } from "../../../@types/TransactionDataType";
import { DataCollectionFaunaDB } from "../../../@types/DataCollectionFaunaDB";

const SIZE_PER_PAGE_DEFAULT = 99999;

const getAllTransactions = async (
  req: NextApiRequest,
  res: NextApiResponse<DataResponseAPI<TransactionDataType> | {}>
) => {
  const sessionData = (await getServerSession(
    { req: req, res: res },
    authOptions
  )) as SessionDataType | null;

  if (
    (sessionData !== undefined || null) &&
    req.headers.authorization === process.env.NEXT_PUBLIC_API_ROUTE_SECRET
  ) {
    const { data } = req.body as DataRequestBodyAPI<TransactionDataType>;

    switch (req.method) {
      case "GET":
        const getAllTransactionsByUser = await fauna
          .query<{ data: Array<DataCollectionFaunaDB<TransactionDataType>> }>(
            query.Map(
              query.Paginate(
                query.Match(
                  query.Index("transaction_by_userId"),
                  query.Casefold(String(sessionData?.userRef.id))
                ),
                {
                  size: SIZE_PER_PAGE_DEFAULT,
                }
              ),
              query.Lambda((x) => query.Get(x))
            )
          )
          .then((response) => {
            const transactions = response.data.map(
              (transaction) => transaction.data
            );

            return { payload: transactions };
          })
          .catch((err) => console.error("Error:", err.message));

        return res.status(200).json({ ...getAllTransactionsByUser });

      case "POST":
        const postUniqueTransactionsByUser = await fauna
          .query(
            query.Create("transactions", {
              data: {
                userId: sessionData?.userRef.id,
                ...data,
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
