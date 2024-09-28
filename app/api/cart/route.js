import { NextResponse } from "next/server"
import { cart } from "@/db/Schema.js";
import db from "@/db/drizzle.js";
import { eq } from 'drizzle-orm';

export async function POST(req){
    try{
        const {userId,productId}=await req.json()
        await db.insert(cart).values({ userId,productId,quantity:1}).returning();
        return NextResponse.json({message:"Success"},{status:201})
    }
    catch(error){
        console.log("ERROR:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}
