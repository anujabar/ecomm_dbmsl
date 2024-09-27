import { pgTable, varchar, float, integer, json, serial } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),  
  title: varchar("title").notNull(), 
  description: varchar("description").notNull(),  
  price: float("price").notNull(), 
  category: varchar("category").notNull(), 
  salePercentage: float("sale_percentage").default(0),  
  stars: integer("stars").notNull().default(0), 
  quantity: integer("quantity").notNull(), 
  images: json("images").notNull(), 
  createdAt: varchar("created_at").defaultNow(),  
});