// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// Imports FaunaDB
import fauna from "../../../services/fauna";
import { query } from "faunadb";

// Typings[TypeScript]
import { SessionDataType } from "../../../@types/SessionDataType";
import { DataResponseAPI } from "../../../@types/DataResponseAPI";
import { TransactionDataType } from "../../../@types/TransactionDataType";
import { DataCollectionFaunaDB } from "../../../@types/DataCollectionFaunaDB";
import { DataRequestBodyAPI } from "../../../@types/DataRequestBodyAPI";

const SIZE_PER_PAGE_DEFAULT = 5;

type DataAfterAndBeforePage = [
  transactionRef: {
    id: string;
  }
];

let currentPage: number = 0;
let countTotalTransactions: number = 0;
let arrayCountPagesAndValidationIsEmpty: Number[] = [];
let refAfterPageTransactions: string | undefined = undefined;
let refBeforePageTransactions: string | undefined = undefined;

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
          .query<{
            count: number;
            list: {
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
                  list: query.If(
                    query.IsEmpty(arrayCountPagesAndValidationIsEmpty),
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
                          size: SIZE_PER_PAGE_DEFAULT,
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
            const list = response.list.data.map(
              (transaction) => transaction.data
            );

            arrayCountPagesAndValidationIsEmpty.push(
              arrayCountPagesAndValidationIsEmpty.length + 1,
              (currentPage = currentPage + 1)
            );

            countTotalTransactions = response.count;

            refAfterPageTransactions = response.list.after
              ? String(response.list.after.shift()?.id)
              : undefined;

            refBeforePageTransactions = response.list.before
              ? String(response.list.before.shift()?.id)
              : undefined;

            return { list };
          })
          .catch((err) => console.error("Error:", err.message));

        return res.status(200).json({
          pagination: {
            page: currentPage,
            totalCount: countTotalTransactions,
            refNextPage: refAfterPageTransactions,
            refPreviousPage: refBeforePageTransactions,
          },
          payload: { ...getAllTransactionsByUser },
        });

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
