import React from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate=useNavigate();
    const spaces=()=>{
        navigate('/spaces')
    }
    return (
        <>
            <div className='w-[329px] h-[1117px] border-[1px] border-black'>
                <div className=' hover:cursor-pointer top-5 relative flex justify-center'>
                    <div className='flex  w-[297px] h-[62px] top-[26px] left-[14px] font-semibold border rounded justify-center  border-gray-300 text-[32px] '>LearnHattan</div></div>
                <span  onClick={spaces} className='hover:cursor-pointer relative top-5 left-4 w-[112px]h-[39px] text-[32px] '>Spaces</span>
            </div></>
    )
}

export default Sidebar