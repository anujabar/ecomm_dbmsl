import { authMiddleware } from "@/app/(middleware)/auth";
import db from "@/db/PrismaClient";
import { NextResponse } from "next/server";


const getProducts = async(req, {params})=> {
    const {user_id} = params
    console.log(user_id)
    try{
        const p = await db.product.findMany({
            where:{
                seller: Number(user_id)
            }
        })
        console.log(p)
        return NextResponse.json({products:p}, {status: 200,headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'}})
    }catch(e){
        return NextResponse.json({message: "Falsed to fetch products", e})
    }
} 

export const GET=authMiddleware(getProducts)