import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import Section from './Section/Section';
import { useSelector } from 'react-redux';
import {toast} from "react-hot-toast"


const Index = () => {
    const [showIndexAccordion,setShowIndexAccordion] = useState(false);
    const allEqu = useSelector((state)=>state?.equSlice?.allEqu);
    const [filterData,setFilterData] = useState(allEqu);
    const [showModal,setShowModal] = useState(false);
    useEffect(()=>{
      setFilterData(allEqu);
    },[allEqu])
    const handelSearch =  (e) =>{
      let searchValue = e.target.value.toLowerCase();
      if(!searchValue) setFilterData(allEqu);
      
      else{
           const filter = allEqu.filter((data)=> {
           
            return data.name.toLowerCase().includes(searchValue) || data.type.toLowerCase().includes(searchValue) ||   data.manufacturer.toLowerCase().includes(searchValue)
          
        
        });
        setFilterData(filter);    
       
      }
     
      
    }
  const handelCancel = () =>{
    setShowModal(!showModal);

  }
  const handelBooking = () =>{
    setShowModal(!showModal);
    toast.success("Request sent Successfully")
  }
  return (
    <div className=' relative  min-w-[100dvw] mx-auto min-h-[100dvh] p-4 overflow-scroll' >
       
       {/* search box */}
       <div  className=' md:w-[60%] flex px-2 justify-between md:p-3  mx-auto  rounded-sm bg-white shadow-lg md:rounded-md'>
          <div className=' flex justify-between items-center gap-2 '>
          <CiSearch size={30} className=' md:block hidden' />
            <input onChange={handelSearch} className=' outline-none text-slate-500 w-full font-mono text-sm p-2   md:text-lg '  placeholder='Search Equipment'/>
          </div>
          <div className=' flex justify-center items-center gap-2'>
            <button className=' font-semibold md:text-xl tracking-wide text-black md:text-slate-100 transition-all duration-500 md:px-3 md:py-1 md:rounded-md md:bg-slate-400 md:hover:bg-slate-950 ' ><span className="md:block hidden">search</span>   <CiSearch size={20} className=' md:hidden   block' /></button>
           <abbr title='filter'>
           {/* <button><CiFilter size={30} /></button> */}
           </abbr>
          </div>
         
       </div>
       
        <Section filterData={filterData} setShowModal={setShowModal}  showIndexAccordion={showIndexAccordion}  setShowIndexAccordion={setShowIndexAccordion}/>


       {showModal &&  <div className=' bg-slate-100 flex justify-center items-center bottom-0 right-0 left-0 top-0 w-[100vw] md:h-[100vh] z-20 absolute'>
           <div className=' bg-white mx-auto w-[90%] md:w-[30%] md:h-[20%] shadow-lg  -mt-[450px] rounded-md'>
              <p className=' text-center text-2xl py-5'>Confirm Booking </p>
              <div className=' md:w-full  flex-row flex justify-around p-2'>
                  <button onClick={handelBooking} className=' bg-green-700  w-[100px]  md:min-w-[100px] transition-all duration-200 p-3 rounded-md text-white cursor-pointer hover:bg-green-800'>Confirm</button>
                  <button onClick={handelCancel} className=' bg-red-500  w-[100px]  md:min-w-[100px]  transition-all duration-200 p-3 rounded-md text-white cursor-pointer hover:bg-red-700'>Cancel</button>
                 
              </div>
           </div>
        </div>}
      

    </div>
  )
}

export default Index;