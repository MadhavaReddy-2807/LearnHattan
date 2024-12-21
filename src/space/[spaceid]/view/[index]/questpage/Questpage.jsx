import React from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowBigDown, ArrowDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Questpage = () => {
          const navigate=useNavigate();
  const params = useParams();
  const [space, setSpace] = useState();
  const [quest, setQuest] = useState();
  useEffect(() => {
    const spacedetails = async () => {
      const res = await fetch(`http://localhost:3000/space?id=${params.spaceid}`)
      const data = await res.json();
      setSpace(data);
      // console.log(data);
      if(data?.quests)
      {
        setQuest(data?.quests[params.index])
      }

    };
    spacedetails();
  }, [params.spaceid,params.index])
  const editvalue=()=>{
    navigate(`/space/${params.spaceid}/view/${params.index}/questpage/editvalue`)
  }
  const editcontent=()=>{
    navigate(`/space/${params.spaceid}/view/${params.index}/questpage/editcontent`)
  }
  return (
    <div>
      <div className='border p-1 flex '>
        <div className='bg-[#D8A7DF] h-[150px] w-[150px]'>
        </div>
        <div className='w-full'>
          <div className='flex flex-row p-2 justify-between w-full'>
            <span className='text-[30px]'> {quest?.title}</span>
            <span> {quest?.pool=="$500"?<Button>Beginner</Button>:<Button>Intermediate</Button>}</span>
          </div>
          <div className='grid grid-cols-4 ml-3 mt-4 '>
            <div className='border h-[60px]'>
              <label htmlFor="" className='text-sm p-2'>Joinings:</label>
            </div>
            <div className='border h-[60px] flex flex-col ' >
              <label htmlFor="" className='text-sm p-2'>Reward:</label>
              <span className='text-[20px] -mt-3 ml-2'>{quest?.reward}</span>
            </div>
            <div className='border h-[60px] flex flex-col '>
              <label htmlFor="" className='text-sm p-2'>Winning slots:</label>
              <span className='text-[20px] -mt-3 ml-2'>{quest?.slots}</span>

            </div>
            <div className='border h-[60px] flex flex-col  '>                <label htmlFor="" className='text-sm p-2'>Exp:</label>
            <span  className='text-[20px] -mt-3 ml-2'>{quest?.xp}</span>
            </div>
          </div>
        </div>
      </div>
       <div>
        <div className='flex'>
         <div className='w-[70%]  mt-3 flex flex-col gap-4'>
            <div className='border '>
               <div className='border-2 p-1 flex flex-row justify-between text-[25px] '><span>Overview</span> <span className='mt-2'><ArrowDown/></span></div>
               <div className='border p-4 h-[150px]'>{quest?.overview}</div>
            </div>
            <div className='border h-fit'>
               <div className='border-2 p-1 flex flex-row justify-between text-[25px] '><span>Learning Outcome</span> <span className='mt-2'><ArrowDown/></span></div>
               <div className='border p-4 h-[150px]'>{quest?.outcome}</div>
            </div>
            <div className='border h-fit'>
               <div className='border-2 flex flex-row justify-between p-1 text-[25px] '><span>Problem Statement</span> <span className='mt-2'><ArrowDown/></span></div>
               <div className='border p-4 h-[150px]'>{quest?.problemstatement}</div>
            </div>
            <div className='border h-fit'>
               <div className='border-2 flex flex-row justify-between p-1 text-[25px] '><span >Submission</span> <span className='mt-2'><ArrowDown/></span></div>
               <div className='border p-4 h-[150px]'>{quest?.submission}</div>
            </div>
           
         </div>
         
         <div className='w-[30%] flex flex-col mt-3 gap-4'>
           <Button onClick={editvalue} className="w-[60%] mx-auto">Edit Value</Button>
           <Button onClick={editcontent} className="w-[60%] mx-auto">Edit Context</Button>
           <div className="w-[60%] mx-auto border p-3">
              <h3>Table of contents</h3>
              <div>
                <p>Overview</p>
                <p>Learning Outcome</p>
                <p>Problem Statement</p>
                <p>Submission</p>
              </div>
           </div>
         </div>
       </div>
       </div>
    </div>
  )
}

export default Questpage