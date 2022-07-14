// Imports Next-Auth/Next.js
import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

// Imports FaunaDB
import fauna from '../../../services/fauna'
import { query } from 'faunadb'

// Typings[TypeScript]
import { SessionDataType } from '../../../@types/SessionDataType'
import { PaymentMethodType } from '../../../@types/PaymentMethodType'

type DataResponseAPI = PaymentMethodType | unknown | void
type DataRequestBodyAPI = { paymentMethodData: PaymentMethodType }

type ReqQuery = {
  paymentMethodID: string
}

const getUniquePaymentMethod = async (
  req: NextApiRequest,
  res: NextApiResponse<DataResponseAPI>,
) => {
  const sessionData = (await getServerSession(
    { req: req, res: res },
    authOptions,
  )) as SessionDataType | null

  if (
    (sessionData !== undefined || null) &&
    req.headers.authorization === process.env.NEXT_PUBLIC_API_ROUTE_SECRET
  ) {
    const { paymentMethodID } = req.query as ReqQuery
    const { paymentMethodData } = req.body as DataRequestBodyAPI

    switch (req.method) {
      case 'GET': {
        const getUniquePaymentMethodByID = await fauna
          .query<PaymentMethodType>(
            query.Select(
              ['data'],
              query.Get(
                query.Match(
                  query.Index('paymentMethod_by_id'),
                  query.Casefold(String(paymentMethodID)),
                ),
              ),
            ),
          )
          .then((response) => {
            return response
          })
          .catch((err) => {
            console.error(err.message)
          })

        return res.status(200).json(getUniquePaymentMethodByID)
      }

      case 'PUT': {
        const putUniquePaymentMethodByID = await fauna
          .query(
            query.Replace(
              query.Select(
                'ref',
                query.Get(
                  query.Match(
                    query.Index('paymentMethod_by_id'),
                    query.Casefold(String(paymentMethodID)),
                  ),
                ),
              ),
              {
                data: {
                  userId: sessionData?.userRef.id,
                  ...paymentMethodData,
                },
              },
            ),
          )
          .then((response) => response)
          .catch((err) => console.error('Error: ', err.message))

        return res.status(200).json(putUniquePaymentMethodByID)
      }

      case 'PATCH': {
        const patchUniquePaymentMethodByID = await fauna
          .query(
            query.Update(
              query.Select(
                'ref',
                query.Get(
                  query.Match(
                    query.Index('paymentMethod_by_id'),
                    query.Casefold(String(paymentMethodID)),
                  ),
                ),
              ),
              {
                data: {
                  ...paymentMethodData,
                },
              },
            ),
          )
          .then((response) => response)
          .catch((err) => console.error('Error: ', err.message))

        return res.status(200).json(patchUniquePaymentMethodByID)
      }

      default:
        res.status(405).end('Method not allowed!')
    }
  } else {
    return res.status(401).end('You are not authorized to call this API!')
  }
}

export default getUniquePaymentMethod
