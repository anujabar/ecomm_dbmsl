import "dotenv/config"
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema:"./db/schema.js",
    out:"./db/drizzle.js",
    dbCredentials:{
        url:process.env.DB_URL
    },
    dialect:"postgresql"
})