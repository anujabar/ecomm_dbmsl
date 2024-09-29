import { NextResponse } from "next/server"
import { cart,products } from "@/db/Schema.js";
import db from "@/db/PrismaClient";



export async function GET(req,{params}){
    const {id}=params
    try{
        const result = await db.cart.findMany({
            where:{
                userId: id
            }
        })
        
        let prodDet=[]
        for (const r of result) {
            console.log(r)
            const res = await db.product.findUnique({
                where:{
                    id: r.productId
                }
            })
            
            const { id, title, price, images,quantity:available} = res[0];
            prodDet.push({ id:r.id,productId:id, title, price, images, quantity: r.quantity,available});
          }

        console.log("Cart result:",prodDet)
        return NextResponse.json({prodDet},{status:201})
    }
    catch(error){
        console.log("ERROR:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}

export async function PUT(req,{params}){
    const {id:idc}=params
    try{
        const {quan}=await req.json()
        await db
        .update(cart)
        .set({quantity:quan}) 
        .where(eq(cart.id,idc)); 
        
        return NextResponse.json({message:"Success"},{status:201})
    }
    catch(error){
        console.log("ERROR:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}

export async function DELETE(req,{params}){
    const {id:idc}=params
    try{
        await db
      .delete(cart)
      .where(eq(cart.id, idc));
        
        return NextResponse.json({message:"Success"},{status:201})
    }
    catch(error){
        console.log("ERROR:",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}