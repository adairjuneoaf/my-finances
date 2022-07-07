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
import { CreditorDebtorType } from "../../../@types/CreditorDebtorType";
import { DataRequestBodyAPI } from "../../../@types/DataRequestBodyAPI";
import { DataCollectionFaunaDB } from "../../../@types/DataCollectionFaunaDB";

const SIZE_PER_PAGE_DEFAULT = 99999;

const getAllCreditorsDebtors = async (
  req: NextApiRequest,
  res: NextApiResponse<DataResponseAPI<CreditorDebtorType> | {}>
) => {
  const sessionData = (await getServerSession(
    { req: req, res: res },
    authOptions
  )) as SessionDataType | null;

  if (
    (sessionData !== undefined || null) &&
    req.headers.authorization === process.env.NEXT_PUBLIC_API_ROUTE_SECRET
  ) {
    const { data } = req.body as DataRequestBodyAPI<CreditorDebtorType>;

    switch (req.method) {
      case "GET":
        const getAllCreditorsDebtorsByUser = await fauna
          .query<{ data: Array<DataCollectionFaunaDB<CreditorDebtorType>> }>(
            query.Map(
              query.Paginate(
                query.Match(
                  query.Index("creditorDebtor_by_userId"),
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
            const creditorsDebtors = response.data.map(
              (creditorDebtor) => creditorDebtor.data
            );

            return { payload: creditorsDebtors };
          })
          .catch((err) => console.log("Error:", err.message));

        return res.status(200).json({ ...getAllCreditorsDebtorsByUser });

      case "POST":
        const postUniqueCreditorDebtorByUser = await fauna
          .query(
            query.Create("creditorsDebtors", {
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

        return res.status(200).json({ ...postUniqueCreditorDebtorByUser });
      default:
        res.status(405).end("Method not allowed!");
    }
  } else {
    return res.status(401).end("You are not authorized to call this API!");
  }
};

export default getAllCreditorsDebtors;
