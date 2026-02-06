import {NextRequest,NextResponse} from "next/server";
import {tasks} from "@/lib/dbSchemas/tasks";
import {ObjectId} from "mongodb";

export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){
    const slug = params.id;
    const data = await req.json();
    try{
        const document =  await tasks.findOneAndUpdate({_id:new ObjectId(slug)},{$set:data},{returnDocument:"after"});
        return NextResponse.json({message:"Successfully updated the document",data:{name:document?.taskName,date:document?.date,targetDay:document?.deadline,stages:document?.subtasks,status:document?.currentStatus,createdAt:document?.createdAt,id:document?._id,userId:document?.userId}},{status:200});
    }
    catch(err:any){
        console.error(err);
        return NextResponse.json({error:{message:"Server Side Error occurred."}},{status:500});
    }
}

export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    const slug = params.id;
    try{
        await tasks.deleteOne({_id: new ObjectId(slug)});
        return NextResponse.json({message:"Task successfully deleted."},{status:200});
    }catch(err:any){
        console.error(err);
        return NextResponse.json({error:{message:"Server Side Error occurred."}},{status:500});
    }
}
