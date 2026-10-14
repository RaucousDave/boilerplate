import {MongoClient} from 'mongodb'

import dotenv from 'dotenv'
import { betterAuth } from 'better-auth'
import { mongodbAdapter } from '@better-auth/mongo-adapter'

dotenv.config()

const mongoDbUri = process.env.MONG0DB_CONNECTION_STRING
if (!mongoDbUri) {
  throw new Error("Invalid mongo db connection string")
}

const client = new MongoClient(mongoDbUri)
const db = client.db()

export const auth = betterAuth({
  baseUrl: process.env.BETTER_AUTH_URL ?? "http://localhostt:3000",
  database: mongodbAdapter(db, {
    client
  }),

  emailAndPassword: {
    enabled: true
  }
})
