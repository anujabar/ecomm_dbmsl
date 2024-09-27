import {neon} from "@neondatabase/serverless"
import {drizzle} from "drizzle-orm/neon-http"
import * as schema from './Schema'
import "dotenv/config"

console.log(schema)
const sql=neon(process.env.DB_URL)
const db=drizzle(sql,{schema})

export default db