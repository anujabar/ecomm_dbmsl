import { pgTable, text, varchar,real, integer, json, serial, timestamp } from "drizzle-orm/pg-core";


export const users=pgTable("users",{
    id:serial("id").primaryKey(),
    email:text("email").notNull(),
    password:text("password").notNull(),
    role:text("role").notNull()
})

export const products = pgTable("products", {
    id: serial("id").primaryKey(),  
    title: varchar("title").notNull(), 
    description: varchar("description").notNull(),  
    price: real("price").notNull(), 
    category: varchar("category").notNull(), 
    salePercentage: real("sale_percentage").default(0),  
    stars: integer("stars").notNull().default(0), 
    quantity: integer("quantity").notNull(), 
    images: json("images").notNull(), 
    createdAt: timestamp("created_at").defaultNow(),  
  });