import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import fauna from "../../../services/fauna";
import { query } from "faunadb";

type User = {
  ref: {
    id: string;
  };
};

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user, user:email",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const { id, name, email } = user;

      const initialUserData = {
        userId: id,
        name: name,
        email: email,
        transactions: [{}],
        paymentMethods: [{}],
        creditorsDebtors: [{}],
      };

      try {
        await fauna.query(
          query.If(
            query.Not(query.Exists(query.Match(query.Index("user_by_email"), query.Casefold(String(email))))),
            query.Create(query.Collection("users"), { data: initialUserData }),
            query.Select("ref", query.Get(query.Match(query.Index("user_by_userId"), query.Casefold(String(id)))))
          )
        );

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async session({ session }) {
      const userFaunaDB = await fauna.query<User>(
        query.Select(
          "ref",
          query.Get(query.Match(query.Index("user_by_email"), query.Casefold(String(session?.user?.email))))
        )
      );

      return { ...session, userRef: userFaunaDB };
    },
  },
});
