"use client"
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { PlusCircle, PlusCircleIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react"
import { Button } from "./ui/button";
import TODOForm from "./TODO-form";


import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { TODO } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";


interface TODOProps{
  task:TODO[]
}


export const TODOPage =({task}:TODOProps)=>{
const router=useRouter();

    const [isEditing,setisEditing]=useState(false);
    const [isMounting,setisMounting]=useState(false);

    const Edit =()=>{
       setisEditing((curr)=>!curr);
    }

    useEffect(()=>{
      setisMounting(true);
    },[])


    if(!isMounting){
        return;
    }


    const done=async(todoId:string)=>{
      try{
         const isdone=await axios.post(`/api/todo/${todoId}`)
         toast.success("updated Successfully")
         router.refresh();
        }

         catch{
          console.log("internal error")
         }
    }

    const Delete=async(todoId:string)=>{
      try{
         const isdone=await axios.delete(`/api/todo/${todoId}`)
         toast.success("deleted Successfully")
         router.refresh();
        }
      
         catch{
          console.log("internal error")
         }
    }

   return(
    <div className="">
{!isEditing && <div>
<Card>
<CardHeader>
<CardTitle className=" flex justify-between">
<h1>Your TODO List</h1>
<Button 
disabled={isEditing}
onClick={Edit}
variant="ghost"
className=" text-sm  font-light flex ">
        <>
        <PlusCircle className='h-4 w-4 mr-2'/>
            Add Task
        </>   
</Button>
</CardTitle>
<CardDescription>you can add or remove tasks</CardDescription>
</CardHeader>
<ScrollArea>
<CardContent className=" h-60">
{
  task?.map((todo:any)=>(
    <p
    key={todo.id}
     className="   mb-3  ">
     <div className=" flex space-x-3 justify-between" >
    <div>
    <Checkbox
    defaultChecked={todo.status}
    onClick={()=>done(todo.id)}
    /> 
    <label className={cn(
  todo.status &&  " line-through"
    )} > {todo.Text} </label>
    </div>
    <Trash 
     onClick={()=>Delete(todo.id)}
    className=" h-4 w-4 text-red-400"/>
    </div>
    </p>
  ))

}
</CardContent>
</ScrollArea>
<CardFooter>
<p></p>
</CardFooter>
</Card>
</div>}
{isEditing && 
  <div>
    <TODOForm
     edit={Edit}
    />
  </div>
}
    </div>
   )
}

