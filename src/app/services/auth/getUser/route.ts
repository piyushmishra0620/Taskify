import {NextRequest,NextResponse} from "next/server";
import {ObjectId} from "mongodb";
import {Users} from "@/lib/schema";

export const dynamic = 'force-static';

export async function GET(req:NextRequest){
    const userId = req.headers.get("x-user-id");
    if(!userId){
        return NextResponse.json({error:"Bad request"},{status:400});
    }
    try{
        const user = await Users.find({_id:new ObjectId(userId)}).toArray();
        if(!user){
            return NextResponse.json({error:"User not found"},{status:404});
        }
        const name = user[0].name;
        const email = user[0].email;
        return NextResponse.json({user:{name:name,email:email}},{status:200});
    }catch(err:any){
        console.error(err);
        return NextResponse.json({error:"Server side error"},{status:500});
    }
}
