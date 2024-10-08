import { authMiddleware } from "@/app/(middleware)/auth";
import db from "@/db/PrismaClient";
import { NextResponse } from "next/server";



const handler= async(req)=> {
    const userId = req.user.id
    try {
        const orders = await db.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true, 
                    },
                },
            }
        });
        return NextResponse.json(orders, {status: 200})

    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error retriving orders"}, {status: 500})
    }
}

export const GET = authMiddleware(handler)
