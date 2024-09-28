import db from "@/db/drizzle";
import { products } from "@/db/Schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function DELETE(req,{params}) {
    const {pid} = params
    try{
        if(!pid){
            return NextResponse.json({message: "Product Id missing"}, {status: 400})
        }
        await db.delete().from(products).where(eq(products.id, Number(pid)))
        return NextResponse.json({message: "Product deleted Successfully"}, {status: 200})
    }catch(e){
        console.log("error deleting product: ", e)
        return NextResponse.json({message: "Failed to delete product"}, {status: 500})

    }
}

export async function PUT(req, {params}) {
    const {pid}=params
    const body = await req.json()
    try{
        if (!pid) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
          }
      
          await db.update(products)
            .set({
             
            })
            .where(eq(products.id, Number(pid)));
      
          return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
        } catch (error) {
          console.error("Error updating product:", error);
          return NextResponse.json({ message: "Failed to update product", error: error.message }, { status: 500 });
        }
    
}