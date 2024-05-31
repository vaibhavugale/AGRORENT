import React, { useState } from "react";
import { motion } from "framer-motion";
import { sendAcceptRequest, sendRejectRequest } from "../../../api/bookingApi";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
const BookRequestMOdal = () => {
  const { id } = useParams();
  const [accepted, setAccepted] = useState(false);
  const handelAccept = () => {
    setAccepted(!accepted);
    sendAcceptRequest(id, toast,setAccepted);
  };
  const handelReject = () => {
    setAccepted(!accepted);
   sendRejectRequest(id,toast,setAccepted);
  };
  return (
    <div className=" w-[100vw] h-[100vh] bg-slate-500 flex justify-center  items-center ">
      <motion.div className=" bg-white md:w-[30%] w-[70%] h-[20%] flex justify-center items-center rounded-md -translate-y-[90%]">
        {!accepted ? (
          <div>
            <button
              onClick={handelAccept}
              className=" bg-green-600 px-3 text-white m-2 rounded-sm py-1 hover:bg-green-700 transition-all duration-200"
            >
              Accept
            </button>
            <button className=" bg-red-600 px-3 text-white m-2 rounded-sm py-1 hover:bg-red-700 transition-all duration-200">
              Reject
            </button>
          </div>
        ) : (
          <div className="">
          
         <motion.div
            className="box"
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 180, 180, 360],
              borderRadius: ["50%", "50%", "50%", "50%", "0%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeatDelay: 1,
            }}
          >
            <FcApproval size={90} />

          </motion.div>
           <Link to={"/"}>Back to Home</Link>
         </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookRequestMOdal;
