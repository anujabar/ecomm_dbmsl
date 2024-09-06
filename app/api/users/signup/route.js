import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
import {users} from "../../../../db/schema.js"
import db from "@/db/drizzle.js";
import { eq } from 'drizzle-orm';
import "dotenv/config"

const createToken=(id)=>{
    return jwt.sign({id:id},process.env.SECRET,{expiresIn:"3d"})
}


const signupFunc=async(email,password,role)=>{
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    
    const existingUser =await db.query.users.findFirst({
        where:eq(users.email,email)
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

    const [newUser] = await db.insert(users).values({ email, password: hash ,role:role}).returning();
    
    return newUser;
}

export async function POST(req){
    try{
        const {email,password,role}=await req.json()
        console.log("EP:",email,password,role)
        const user= await signupFunc(email,password,role)
        console.log("USER:",user)
        const token=createToken(user.id)
        return NextResponse.json({email:email,token:token},{status:201})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }
}