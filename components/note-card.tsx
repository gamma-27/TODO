
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Note } from "@prisma/client"
import { Preview } from "./preview"
import { Trash } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

  
  interface NoteCardProps{
    note:Note
    index:number
  }



export const NoteCard=({note,index}:NoteCardProps)=>{
  const router=useRouter();


return(
    <div className="">
<Card className="hover:bg-slate-100 h-[7rem] w-[8rem]"
> 
  <CardHeader>
    <CardTitle className=" text-sm flex justify-between mt-0 truncate">
      <span>Note {index +1}</span>
     
     </CardTitle>
    <CardDescription className="truncate text-xs">{note.createdAt.toISOString()}</CardDescription>
  </CardHeader>  
</Card>

    </div>
)
}

