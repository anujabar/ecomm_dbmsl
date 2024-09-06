import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema.js";

const sql = neon(process.env.DB_URL);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Resetting database");

    await db.delete(schema.users);
    console.log("Resetting finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset the database");
  }
};

main();