import { Note } from "@prisma/client"
import { Preview } from "./preview";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeftCircle, Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


interface NoteReaderProps{
    note:Note;
 open:()=>void
}  

export const NoteReader=({note,open}:NoteReaderProps)=>{

    const router=useRouter();

    const onClick=async()=>{
      console.log(note.id)
          await axios.delete(`/api/note/${note.id}`)
         toast.success("successfully deleted")
         router.refresh();
         open();
      }
    return(
        <ScrollArea>
        <div className="w-max-[30rem] " >
       <span className="flex justify-between">
        <ArrowLeftCircle
        onClick={open}/>
        <Trash 
         onClick={onClick}
        className=" h-4 text-red-600 z-50"/>
</span>
           <Preview 
             value={note.text}
            />     
        </div>
        </ScrollArea>
    )
}