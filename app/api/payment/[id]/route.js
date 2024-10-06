import { authMiddleware } from "@/app/(middleware)/auth";
import db from "@/db/PrismaClient";
import { NextResponse } from "next/server";




const addOrderToPayment = async(req, {params})=>{
    const { id } = params;
    const { orderId } = await req.json();
    console.log(id, orderId)
  
    try {
      const payment = await db.payment.update({
        where: { id: Number(id) },
        data: { orderId: parseInt(orderId) },
      });
      return NextResponse.json(payment, {status: 200})
    
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({error: "Failed to update payment"}, {status: 500})
    }
  }

export const PATCH = authMiddleware(addOrderToPayment)