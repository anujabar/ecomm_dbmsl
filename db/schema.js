// import { serial, text } from "drizzle-orm/mysql-core";
import { pgTable,text,serial } from "drizzle-orm/pg-core";

export const users=pgTable("users",{
    id:serial("id").primaryKey(),
    email:text("email").notNull(),
    password:text("password").notNull(),
    role:text("role").notNull()
})