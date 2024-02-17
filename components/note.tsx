"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { NoteCard } from "./note-card"
import { Bot, MessageCircleCode, PlusCircle, Text } from "lucide-react"
import { useDebugValue, useState } from "react"
import { Noteeditor } from "./note-editor"
import { ScrollArea } from "./ui/scroll-area"
import { Note } from "@prisma/client"
import { NoteReader } from "./note-reader-card"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

interface NotepageProps{
  notes:Note[];
}

export const Notepage=({notes}:NotepageProps)=>{

    const [isEditing,setisEditing]=useState(false);
    const [isopen,setisopen]=useState(false);
    const [currentId,setCurrentId]=useState<any>();
   const edit=()=>{
    setisEditing((curr)=>!curr);
   }
   const current=async(data:any)=>{    
     setCurrentId(data);  
     setisopen(true);    
   }
   const open=()=>{
    setisopen((curr)=>!curr)
   }
   return(
    <div>
{!isEditing  &&<Card>
  <CardHeader>
    <CardTitle className=" flex justify-between">
      <span>Notes...</span>
      {currentId && isopen && (
        <div>
         <Button variant="ghost"  size="sm">
          <Bot/>
         </Button>
         <Button variant="ghost"  size="sm">
         <MessageCircleCode />
         </Button>
        </div>
      )
      }
    </CardTitle>
    <CardDescription>Write a note to remember</CardDescription>
  </CardHeader>
      <ScrollArea>
  <CardContent className="h-60 ">
    <div className={ cn(
     !isopen &&
      "grid grid-cols-2 ml-3 gap-y-2",
      )}
    >     
       {!isopen ? ( notes.map((note,i)=>(
        <div
        onClick={()=>current(note)}
        key={note.id}>
          <NoteCard
           note={note}
           index={i}
          />
        </div>
       ))
       ):
       (
        <div className="w-[20rem] ">
        <NoteReader
        open={open}
         note={currentId}
         />
      </div>
       )
       }
      
     
    </div>

  </CardContent>
   </ScrollArea>
  <CardFooter className="justify-end">
 {  !isopen && <PlusCircle 
  onClick={()=>setisEditing(!isEditing)}
  className=" h-8 w-8 "/>
  }
  </CardFooter>
   </Card>
   }

   {isEditing && 
   <div className="">
   <Noteeditor
   editF={edit}/>
   </div>
   }
    </div>
   )
}