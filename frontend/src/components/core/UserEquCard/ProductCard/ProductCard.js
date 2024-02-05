import React from "react";
import Button from "../../../common/Button/Button";
import { IoLogoModelS } from "react-icons/io";
import { FcFactoryBreakdown } from "react-icons/fc";
import { FaRupeeSign } from "react-icons/fa";

const ProductCard = ({cardData}) => {
    const {model,rate ,  manufacturer,image,name} = cardData;
  return (
    <div className=" relative bg-white w-[400px] flex justify-start items-center flex-col rounded-b-sm overflow-clip rounded-md">
      <img
        className=" max-w-full min-h-[250px] max-h-[250px]  object-cover"
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
            <FaRupeeSign size={20} /> 100 {rate}/hr
          </p>
        </div>
      </div>
      <div className=" flex justify-end w-[100%] gap-5 p-3">
        <Button backGroundColor={"bg-red-600"} title={"Delete"} />
        <Button title={"update"} />
      </div>
    </div>
  );
};

export default ProductCard;
