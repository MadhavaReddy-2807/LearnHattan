import Sidebar from '@/sidebar/Sidebar'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

// const space={
//   rewardpool:"",
//   quests:[{
//     title:"",
//     pool:"$500"
//   },{
// title:"",
// pool:"$500"
//   },{
// title:""
// ,pool:"$1000"
//   }],
  
// }
const Addcontext = () => {
    const navigate=useNavigate();
   const[saving,setSaving]=useState(false);
  const [space, setSpace] = useState({ rewardpool: "", quests: [] });
  const handleChange = (index, e) => {
    const updatedQuests = [...space.quests];
    updatedQuests[index].title = e.target.value;
    setSpace({ ...space, quests: updatedQuests });
  };
  
  const params=useParams()
  useEffect(()=>{
     const spacedetails=async()=>{
      const res=await fetch(`http://localhost:3000/space?id=${params.spaceid}`)
      const data=await res.json();
      setSpace(data);
      console.log(data);
     };
     spacedetails();
  },[params.spaceid])
  const save=async ()=>{
    setSaving(true);
    const res = await fetch('http://localhost:3000/spaces', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: params.spaceid,
        space
      })
    });
    navigate('/')
    setSaving(false);
  }
  return (
    <div className='mt-16 w-[80%] mx-auto'>
      {/* <Sidebar/> */}
      <div className="border p-5">
       <span className='text-[32px]'>Space Context</span>
        <div className='flex flex-col gap-5 mt-4 '>
          <label htmlFor="" className='-mb-10 ml-1 text-sm'>Total Reward pool:</label>
      <Input placeholder="Total Reward Pool" className=" border-2  h-[50px] text-[20px] pt-3"  value={space?.rewardpool} readOnly={true}/>
      <label htmlFor="" className='-mb-10 ml-1 text-sm'>Total quests:</label>
      <Input placeholder="Total Quests" value={space.quests?.length} readOnly={true} className="border-2 pt-3 text-[20px] h-[50px]" />
       {space?.quests?.map((item,index)=>(
        <div key={index} className='flex gap-3 '>
          <Input placeholder="Title" value={item?.title}  onChange={(e)=>{handleChange(index,e)}} className="w-[70%] text-[20px] h-[50px]"/>
          <label htmlFor=""></label>
          <Input className="w-[30%] text-[20px] h-[50px]" value={item?.pool} readOnly={true}/>
        </div>
       ))}
      </div>
      <div className='flex justify-end'>
       <Button className="mt-3" onClick={save}>{saving?<Loader2 className='animate-spin'/>:"Save"}</Button></div>
      </div>
    </div>
  )
}

export default Addcontext