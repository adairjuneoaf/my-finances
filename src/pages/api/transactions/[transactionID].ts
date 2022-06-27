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

type DataResponseAPI = TransactionDataType | {} | void;
type DataRequestBodyAPI = { transactionData: TransactionDataType };

type ReqQuery = {
  transactionID: string;
};

const getUniqueTransaction = async (
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
    const { transactionID } = req.query as ReqQuery;
    const { transactionData } = req.body as DataRequestBodyAPI;

    switch (req.method) {
      case "GET":
        const getUniqueTransactionByID = await fauna
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
          // .query(
          //   query.Get(
          //     query.Match(
          //       query.Index("transaction_by_id"),
          //       query.Casefold(String("f1a687b1-98d9-49a0-84e5-896b7fed0533"))
          //     )
          //   )
          // )
          .then((response) => {
            const transaction = response.find(
              (value) => value.data.id === transactionID
            );

            return transaction?.data;
          })
          .catch((err) => {
            console.error(err.message);
          });

        return res.status(200).json(getUniqueTransactionByID);

      case "PUT":
        const putUniqueTransactionByID = await fauna
          .query(
            query.Replace(
              query.Select(
                "ref",
                query.Get(
                  query.Match(
                    query.Index("transaction_by_id"),
                    query.Casefold(String(transactionID))
                  )
                )
              ),
              {
                data: {
                  userId: sessionData?.userRef.id,
                  ...transactionData,
                },
              }
            )
          )
          .then((response) => response)
          .catch((err) => console.error("Error: ", err.message));

        return res.status(200).json(putUniqueTransactionByID);

      case "PATCH":
        const patchUniqueTransactionByID = await fauna
          .query(
            query.Update(
              query.Select(
                "ref",
                query.Get(
                  query.Match(
                    query.Index("transaction_by_id"),
                    query.Casefold(String(transactionID))
                  )
                )
              ),
              {
                data: {
                  ...transactionData,
                },
              }
            )
          )
          .then((response) => response)
          .catch((err) => console.error("Error: ", err.message));

        return res.status(200).json(patchUniqueTransactionByID);

      default:
        res.status(405).end("Method not allowed!");
    }
  } else {
    return res.status(401).end("You are not authorized to call this API!");
  }
};

export default getUniqueTransaction;
