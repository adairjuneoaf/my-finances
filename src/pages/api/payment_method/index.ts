// Imports Next-Auth/Next.js
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import type { NextApiRequest, NextApiResponse } from 'next'

// Imports FaunaDB
import { query } from 'faunadb'
import fauna from '../../../services/fauna'

// Typings[TypeScript]
import { SessionDataType } from '../../../@types/SessionDataType'
import { DataResponseAPI } from '../../../@types/DataResponseAPI'
import { PaymentMethodType } from '../../../@types/PaymentMethodType'
import { DataRequestBodyAPI } from '../../../@types/DataRequestBodyAPI'
import { DataCollectionFaunaDB } from '../../../@types/DataCollectionFaunaDB'

const SIZE_PER_PAGE_DEFAULT = 99999

const getAllPaymentMethods = async (
  req: NextApiRequest,
  res: NextApiResponse<DataResponseAPI<PaymentMethodType> | unknown>,
) => {
  const sessionData = (await getServerSession(
    { req: req, res: res },
    authOptions,
  )) as SessionDataType | null

  if (
    (sessionData !== undefined || null) &&
    req.headers.authorization === process.env.NEXT_PUBLIC_API_ROUTE_SECRET
  ) {
    const { data } = req.body as DataRequestBodyAPI<PaymentMethodType>

    switch (req.method) {
      case 'GET': {
        const getAllPaymentMethodsByUser = await fauna
          .query<{ data: Array<DataCollectionFaunaDB<PaymentMethodType>> }>(
            query.Map(
              query.Paginate(
                query.Match(
                  query.Index('paymentMethod_by_userId'),
                  query.Casefold(String(sessionData?.userRef.id)),
                ),
                {
                  size: SIZE_PER_PAGE_DEFAULT,
                },
              ),
              query.Lambda((x) => query.Get(x)),
            ),
          )
          .then((response) => {
            const paymentMethods = response.data.map((paymentMethod) => paymentMethod.data)

            return { payload: paymentMethods }
          })
          .catch((err) => console.log('Error:', err.message))

        return res.status(200).json({ ...getAllPaymentMethodsByUser })
      }

      case 'POST': {
        const postUniquePaymentMethodByUser = await fauna
          .query(
            query.Create('paymentMethods', {
              data: {
                userId: sessionData?.userRef.id,
                ...data,
              },
            }),
          )
          .then((response) => {
            return response
          })
          .catch((err) => {
            console.error(err.message)
          })

        return res.status(200).json({ ...postUniquePaymentMethodByUser })
      }

      default:
        res.status(405).end('Method not allowed!')
    }
  } else {
    return res.status(401).end('You are not authorized to call this API!')
  }
}

export default getAllPaymentMethods
