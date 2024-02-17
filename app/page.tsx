import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/db";
import { TODOPage } from "@/components/TODO";
import { Notepage } from "@/components/note";


export default async function Home () {

const Task =await db.tODO.findMany({
  where:{
    userId:"1"
  },
 orderBy:{
  createdAt:"desc"
 }
});

const Notes =await db.note.findMany({
  where:{
    userId:"1"
  },
 orderBy:{
  createdAt:"desc"
 }
});


  return (
    <div  className=" flex items-center justify-center ">
<div >
  <h2 className="text-white text-3xl mt-11  font-extrabold  ">Notes......</h2>
<Tabs defaultValue="TODO" className=" mt-20 border border-white  ">
  <TabsList className=" md:w-[50rem]  bg-black/45 sm:w-[25rem] flex">
    <TabsTrigger value="TODO" className=" basis-1/2 ">TODO list</TabsTrigger>
    <TabsTrigger value="Notes" className="basis-1/2">Notes</TabsTrigger>
  </TabsList>
  <TabsContent value="TODO">
    <TODOPage  task={Task} />
  </TabsContent>
  <TabsContent value="Notes">
    
   <Notepage
   notes={Notes}/>
    
   </TabsContent>
</Tabs>
</div>
 </div>
  );
}
