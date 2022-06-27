// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// Imports FaunaDB
import fauna from "../../../services/fauna";
import { query } from "faunadb";

// Typings[TypeScript]
import { SessionDataType } from "../../../@types/SessionDataType";
import { PaymentMethodType } from "../../../@types/PaymentMethodType";
import { DataCollectionFaunaDB } from "../../../@types/DataCollectionFaunaDB";

type DataResponseAPI = Array<PaymentMethodType> | {} | void;

const getAllPaymentMethods = async (
  req: NextApiRequest,
  res: NextApiResponse<DataResponseAPI>
) => {
  const sessionData = (await getServerSession(
    { req: req, res: res },
    authOptions
  )) as SessionDataType | null;

  if (
    !!sessionData &&
    req.headers.authorization !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET
  ) {
    res.status(401).end("You are not authorized to call this API!");
  }

  switch (req.method) {
    case "GET":
      const getAllPaymentMethodsByUser = await fauna
        .query<Array<DataCollectionFaunaDB<PaymentMethodType>>>(
          query.Map(
            query.Select(
              ["data"],
              query.Paginate(
                query.Match(
                  query.Index("paymentMethod_by_userId"),
                  query.Casefold(String(sessionData?.userRef.id))
                )
              )
            ),
            query.Lambda((x) => query.Get(x))
          )
        )
        .then((response) => {
          const paymentMethods = response.map(
            (paymentMethod) => paymentMethod.data
          );
          return paymentMethods;
        })
        .catch((err) => console.log("Error:", err.message));

      return res.status(200).json(getAllPaymentMethodsByUser);

    case "POST":
      res.status(200).end("Method allowed, is development!");

    default:
      res.status(405).end("Method not allowed!");
  }
};

export default getAllPaymentMethods;
