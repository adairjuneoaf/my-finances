// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Imports FaunaDB
import fauna from "../../../services/fauna";
import { query } from "faunadb";

// Typings[TypeScript]
import { PaymentMethodType } from "../../../@types/PaymentMethodType";

type DataResponseAPI = PaymentMethodType | {} | void;

type ReqQuery = {
  paymentMethodID: string;
};

const uniqueTransaction = async (req: NextApiRequest, res: NextApiResponse<DataResponseAPI>) => {
  if (req.headers.authorization !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
    res.status(401).end("You are not authorized to call this API!");
  }

  const session = await getSession({ req });
  const { paymentMethodID } = req.query as ReqQuery;

  switch (req.method) {
    case "GET":
      const getUniquePaymentMethodByID = await fauna
        .query<Array<PaymentMethodType>>(
          query.Select(
            ["data", "paymentMethods"],
            query.Get(query.Match(query.Index("user_by_email"), query.Casefold(String(session?.user?.email)))),
            "This payment method not exist!"
          )
        )
        .then((response) => {
          return response.find((value) => value.id === paymentMethodID);
        })
        .catch((err) => {
          console.error(err.message);
        });

      return res.status(200).json(getUniquePaymentMethodByID);

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

export default uniqueTransaction;
