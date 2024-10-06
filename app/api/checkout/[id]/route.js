import { NextResponse } from "next/server"
import db from "@/db/PrismaClient";
import { authMiddleware } from "@/app/(middleware)/auth";



const postCheckout = async(req,{params})=>{
    const {id:idu}=params
    try{
        const data=await req.json()
        const items=data.items
        const newOrder = await db.order.create({
            data:{
                userId:parseInt(idu)
            }
        })
        console.log("NO:",newOrder)
        console.log(data)
        const orderId=newOrder.id
        items.forEach(async (i)=>{
            const newOrder = await db.orderItem.create({
                data:{
                    orderId,
                    productId: parseInt(i.productId),
                    quantity:parseInt(i.quantity)
                }
            })
        })

        items.forEach(async(i)=>{
            console.log(i.productId, i.quantity)
            await db.product.update({
                where: {
                    id: parseInt(i.productId)
                },
                data:{
                    quantity: {decrement: parseInt(i.quantity)}
                }
            })
        })
        
        return NextResponse.json({message:"Success", orderId: orderId},{status:201})
    }
    catch(error){
        console.log("ERROR:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}


const deleteCheckout=async(req,{params})=>{
    const {id:idu}=params
    try{
        await db.cart.deleteMany({
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