import {NextResponse,NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req:NextRequest){
    const token = req.cookies.get("token");
    if(!token){
        return NextResponse.json({error:"No token provided"},{status:401});
    }

    try{
        const id : any = jwt.verify(token.value,process.env.JWT_SECRET!);
        const response = NextResponse.json({message:"Session deleted",user:{id:id}},{status:200});
        response.cookies.delete("token");
        return response;
    }catch(err:any){
        return NextResponse.json({error:"Server side error occurred"},{status:500});
    }
}
