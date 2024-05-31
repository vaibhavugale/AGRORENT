import React from "react";
import Button from "../../../common/Button/Button";
import { IoLogoModelS } from "react-icons/io";
import { FcFactoryBreakdown } from "react-icons/fc";
import { FaRupeeSign } from "react-icons/fa";

const ProductCard = ({cardData,setEquID,setModal}) => {
    const {model,rate ,  manufacturer,image,name,_id} = cardData;
  return (
    <div className=" relative bg-white md:w-[350px] flex justify-start items-center flex-col rounded-b-sm overflow-clip rounded-md">
      <img
        className=" max-w-full md:min-h-[250px] md:max-h-[250px] w-[300px]  object-cover"
        src={image}
        alt="img"
      />
      <div className=" w-full px-2  mt-1">
        <p className="  font-semibold tracking-wide text-3xl">{name}</p>
        <ul className="list-disc list-outside font-semibold text-slate-500 pl-5 my-2">
          <li>Type</li>
          <li>Features</li>
          <li>Capacity</li>
        </ul>
        <div className=" flex flex-row justify-between overflow-x-scroll  w-full">
          <p className=" flex justify-center items-center gap-2">
            <IoLogoModelS size={20} /> <span>{model}</span>{" "}
          </p>
          <p className=" flex justify-center items-center gap-2">
            <FcFactoryBreakdown size={20} /> {manufacturer}
          </p>
          <p className=" flex justify-center items-center gap-2">
            <FaRupeeSign size={20} />  {rate}/hr
          </p>
        </div>
      </div>
      <div className=" flex justify-end w-[100%] gap-5 p-3">
        <button onClick={(e)=>{
          e.stopPropagation();
          setEquID(_id);
          setModal(true);
        }} className= {` p-2 hover:bg-red-700 transition-all duration-300 text-white bg-red-600 font-semibold rounded-md  cursor-pointer`} >Delete</button>
        {/* <Button title={"update"} /> */}
      </div>
    </div>
  );
};

export default ProductCard;
