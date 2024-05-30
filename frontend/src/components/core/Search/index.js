import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import Section from "./Section/Section";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import {motion,AnimatePresence} from "framer-motion";
import ShowMoreCard from "../UserEquCard/ShowMoreCard/ShowMoreCard";
import {useForm} from "react-hook-form"
import { sendBookRequest } from "../../../api/bookingApi";
import {useNavigate} from "react-router-dom"


const Index = () => {
  const [showIndexAccordion, setShowIndexAccordion] = useState(true);
  const allEqu = useSelector((state) => state?.equSlice?.allEqu);
  const user = useSelector((state)=>state.userSlice.userData);
  const [filterData, setFilterData] = useState(allEqu);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modalData,setModalData] = useState(null);
  const [equID,setEquID]  = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setFilterData(allEqu);
  }, [allEqu]);
  const handelSearch = (e) => {
    let searchValue = e.target.value.toLowerCase();
    if (!searchValue) setFilterData(allEqu);
    else {
      const filter = allEqu.filter((data) => {
        return (
          data.name.toLowerCase().includes(searchValue) ||
          data.type.toLowerCase().includes(searchValue) ||
          data.manufacturer.toLowerCase().includes(searchValue)
        );
      });
      setFilterData(filter);
    }
  };

  const handelCancel = () => {
    setShowModal(!showModal);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handelBooking = (data) => {
  

    if(!user){
     navigate("/login");
     return ;
    }else{
      setShowModal(!showModal);
      data["eupID"] = equID;
      setEquID(null);
      // console.log(data);
      sendBookRequest(data,toast);
    }
    
    

  };

  return (
    <div className=" relative  min-w-[100dvw] mx-auto min-h-[100dvh] p-4 overflow-scroll">
      {/* search box */}
      <div className=" md:w-[60%] flex px-2 justify-between md:p-3  mx-auto  rounded-sm bg-white shadow-lg md:rounded-md">
        <div className=" flex justify-between items-center w-full gap-2 ">
          <CiSearch size={30} className=" md:block hidden" />
          <input
            onChange={debounce(handelSearch, 500)}
            className=" outline-none text-slate-500 w-full font-mono text-sm p-2   md:text-lg "
            placeholder="Search Equipment"
          />
        </div>
        <div className=" flex justify-center items-center gap-2">
          <button className=" font-semibold md:text-xl tracking-wide text-black md:text-slate-100 transition-all duration-500 md:px-3 md:py-1 md:rounded-md md:bg-slate-400 md:hover:bg-slate-950 ">
            <span className="md:block hidden">search</span>{" "}
            <CiSearch size={20} className=" md:hidden   block" />
          </button>
          <abbr title="filter">
            {/* <button><CiFilter size={30} /></button> */}
          </abbr>
        </div>
      </div>

      <Section
        filterData={filterData}
        setShowModal={setShowModal}
        showIndexAccordion={showIndexAccordion}
        setShowIndexAccordion={setShowIndexAccordion}
        setSelectedId={setSelectedId}
        setModalData={setModalData}
        setEquID={setEquID}
      />

      <Transition
        show={showModal}
        enter="transition-opacity duration-500"
        enterFrom="opacity-10"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          // onClick={(e) => setShowModal(false)}
          className={`  backdrop-blur-sm  flex justify-center items-center bottom-0 right-0 left-0 top-0 z-20 absolute`}
        >
          <div className="     bg-slate-200 mx-auto w-[90%] md:w-[30%] md:min-h-[20%] shadow-2xl  -mt-[450px] rounded-md">
            <form onSubmit={handleSubmit(handelBooking)}>
            <p className=" text-center text-2xl py-5">Confirm Booking ? </p>
            <div className=" flex flex-col p-5">
              <label>Address</label>
              <textarea  {...register("address",{required:true})} className=" p-3"  placeholder="Type Delivery Address"/>
              {errors.address && <p className=" text-sm text-red-700">This is required</p>}
            </div>
            <div className=" flex  justify-center gap-2  mb-3 ">
              <label>How many hour?</label>
              <input type="number" className=" w-[20%] px-2 rounded-sm" {...register("hour",{required:true})}  placeholder="2" />
              {errors.hour && <p className=" text-sm text-red-700">This is required</p>}
            
              
            </div>
            <div className=" md:w-full  flex-row flex justify-around p-2">
              <button
                type="submit"
                className=" bg-green-700  w-[100px]  md:min-w-[100px] transition-all duration-200 p-3 rounded-md text-white cursor-pointer hover:bg-green-800"
              >
                Confirm
              </button>
              <button
                onClick={handelCancel}
                className=" bg-red-500  w-[100px]  md:min-w-[100px]  transition-all duration-200 p-3 rounded-md text-white cursor-pointer hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
            </form>
          </div>
        </div>
      </Transition>




      <AnimatePresence>
  {selectedId && (
    <motion.div layoutId={selectedId} className=' absolute  flex justify-center top-0 left-0 w-full h-full bg-slate-600 bg-opacity-45 ' onClick={()=>setSelectedId(null)}>
       <ShowMoreCard data={modalData} setSelectedId={selectedId} />
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default Index;
