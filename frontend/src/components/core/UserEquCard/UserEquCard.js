import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductCard from './ProductCard/ProductCard';
import {motion,AnimatePresence} from "framer-motion";
import ShowMoreCard from './ShowMoreCard/ShowMoreCard';
import { DeleteEquipment } from '../../../api/equipmentApi';
import { useSelector } from 'react-redux';
const UserEquCard = () => {
    const { location, user } = useOutletContext();
    const [selectedId, setSelectedId] = useState(null);
    const [modalData,setModalData] = useState(null);
    const [equID,setEquID] = useState(null);
    const [modal,setModal] = useState(false);
    const socketID = useSelector((state)=>state.userSlice.socketID);

    function handelDelete(eupID){
     DeleteEquipment(equID,socketID); 
     setModal(false);
    }
  return (
   <section className=' relative  w-full bg-slate-200'>
     <p className=" p-5 tracking-widest">{location?.pathname}</p>
     <div className=' w-full h-min grid  md:grid-cols-3  grid-cols-1 gap-5  p-5'>

        {
          user?.equipments.map((cardData,index)=> (<motion.div key={index} layoutId={cardData?._id} onClick={() => {
            setSelectedId(cardData?._id);
            setModalData(cardData);
          }}>
          <ProductCard key={cardData?._id}   layoutId={cardData?._id} setModal={setModal} setEquID={setEquID} cardData={ cardData} />
          </motion.div>))
        }
     
        <AnimatePresence>
  {selectedId && (
    <motion.div layoutId={selectedId} className=' absolute  flex justify-center top-0 left-0 w-full h-full bg-slate-600 bg-opacity-45 ' onClick={()=>setSelectedId(null)}>
       <ShowMoreCard data={modalData} setSelectedId={selectedId} />
    </motion.div>
  )}
</AnimatePresence>

   {modal && <AnimatePresence>
      <motion.div className=' absolute  flex justify-center top-0 left-0 w-full md:h-full   bg-slate-600 bg-opacity-45'>
          <motion.div className=' bg-white gap-3 h-min translate-y-2/3 flex  rounded-sm flex-col   p-2 w-[250px]'>
          <p>Are you sure?</p>
            <div className=' flex justify-between'>
            <button onClick={handelDelete} className=' bg-red-600   px-2 py-1 text-white  font-bold rounded-md '>Confirm</button>
             <button onClick={()=>
             {
              setModal(false);
              setEquID(null);
             }} className=' bg-green-600   px-2 py-1 text-white  font-bold rounded-md '>Cancel</button>
            </div>
          </motion.div>
      </motion.div>
   </AnimatePresence>}
        
    </div>
   </section>
  )
}

export default UserEquCard