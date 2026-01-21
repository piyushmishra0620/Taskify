import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {Users} from "@/lib/schema";
import {NextResponse,NextRequest} from "next/server";

export async function POST(req:NextRequest){
    const {username,email,password} = await req.json();
    if(!username || !email || !password){
        return NextResponse.json({error:"All fields are required"},{status:400});
    }
    const existingUser = await Users.find({email});

    if(existingUser){
        return NextResponse.json({error:"User already exists"},{status:409});
    }

    const genSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password,genSalt);

    await Users.insertOne({name:username,email:email,password:hashedPassword});
    const id = (await Users.find({email}).toArray())[0]._id;
    const token = jwt.sign({name:username,email:email,password:hashedPassword,id:id},process.env.JWT_SECRET!);
    NextResponse.next().cookies.set("token",token,{httpOnly:true,expires:new Date(Date.now()+30*24*60*60*1000),maxAge:30*24*60*60});
    return NextResponse.json({message:"Signup successful"},{status:200});
} 
