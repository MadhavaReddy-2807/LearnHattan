import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const space={
  rewardpool:"$2000",
  quests:[{
    title:"",
    pool:"$500",
    xp:"",
    slots:"",
    reward:"",
    overview:""

 ,
    outcome:"",
    problemstatement:"",
    submission:"",

  },{
    title:"",
    pool:"$500",
    xp:"",
    slots:"",
    reward:"",
    overview:""

 ,
    outcome:"",
    problemstatement:"",
    submission:"",

  },{
    title:"",
    pool:"$1000",
    xp:"",
    slots:"",
    reward:"",
    overview:""

 ,
    outcome:"",
    problemstatement:"",
    submission:"",

  }],
}
const Spaces = () => {
  const navigate=useNavigate();

  const [saved,setSaved]=useState(false);
  useEffect(()=>{
    getspaces();

  },[saved])
  const [spaces,setSpaces]=useState([])
  const getspaces=async()=>{
    const res=await fetch('http://localhost:3000/spaces');
    const data=await res.json();
    console.log(data);
    setSpaces(data);
  }
  const [title,setTitle]=useState("");
   const handlechange=(e)=>{
      setTitle(e.target.value)
   }
   const addspace=async ()=>{
    setSaved(true);
    const form={
      title:title,
      ...space,
      id:uuidv4()
    }
 
    const res=await fetch('http://localhost:3000/spaces',{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)})
    setTitle("");
    setSaved(false);
   }
   const addcontext=(id)=>{
    navigate(`/space/${id}/addcontext`);
  }
  const view=(id)=>{
    navigate(`/space/${id}/view`)
  }
  return (
    <>
          <div className='border border-gray-400 p-2 flex flex-col gap-5 py-5'>
            <span className='text-[32px] relative left-6 '>Space</span>
            <Input className=" border-gray-400 text-black w-[90%] h-[50px] mx-auto" value={title} name="title"placeholder="Title" onChange={handlechange}></Input>
            <div className='flex justify-end'>
            <Button onClick={addspace} className="w-[100px] border-gray-400 rounded border  relative right-5">Add space</Button></div>
          </div>
          <div className='mt-5 flex flex-col gap-2'>
            {spaces.map((item,index)=>(
              <div key={index} className='flex justify-between border border-gray-400 p-3'><span className='ml-4 text-[20px]'>{item.title}</span>
               <div className='flex gap-2'>
                <Button className="w-[100px]  border-gray-400 rounded border " onClick={()=>{addcontext(item.id)}}>Add Context</Button>
                <Button className="w-[100px]  border-gray-400 rounded border " onClick={()=>{view(item.id)}}>View</Button>
               </div>
              </div>
            ))}
          </div>
      </>
  )
}

export default Spaces