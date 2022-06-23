// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Imports FaunaDB
import fauna from "../../../services/fauna";
import { query } from "faunadb";

// Typings[TypeScript]
import { CreditorDebtorType } from "../../../@types/CreditorDebtorType";

type DataResponseAPI = CreditorDebtorType | {} | void;

type ReqQuery = {
  creditorDebtorID: string;
};

const getUniqueCreditorDebtor = async (req: NextApiRequest, res: NextApiResponse<DataResponseAPI>) => {
  if (req.headers.authorization !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
    res.status(401).end("You are not authorized to call this API!");
  }

  const session = await getSession({ req });
  const { creditorDebtorID } = req.query as ReqQuery;

  switch (req.method) {
    case "GET":
      const getUniqueCreditorDebtorByID = await fauna
        .query<Array<CreditorDebtorType>>(
          query.Select(
            ["data", "creditorsDebtors"],
            query.Get(query.Match(query.Index("user_by_email"), query.Casefold(String(session?.user?.email)))),
            "This creditor/debtor not exist!"
          )
        )
        .then((response) => {
          return response.find((value) => value.id === creditorDebtorID);
        })
        .catch((err) => {
          console.error(err.message);
        });

      return res.status(200).json(getUniqueCreditorDebtorByID);

    case "POST":
      return res.status(200).json({ method: "Allowed POST" });

    case "PUT":
      return res.status(200).json({ method: "Allowed PUT" });

    case "PATCH":
      return res.status(200).json({ method: "Allowed PATCH" });

    default:
      res.status(405).end("Method not allowed!");
  }
};

export default getUniqueCreditorDebtor;
