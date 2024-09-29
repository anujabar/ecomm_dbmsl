import { NextResponse } from "next/server"
import db from "@/db/PrismaClient";

export async function POST(req){
    try{
        const {userId,productId}=await req.json()
        await db.cart.create({
            data: {
                userId, productId, quantity:1
            }
        })

        return NextResponse.json({message:"Success"},{status:201})
    }
    catch(error){
        console.log("ERROR:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}
