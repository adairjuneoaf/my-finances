import { Session } from 'next-auth'

export interface SessionDataType extends Session {
  userRef: {
    id: string
  }
}
