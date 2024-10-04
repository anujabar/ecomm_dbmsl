import { NextResponse } from "next/server"
import db from "@/db/PrismaClient";
import { authMiddleware } from "@/app/(middleware)/auth";



const postCheckout = async(req,{params})=>{
    const {id:idu}=params
    try{
        const data=await req.json()
        const items=data.items
        let prodId=[]
        let quan=[]
        items.forEach((i)=>{
            prodId.push(i.productId)
            quan.push(i.quantity)
        })
        const newOrder = await db.order.create({
            data:{
                userId:idu,
                productId:prodId,
                quantity:quan,

            }
        })
        
        return NextResponse.json({message:"Success"},{status:201})
    }
    catch(error){
        console.log("ERROR:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}


const deleteCheckout=async(req,{params})=>{
    const {id:idu}=params
    try{
        await db.cart.delete({
            where:{
                userId: parseInt(idu)
            }
        })
        
        return NextResponse.json({message:"Success"},{status:201})
    }
    catch(error){
        console.log("ERROR:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}

export const POST = authMiddleware(postCheckout)
export const DELETE = authMiddleware(deleteCheckout)