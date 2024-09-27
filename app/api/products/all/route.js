import db from "@/db/drizzle";
import { products } from "@/db/Schema";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        const allProducts = await db.select().from(products)
        return NextResponse.json({products:allProducts}, {status: 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({message: "Error fetching products", error: error.message}, {status: 500}).status(500)
    }
    
}