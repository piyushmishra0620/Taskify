import jwt from "jsonwebtoken";
import {NextRequest,NextResponse} from "next/server";

export async function proxy(req:NextRequest){
    const token = req.cookies.get("token");
    if(!token){
        if(req.nextUrl.pathname!="/"){
            return NextResponse.redirect(new URL("/login",req.url));
        }
        return NextResponse.next();
    }
    try{
        const decoded : any = jwt.verify(token.value,process.env.JWT_SECRET!);
        if(!decoded){
            if(req.nextUrl.pathname!="/"){
                return NextResponse.redirect(new URL("/login",req.url));
            }
            return NextResponse.next();
        }
        return NextResponse.next().headers.set("x-user-id",decoded.id);
    }catch(err:any){
        console.error(err);
        return NextResponse.json({error:"Server side error occurred"},{status:500});
    }
}

export const config = {
    matcher:["/","/dashboard","/tasks"]
}
