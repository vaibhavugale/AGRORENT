import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sup from "../../components/common/Sup/Sup";
import ImagePreview from "../common/ImagePreview/ImagePreview";
import Button from "../common/Button/Button";
import noimagesvg from "../../assets/noimagesvg.svg";
import { RxCross2 } from "react-icons/rx";
import {useForm} from "react-hook-form"
import { registeredEquip } from "../../api/equipmentApi";
const AddEquipment = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [disabled,setDisabled] = useState(false);
  const token = useSelector((state)=>state.userSlice.token);
  const socketID = useSelector((state)=>state.userSlice.socketID);
 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onChoose = (e) => {
    setData(e.target.files[0]);
  };
  const submitHandler = (data) =>{
    const formData = new FormData();
    data.socketID = socketID;
    formData.append("image",data?.image[0]);
    formData.append("data",JSON.stringify(data));
    
    dispatch(registeredEquip(formData,reset,setData,setDisabled,token));
  }
  return (
    <div className=" w-full  bg-formBg-100 flex justify-center md:h-[1200px] overflow-scroll">
      <form onSubmit={handleSubmit(submitHandler)} className=" bg-white shadow-lg md:max-w-[90%] mt-16 md:max-h-[90%] mb-16 md:mb-0 rounded-sm p-5">
        <div className=" flex flex-row justify-center items-center">
          <p className=" font-semibold w-full text-2xl">
            Registered Your Equipment
          </p> 
          <Button  className={" w-[30%]"} disabled={disabled} title={"Register"} />
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6  p-5 items-center justify-center outline  outline-green-600 rounded-sm grid-rows-auto mt-10">
          <div className="  p-2">
            <p className=" tracking-wide">
              {" "}
              Name <Sup>*</Sup>

             {errors.name &&  <span className=" text-xs text-red-700">This is required</span>}
            </p>
            <input
              type="text"
              {...register("name" ,{required:true})}
              className=" outline  font-semibold  rounded-sm mt-2 px-2 p-2  outline-formBg-100 w-full "
            />
          </div>
          <div className="  p-2">
            <p className=" tracking-wide">
              Type <Sup>*</Sup>

             {errors.type &&  <span className=" text-xs text-red-700">This is required</span>}
            </p>
            <select {...register("type",{required:true})} className=" outline  font-semibold  font-sans rounded-sm mt-2 px-2 p-2  outline-formBg-100 w-full ">
              <option defaultValue={"vehicle"}>Vehicles </option>
              <option defaultValue={"cultivator"}>cultivator</option>
              <option defaultValue={"speeder"}>speeder</option>
              <option defaultValue={"sprayer"}>Sprayer</option>
              <option defaultValue={"harvester"}>Harvester</option>
            </select>
          </div>
          <div className="  p-2">
            <p className=" tracking-wide">
              {" "}
              Manufacturer<Sup>*</Sup>

             {errors.manufacturer &&  <span className=" text-xs text-red-700">This is required</span>}
            </p>
            <input
              type="text"
              {...register("manufacturer",{required:true})}
              className=" outline  font-semibold  rounded-sm mt-2 px-2 p-2  outline-formBg-100 w-full "
            />
          </div>
          <div className="  p-2">
            <p className=" tracking-wide">
              Model <Sup>*</Sup>

             {errors.model &&  <span className=" text-xs text-red-700">This is required</span>}
            </p>
            <input
              type="text"
              {...register("model",{required:true})}
              className=" outline  font-semibold  rounded-sm mt-2 px-2 p-2  outline-formBg-100 w-full "
            />
          </div>
          <div className="  p-2">
            <p className=" tracking-wide">
              Year<Sup>*</Sup>

             {errors.year &&  <span className=" text-xs text-red-700">This is required</span>}
            </p>
            <input
              type="number"
              {...register("year",{required:true})}
              min="1900"
              max="2099"
              step="1"
              className=" outline  font-semibold  rounded-sm mt-2 px-2 p-2  outline-formBg-100 w-full "
            />
          </div>
          <div className="  p-2">
            <p className=" tracking-wide">Capacity (Optional)</p>
            <input
              type="text"
              {...register("capacity")}
              className=" outline  font-semibold  rounded-sm mt-2 px-2 p-2  outline-formBg-100 w-full "
            />
          </div>
          <div className="  p-2">
            <p className=" tracking-wide">Feature (Optional)</p>
            <input
              type="text"
              {...register("feature")}
              className=" outline  font-semibold  rounded-sm mt-2 px-2 p-2  outline-formBg-100 w-full "
            />
          </div>
          <div className="  relative p-2">
            <p className=" tracking-wide">
              Image<Sup>*</Sup>

             {errors.image &&  <span className=" text-xs text-red-700">This is required</span>}
            </p>
            <input
              type="file"
              {...register('image',{required:true})}
              onChange={(e) => onChoose(e)}
              className=" outline  font-semibold  rounded-sm mt-2 px-2 p-2  outline-formBg-100 w-full "
            />
            {data && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                
                  reset();
                  setData(null);
              
                }}
                className=" absolute  hover:cursor-pointer top-[55px] left-[90%]"
              >
                <RxCross2 />
              </div>
            )}
          </div>
          <div className="  p-2">
            <p className=" tracking-wide">
              {" "}
              Rate/hr (Rs)<Sup>*</Sup>
              {errors.rate &&  <span className=" text-xs text-red-700">This is required</span>}
            </p>
            <input
              type="text"
              {...register("rate",{required:true})}
              className=" outline  font-semibold  rounded-sm mt-2 px-2 p-2  outline-formBg-100 w-full "
            />
          </div>
        </div>

        <div className=" flex justify-center  min-h-[30vh] items-center mt-3  outline-slate-500 outline-dashed rounded-md p-4 outline-[2px] ">
          {data ? (
            <ImagePreview
              data={data}
              className={"max-w-[300px] md:max-w-[450px] relative rounded-md object-cover"}
            />
          ) : (
            <div>
              {" "}
              <p className=" text-center text-2xl">No Image selected</p>
              <img src={noimagesvg} className=" w-[200px]" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEquipment;
