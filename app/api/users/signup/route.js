import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"

import db from "@/db/PrismaClient";
import "dotenv/config"


const createToken=(id)=>{
    return jwt.sign({id:id},process.env.SECRET,{expiresIn:"3d"})
}


const signupFunc=async(email,password,role,address)=>{
    if (!email || !password) {
        throw new Error("All fields are required");
    }
  
    const existingUser =await db.user.findUnique({
        where:{email : email}
    })

    if (existingUser) {
        throw new Error("This email already exists");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await db.user.create({
        data:{
            email,
            password: hash,
            role: role,
            address:address
        }
    })
    
    return newUser;
}

export async function POST(req){
    try{
        const {email,password,role,address}=await req.json()
        const user= await signupFunc(email,password,role,address)
        console.log("USER:",user)
        const token=createToken(user.id)
        return NextResponse.json({id:user.id,email:email,address:address,token:token, role: role},{status:201})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }
}