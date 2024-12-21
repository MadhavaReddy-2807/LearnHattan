import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
const Editvalue = () => {
     const [space,setSpace]=useState();
     const [quest,setQuest]=useState();
   const params=useParams();
   const handleChange=(e)=>{
    setQuest((prevQuest) => ({
        ...prevQuest,
        [e.target.name]: e.target.value,
      }));
   }
   const [saving,setSaving]=useState(false);
      useEffect(() => {
        const spacedetails = async () => {
          const res = await fetch(`http://localhost:3000/space?id=${params.spaceid}`)
          const data = await res.json();
          setSpace(data);
        //   console.log(data);
          setQuest(data.quests[params.index])
    
        };
        spacedetails();
      }, [params.spaceid,params.index])
      const save = async() => {
        setSaving(true)
        const updatedQuests = [...space.quests];
        updatedQuests[params.index] = quest;
        setSpace({ ...space, quests: updatedQuests });
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
        setSaving(false)

      };
      
  return (
    <div className='mx-auto my-auto'>
        <div className='border h-[80%] w-[80%] p-3 mt-14'>
             <span className='text-[30px]'>Quest Values</span>
             <div className='grid grid-cols- w-full justify-center justify-items-center ml-14'>
                <div className='w-[700px]  mx-auto'>
                    <label htmlFor="" className='text-md relative top-6 left-4 w-[80%] '>Exp:</label>
                    <Input name="xp" className='w-[100%] h-14 pt-3 text-[20px] ' onChange={(e)=>{
                        handleChange(e)
                    }} value={quest?.xp}/>
                </div>
                <div className='w-[700px] mx-auto'>
                    <label htmlFor="" className='text-md relative top-6 left-4 w-[80%]'>Winning Slots:</label>
                    <Input value={quest?.slots} name="slots" onChange={(e)=>{
                        handleChange(e)
                    }} className=' pt-3 w-[100%] h-14'/>
                </div>
                <div className='w-[700px] mx-auto'>
                    <label htmlFor="" className='text-md relative top-6 left-4 w-[80%] '>Quest Pool:</label>
                    <Input value={quest?.pool} readOnly={true} className='w-[100%]  pt-3 h-14'/>
                </div>
                <div className='w-[700px] mx-auto'>
                    <label htmlFor="" className='text-md relative top-6 left-4 w-[80%]'>Rewards:</label>
                    <Input value={quest?.reward} name="reward" onChange={(e)=>{
                        handleChange(e)
                    }} className='w-[100%]  pt-3 h-14'/>
                </div>
             </div>
             <div className='flex justify-end mt-11'>
                <Button onClick={save}>{saving?<Loader2 className='animate-spin'/>:"Save"}</Button>
             </div>
        </div>
    </div>
  )
}

export default Editvalue