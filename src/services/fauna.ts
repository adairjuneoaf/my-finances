import { Client } from "faunadb";

const fauna = new Client({
  domain: process.env.FAUNA_DB_ENDPOINT,
  secret: process.env.FAUNA_DB_KEY,
});

export default fauna;
