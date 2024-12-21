import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom';

import { ArrowRightIcon } from 'lucide-react'
const View = () => {
        const navigate=useNavigate();
    
    const form = {
        rewardpool: "$2000",
        quests: [{
            title: "",
            pool: "$500",
            xp: "",
            slots: "",
            reward: "",
            overview: "",
            outcome: "",
            problemstatement: "",
            submission: "",

        }]
    }
    const params = useParams();
     const redirect=(index)=>{
        navigate(`/space/${params.spaceid}/view/${index}/questpage`)
     }
    const [space, setSpace] = useState(form);
    useEffect(() => {
        const spacedetails = async () => {
            const res = await fetch(`http://localhost:3000/space?id=${params.spaceid}`)
            const data = await res.json();
            setSpace(data);
            console.log(data);
        };
        spacedetails();
    }, [params.spaceid])
    return (
        <div className='mx-auto h-[60%] w-[80%] mt-5 border-2'>
            <div className='flex flex-row justify-between'>            <span className='text-[32px] ml-2'>Quests</span>
                <span className='text-[26px] mr-3'>Total Pool :$2000</span>
            </div>
            {/* <div className=' '> */}
            {space.quests.map((item, index) => (
                <div>
                <div className='border  mb-3 mt-3 m-3 flex flex-row'>
                    <div className='bg-[#D8A7DF] p-5 h-[180] w-[180px]'>
                    </div>
                    <div className='w-full'>
                    <div className='w-[100%] flex flex-row justify-between justify-items-center '>
                        <div className='ml-3 text-[30px]'>
                            {item?.title}
                        </div>
                        <div className='flex mt-3 justify-items-center justify-center '>
                            <Button className="" onClick={()=>{
                             redirect(index);
                            }}>{item.pool=="$500"?"Beginner":"Intermediate"}</Button> <ArrowRightIcon className='mt-1'/>  </div>
                            </div>
                             <div className='ml-2'>
                                <h3>Learning Outcomes</h3>
                                <p>{item?.outcome}</p>
                             <div className='flex justify-end'>
                                <div className='flex flex-col'>
                                <span className='text-[26px] '>{item.reward}</span>
                                <span className='mr-2'>{item.xp}</span>
                                </div>
                                </div>
                                </div>

                    </div>
                    <div></div>
                     <div>
                </div>                         
                     </div>
                     
                     </div>
                     
            ))}
            {/* </div> */}


        </div>
    )
}

export default View