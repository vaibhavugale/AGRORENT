import React from 'react'
import {motion} from "framer-motion";

const BookRequestMOdal = () => {
    const handelAccept =()=>{

    }
    const handelReject =()=>{
        
    }
  return (
    <div className=' w-[100vw] h-[100vh] bg-slate-500 flex justify-center  items-center '>
      <motion.div className=' bg-white md:w-[30%] w-[70%] h-[20%] flex justify-center items-center rounded-md -translate-y-[90%]'>
      <div >
      <button className=' bg-green-600 px-3 text-white m-2 rounded-sm py-1 hover:bg-green-700 transition-all duration-200'>Accept</button>
        <button className=' bg-red-600 px-3 text-white m-2 rounded-sm py-1 hover:bg-red-700 transition-all duration-200'>Reject</button>
      </div>
      </motion.div>
    
    </div>
  )
}

export default BookRequestMOdal