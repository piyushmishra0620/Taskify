import {NextRequest,NextResponse} from "next/server";
import {ObjectId} from "mongodb";
import {Users} from "@/lib/dbSchemas/user";
import jwt from "jsonwebtoken";

export const dynamic = 'force-dynamic';

export async function GET(req:NextRequest){
    const token = req.cookies.get("token");
    if(!token){
        return NextResponse.json({error:"Unauthorised Access"},{status:401});
    }
    try{
        const decoded : any = jwt.verify(token.value,process.env.JWT_SECRET!);
        if(!decoded){
            return NextResponse.json({error:"Invalid User , trying to access the wrong token!"},{status:401});
        }
        const userId = decoded.id;
        const user = await Users.findOne({_id:new ObjectId(userId)});
        if(!user){
            return NextResponse.json({error:"User not found"},{status:404});
        }
        const name = user.name;
        const email = user.email;
        return NextResponse.json({message:"User found!",user:{name:name,email:email,id:user._id}},{status:200});
    }catch(err:any){
        console.error(err);
        return NextResponse.json({error:"Server side error"},{status:500});
    }
}
 