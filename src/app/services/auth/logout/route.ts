import {NextResponse,NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req:NextRequest){
    const token = req.cookies.get("token");
    if(!token){
        return NextResponse.json({message:"No token provided"},{status:401});
    }

    try{
        const id : any = jwt.verify(token.value,process.env.JWT_SECRET!);
        NextResponse.next().cookies.delete("token");
        return NextResponse.json({message:"Session deleted",user:{id:id}},{status:200});
    }catch(err:any){
        return NextResponse.json({message:"Invalid or expired token"},{status:401});
    }
}
