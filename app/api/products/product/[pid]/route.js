import db from "@/db/PrismaClient";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/app/(middleware)/auth";


const deleteHandler = async(req,{params})=> {
    const {pid} = params
    try{
        if(!pid){
            return NextResponse.json({message: "Product Id missing"}, {status: 400})
        }
        await db.product.delete({
            where:{
                id: Number(pid)
            }
        })
        return NextResponse.json({message: "Product deleted Successfully"}, {status: 200})
    }catch(e){
        console.log("error deleting product: ", e)
        return NextResponse.json({message: "Failed to delete product"}, {status: 500})

    }
}

const updateHandler = async(req, {params}) =>{
    const {pid}=params
    const {title, description, price, category, salePercentage, quantity} = await req.json()
    console.log(title, description, price, category, salePercentage, quantity)
    try{
        if (!pid) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
          }
          
          const result = await db.product.update({
            where: {
                id: Number(pid)
            },
            data:{
                title: title,
                description: description, 
                price: price, category: category,
                salePercentage: salePercentage,
                quantity: quantity
            }
            })
        
            console.log(result)
            return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
        } catch (error) {
          console.error("Error updating product:", error);
          return NextResponse.json({ message: "Failed to update product", error: error.message }, { status: 500 });
        }
    
}

export async function GET(req,{params}){
    const {pid}=params
    try{
        const result = await db.product.findFirst({
            where: {
                id: Number(pid)
            }
        })
        console.log(result)
        return NextResponse.json({product: result}, {status: 201})
    }catch(e){
        console.log("Error fetching product: ", e)
        return NextResponse.json({error: e.message}, {status: 500})
    }
}

export const DELETE = authMiddleware(deleteHandler)
export const PUT = authMiddleware(updateHandler)
