import {NextResponse,NextRequest} from "next/server";

export async function GET(req:NextRequest){
    const token = req.headers.get("token");
    if(token){
        NextResponse.next().cookies.delete("token");
    }
    return NextResponse.json({message:"Session deleted"},{status:200});
}
