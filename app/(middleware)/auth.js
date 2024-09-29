import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export const authMiddleware=(handler)=>async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1]

    if (!token){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    try{
        const decoded = jwt.verify(token,process.env.SECRET)
        req.user = decoded
        return handler(req,res)
    }catch(e){
        console.log("Auth error: ", e)
        return NextResponse.json({error: "Unauthorized"},{status: 401})
    }
}