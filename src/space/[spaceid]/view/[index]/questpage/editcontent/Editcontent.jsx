import { Button } from '@/components/ui/button'
// import { textarea } from '@/components/ui/textarea'
import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
const Editcontent = () => {
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
              setQuest(data.quests[params.index])
        
            };
            spacedetails();
          }, [params.spaceid,params.index])
          const save = async () => {
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
    <div>
        <div className='border'>
            <span className='text-[32px] '>Table of contents</span>
            <div className='grid grid-cols-1 border p-2 m-2 gap-2'>
                <div className='border flex flex-col gap-2 p-2 rounded'>   
                    <div className='border text-[20px] p-1'>Overview</div>   
                    <textarea className='h-28 border p-2 text-wrap justify-start flex' placeholder="Description  " name="overview" onChange={handleChange} value={quest?.overview}/>              
                </div>
                <div className='border flex flex-col gap-2 p-2 rounded'>   
                    <div className='border text-[20px] p-1'>Learning Outcome</div>   
                    <textarea className='h-28 border p-2 justify-start flex' placeholder="Description  " name='outcome' onChange={handleChange} value={quest?.outcome}/>              
                </div>
                <div className='border flex flex-col gap-2 p-2 rounded'>   
                    <div className='border text-[20px] p-1'>Problem Statement</div>   
                    <textarea className='h-28 border p-2 justify-start flex' placeholder="Description " name='problemstatement'onChange={handleChange} value={quest?.problemstatement}/>              
                </div>
                <div className='border flex flex-col gap-2 p-2 rounded'>   
                    <div className='border text-[20px] p-1'>Submission</div>   
                    <textarea className='h-28 border p-2 justify-start flex' placeholder="Description " name='submission' onChange={handleChange} value={quest?.submission}/>              
                </div>

            </div>
            <div className='flex flex-row justify-end m-2'>
            <Button onClick={save}>{saving?<Loader2 className='animate-spin'/>:"Save"}</Button></div>
        </div>
    </div>
  )
}

export default Editcontent