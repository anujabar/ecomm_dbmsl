import { authMiddleware } from "@/app/(middleware)/auth";
import db from "@/db/PrismaClient";
import { NextResponse } from "next/server";


async function paymentHandler(req) {
    const { userId, amount } = await req.json();
    console.log(userId, amount)
    try {
      const payment = await db.payment.create({
        data: {
          userId,
          amount,
        },
      });
      console.log(1)

      return NextResponse.json({payment}, {status: 201})
      
    } catch (error) {
        return NextResponse.json({error: "Failed to process payment"}, {status: 500})
    }
}

export const POST = authMiddleware(paymentHandler)
