import React, {useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
const Home = () => {
  const [cond, setcond] = useState(false)
  const showAdd =()=>{
    setcond(true)
  }
  const showCancel =()=>{
    setcond(false)
  }
  const handleform = async()=>{
    const res =  await axios.post()
    setcond(false)
  }
  return (
    <div class="container">
      <div className='mt-9 w-full md:w-1/2 mx-auto'>
        {!cond && <a onClick={showAdd} className='cursor-pointer hover:text-red-400  d-flex '>
<AiOutlinePlus className='mx-4 hover:bg-red-400 hover:rounded-full'/>
<button className='cursor-pointer hover:text-red-400'>Add Task</button>
</a>}
        
 
{cond  && <div className='w-full relative '>

<form  className="p-2 w-full">

 
          <div className="   p-3 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ">

             
            <input type="text" id="name" placeholder='Task name' className='border-none bg-transparent outline-none'/> <br/>
            <textarea   placeholder='description' className='w-full border-none bg-transparent outline-none'/>
            
          </div>
        
</form>
<div className='absolute    right-0 '>
 <button onClick={showCancel} className=' text-white bg-red-400 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm'>Cancel</button> <button onClick={handleform} className='  text-white bg-red-400 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm '>Add Task</button></div></div>}
      </div>

</div>
  )
}

export default Home