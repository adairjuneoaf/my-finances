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
type DataAfterAndBeforePage = [
  transactionRef: {
    id: string;
  }
];

let countTotalTransactions: number = 0;
let arrayCountPagesAndValidationIsEmpty: Number[] = [];
let refAfterPageTransactions: string | undefined = undefined;
let refBeforePageTransactions: string | undefined = undefined;

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
          .query<{
            count: number;
            transactions: {
              after: DataAfterAndBeforePage;
              before: DataAfterAndBeforePage;
              data: Array<DataCollectionFaunaDB<TransactionDataType>>;
            };
          }>(
            query.Let(
              {
                payload: {
                  count: query.Count(
                    query.Match(
                      query.Index("transaction_by_userId"),
                      query.Casefold(String(sessionData?.userRef.id))
                    )
                  ),
                  transactions: query.If(
                    query.IsEmpty(arrayCountPagesAndValidationIsEmpty),
                    query.Map(
                      query.Paginate(
                        query.Match(
                          query.Index("transaction_by_userId"),
                          query.Casefold(String(sessionData?.userRef.id))
                        ),
                        {
                          size: 5,
                        }
                      ),
                      query.Lambda((x) => query.Get(x))
                    ),
                    query.Map(
                      query.Paginate(
                        query.Match(
                          query.Index("transaction_by_userId"),
                          query.Casefold(String(sessionData?.userRef.id))
                        ),
                        {
                          after: [
                            query.Ref(
                              query.Collection("transactions"),
                              String(refAfterPageTransactions)
                            ),
                          ],
                          size: 5,
                        }
                      ),
                      query.Lambda((x) => query.Get(x))
                    )
                  ),
                },
              },
              query.Var("payload")
            )
          )
          .then((response) => {
            const transactions = response.transactions.data.map(
              (transaction) => transaction.data
            );

            arrayCountPagesAndValidationIsEmpty.push(
              arrayCountPagesAndValidationIsEmpty.length + 1
            );

            countTotalTransactions = response.count;

            refAfterPageTransactions = response.transactions.after
              ? String(response.transactions.after.shift()?.id)
              : undefined;

            refBeforePageTransactions = response.transactions.before
              ? String(response.transactions.before.shift()?.id)
              : undefined;

            return { transactions };
          })
          .catch((err) => console.error("Error:", err.message));

        return res.status(200).json({
          pagination: {
            totalCount: countTotalTransactions,
            refNextPage: refAfterPageTransactions,
            refPreviousPage: refBeforePageTransactions,
          },
          payload: {
            ...getAllTransactionsByUser,
          },
        });

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
