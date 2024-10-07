import { authMiddleware } from "@/app/(middleware)/auth";
import db from "@/db/PrismaClient";
import { NextResponse } from "next/server";


async function getReviews(req,{params}) {
    const {id:prodId}=params
    try {
        const data=await req.json()
        const rev=await db.review.findFirst({
            where:{
                productId:parseInt(prodId),
                userId:data.userId
            }
        });
        console.log(1)

      return NextResponse.json({userRev:rev.stars}, {status: 201})
      
    } catch (error) {
      console.log(error.message)
        return NextResponse.json({error: "Failed to fetch reviews"}, {status: 500})
    }
}

async function postReviews(req,{params}) {
    const {id:prodId}=params
    try {
        const data=await req.json()
        await db.product.update({
            where:{
                id:parseInt(prodId)
            },
            data: {
            stars:data.stars+data.newStars,
            reviews: {increment : 1}
            }
        });
        await db.review.create({
            data: {
            stars:data.newStars,
            userId:data.userId,
            productId:prodId
            }
        });
      console.log(1)

      return NextResponse.json({message:"Success"}, {status: 201})
      
    } catch (error) {
      console.log(error.message)
        return NextResponse.json({error: "Failed to update"}, {status: 500})
    }
}

export const GET = authMiddleware(getReviews)
export const POST = authMiddleware(postReviews)
