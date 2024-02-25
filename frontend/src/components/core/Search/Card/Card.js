import React from 'react';
import { IoLogoModelS } from "react-icons/io";
import { FcFactoryBreakdown } from "react-icons/fc";
import { FaRupeeSign } from "react-icons/fa";

const Card = ({cardData,setModalData , setShowModal,setSelectedId}) => {

  const {name,image,model,manufacturer,rate} = cardData;
  return ( 
    <div className=' hover:scale-95 transition-all duration-300  cursor-pointer shadow-lg outline gap-5 outline-slate-200 md:flex-row flex flex-col-reverse mt-4 px-2 py-1 rounded-sm  md:items-center justify-between min-w-[90%]' >
     <div className=' flex justify-between  flex-col  m-0 md:pt-0 gap-3 md:gap-0'>
      <p className=' text-lg font-semibold capitalize'>{name}</p>
      <div className=" flex flex-col justify-between overflow-x-scroll gap-2 md:p-2  w-full">
          <p className=" flex  gap-2">
            <IoLogoModelS size={20} /> <span>{model}</span>{" "}
          </p>
          <p className=" flex  gap-2">
            <FcFactoryBreakdown size={20} /> {manufacturer}
          </p>
          <p className=" flex \ gap-2">
            <FaRupeeSign size={20} /> 
            { rate ? rate : "100"}/hr
          </p>
        </div>

      <div className=' flex gap-2  md:mb-2 py-2 '>
        <button onClick={()=>{
          setShowModal(true);
          
        }} className=' bg-green-700 text-white md:px-4 md:py-2 p-2 text-sm md:text rounded-md hover:bg-green-800 transition-all duration-300'>Book</button>
        <button onClick={() => {
            setSelectedId(cardData?._id);
            setModalData(cardData);
          }} className=' outline outline-slate-400 md:px-1  md:p-0 p-1 text-sm   md:text  rounded-md'>show more</button>
      </div>
     </div>
     <img src={image} className={` hover:scale-105 transition-all duration-300 cursor-pointer border w-[150px] h-[120px] mx-auto  md:m-0 rounded-sm object-cover`}  alt='img' />

    </div>
  )
}

export default Card