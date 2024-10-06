import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
import db from "@/db/PrismaClient";
import "dotenv/config"


const createToken=(id)=>{
    return jwt.sign({id:id},process.env.SECRET,{expiresIn:"3d"})
}


const loginFunc=async(email,password)=>{
    if (!email || !password) {
        throw new Error("All fields are required");
      }
    
      const user = await db.user.findUnique({
        where: {
          email: email
        }
      });
    
      if (!user) {
        throw new Error("Invalid Email");
      }
    
      const match = await bcrypt.compare(password, user.password);
    
      if (!match) {
        throw new Error("Invalid Password");
      }
    
      return user
}

export async function POST(req){
    try{
        const {email,password}=await req.json()
        console.log("EP:",email,password)
        const user= await loginFunc(email,password)
        console.log("USER:",user)
        const token=createToken(user.id)
        return NextResponse.json({id:user.id,email:email,address:user.address,token:token},{status:201})
    }
    catch(error){
        console.log("ERROR:",error)
        return NextResponse.json({error:error.message},{status:500})//sends a json response
    }
}