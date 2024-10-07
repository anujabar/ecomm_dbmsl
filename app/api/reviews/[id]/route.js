import { authMiddleware } from "@/app/(middleware)/auth";
import db from "@/db/PrismaClient";
import { NextResponse } from "next/server";


async function getReviews(req,{params}) {
    const {id:prodId}=params
    
    try {
        const data=await req.json()
        console.log(data)
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
        console.log("data: ", data)
        if (data.oldStars ==0){
            await db.product.update({
            where:{
                id:parseInt(prodId)
            },
            data: {
            stars:{increment: (parseFloat(data.newStars) - parseFloat(data.oldStars))},
            reviews: {increment : 1}
            }
        });
        await db.review.create({
            data: {
            stars: parseFloat(data.newStars),
            userId: parseInt(data.userId),
            productId: parseInt(prodId)
            }
        });
        }
        else{
                await db.product.update({
                where:{
                    id:parseInt(prodId)
                },
                data: {
                stars:{increment: (parseFloat(data.newStars) - parseFloat(data.oldStars))},
                }
            });
        }
        
        
      console.log(1)

      return NextResponse.json({message:"Success"}, {status: 201})
      
    } catch (error) {
      console.log(error.message)
        return NextResponse.json({error: "Failed to update"}, {status: 500})
    }
}

export const POST = authMiddleware(getReviews)
export const PATCH = authMiddleware(postReviews)
