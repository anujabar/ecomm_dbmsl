import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema.js";

const sql = neon(process.env.DB_URL);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.users);

    await db.insert(schema.users).values([
      {
        id: 1,
        email: "anuja.barawkar@gmail.com",
        password: "dsaksdha",
      }
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();