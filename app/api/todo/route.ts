import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(
    req:Request
) {
    try{
      const userId= "1";

      const {Text}=await req.json();
      if(!userId){
        return new NextResponse("unauthorized",{status:401})
       }

       const task=await db.tODO.create({
        data:{
            userId,
            Text
        }
       })
   return NextResponse.json(task);
    }catch(error){
        console.log("[TODO]",error)
        return new NextResponse("internal error",{status:500}) 
    }
}