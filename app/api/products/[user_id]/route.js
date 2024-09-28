import db from "@/db/drizzle";
import { products } from "@/db/Schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    const {user_id} = params
    console.log(user_id)
    try{
        const p = await db.select().from(products).where(eq(products.seller,Number(user_id)))
        console.log(p)
        return NextResponse.json({products:p}, {status: 200})
    }catch(e){
        return NextResponse.json({message: "Falsed to fetch products", e})
    }
} 