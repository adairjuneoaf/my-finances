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
import { DataCollectionFaunaDB } from "../../../@types/DataCollectionFaunaDB";

type DataResponseAPI = CreditorDebtorType | {} | void;

type ReqQuery = {
  creditorDebtorID: string;
};

const getUniqueCreditorDebtor = async (req: NextApiRequest, res: NextApiResponse<DataResponseAPI>) => {
  const sessionData = (await getServerSession(
    { req: req, res: res },
    authOptions
  )) as SessionDataType | null;

  if (!!sessionData && req.headers.authorization !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
    res.status(401).end("You are not authorized to call this API!");
  }

  const { creditorDebtorID } = req.query as ReqQuery;

  switch (req.method) {
    case "GET":
      const getUniqueCreditorDebtorByID = await fauna
        .query<Array<DataCollectionFaunaDB<CreditorDebtorType>>>(
          query.Map(
            query.Select(
              ["data"],
              query.Paginate(
                query.Match(
                  query.Index("creditorDebtor_by_userId"),
                  query.Casefold(String(sessionData?.userRef.id))
                )
              )
            ),
            query.Lambda((x) => query.Get(x))
          )
        )
        .then((response) => {
          const paymentMethod = response.find((value) => value.data.id === creditorDebtorID);
          return paymentMethod?.data;
        })
        .catch((err) => {
          console.error(err.message);
        });

      return res.status(200).json(getUniqueCreditorDebtorByID);

    case "PUT":
      return res.status(200).json({ method: "Allowed PUT" });

    case "PATCH":
      return res.status(200).json({ method: "Allowed PATCH" });

    default:
      res.status(405).end("Method not allowed!");
  }
};

export default getUniqueCreditorDebtor;
