// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// Imports FaunaDB
import fauna from "../../../services/fauna";
import { query } from "faunadb";

// Typings[TypeScript]
import { SessionDataType } from "../../../@types/SessionDataType";
import { CreditorDebtorType } from "../../../@types/CreditorDebtorType";

type DataResponseAPI = CreditorDebtorType | {} | void;
type DataRequestBodyAPI = { creditorDebtorData: CreditorDebtorType };

type ReqQuery = {
  creditorDebtorID: string;
};

const getUniqueCreditorDebtor = async (
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
    const { creditorDebtorID } = req.query as ReqQuery;
    const { creditorDebtorData } = req.body as DataRequestBodyAPI;

    switch (req.method) {
      case "GET":
        const getUniqueCreditorDebtorByID = await fauna
          .query<CreditorDebtorType>(
            query.Select(
              ["data"],
              query.Get(
                query.Match(
                  query.Index("creditorDebtor_by_id"),
                  query.Casefold(String(creditorDebtorID))
                )
              )
            )
          )
          .then((response) => {
            return response;
          })
          .catch((err) => {
            console.error(err.message);
          });

        return res.status(200).json(getUniqueCreditorDebtorByID);

      case "PUT":
        const putUniqueCreditorDebtorByID = await fauna
          .query(
            query.Replace(
              query.Select(
                "ref",
                query.Get(
                  query.Match(
                    query.Index("creditorDebtor_by_id"),
                    query.Casefold(String(creditorDebtorID))
                  )
                )
              ),
              {
                data: {
                  userId: sessionData?.userRef.id,
                  ...creditorDebtorData,
                },
              }
            )
          )
          .then((response) => response)
          .catch((err) => console.error("Error: ", err.message));

        return res.status(200).json(putUniqueCreditorDebtorByID);

      case "PATCH":
        const patchUniqueCreditorDebtorByID = await fauna
          .query(
            query.Update(
              query.Select(
                "ref",
                query.Get(
                  query.Match(
                    query.Index("creditorDebtor_by_id"),
                    query.Casefold(String(creditorDebtorID))
                  )
                )
              ),
              {
                data: {
                  ...creditorDebtorData,
                },
              }
            )
          )
          .then((response) => response)
          .catch((err) => console.error("Error: ", err.message));

        return res.status(200).json(patchUniqueCreditorDebtorByID);

      default:
        res.status(405).end("Method not allowed!");
    }
  } else {
    return res.status(401).end("You are not authorized to call this API!");
  }
};

export default getUniqueCreditorDebtor;
