import db from "@/db/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        const allProducts = await db.product.findMany()
        console.log(allProducts)
        return NextResponse.json({products:allProducts}, {status: 200,headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }})
        
    }catch(error){
        console.log(error)
        return NextResponse.json({message: "Error fetching products", error: error.message}, {status: 500}).status(500)
    }
    
}