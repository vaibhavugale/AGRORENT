import React from "react";
import johnDeere from "../../assets/images/jonn-deere-tractor.png";
import { IoCubeOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import logo from "../../assets/logo.png"


const Home = () => {
  return (
    <div>
      {/* Heading section */}
      <div className=" flex justify-center items-center ">
         <div className="md:w-[1080px] flex justify-between md:flex-row flex-col p-5 gap-5 items-center  ">
              {/* Heading */}
          <div className=" p-3">
          <p className=" font-sans text-4xl font-bold">Rent Pe Equipment chahiye Aajao boss dila dunga!!!</p>
          <p className=" mt-5 font-sans text-xl">Rent the Best Farming Equipment</p>
          <div className=" mt-10 flex gap-6">
            <button className=" bg-green-700 rounded-md  border-none p-3  font-bold text-johnYellow-100">Get Started</button>
            <button className=" flex   justify-between font-semibold gap-1 items-center ">Learn more <IoIosArrowRoundForward  size={25} /> </button>
          </div>
          </div>

          {/* Image and blob */}
          <div className="relative">
          <svg
            className=" md:w-[600px] md:h-[600px] w-[100vw] h-[40vh]  -mt-3 md:-mt-[50px]"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#24A148"
              d="M41.7,-46.4C56.5,-37.2,72.7,-26.4,79.8,-10.5C86.8,5.4,84.6,26.5,75.2,44.1C65.8,61.7,49.3,75.8,29.9,83.3C10.6,90.8,-11.6,91.7,-26.1,81.9C-40.6,72.2,-47.5,51.8,-53.1,34.4C-58.7,16.9,-63.2,2.5,-60.9,-10.8C-58.6,-24.1,-49.7,-36.4,-38.4,-46.2C-27.2,-56,-13.6,-63.3,-0.1,-63.2C13.4,-63.1,26.8,-55.5,41.7,-46.4Z"
              transform="translate(100 100)"
            />
          </svg>
          <img src={johnDeere} className="absolute md:w-[400px] w-[70vw] md:top-[200px] top-28  md:left-[70px] left-[30px] "  alt="tractor-img"/>
          </div>
         </div>
      </div>

      {/* Features */}
      <div className=" bg-green-700 text-white flex justify-center items-center w-full px-4 py-[50px]">
        <div >
        {/* heading in Feature section */}
          <div className=" text-center">
            <p>Features</p>
            <p className=" text-3xl">Unlock the Benefits of Farming Rental</p>
          </div> 
          {/*grid layout*/}
          <div className=" grid md:w-[1080px]  md:grid-cols-2 md:grid-rows-2  grid-cols-1 grid-rows-1 text-black   items-center  mt-[50px]  gap-5 ">
            <div className=" flex  gap-4  hover:scale-110 transition-all duration-300  cursor-pointer  justify-evenly items-center shadow-lg shadow-green-800  bg-white rounded-md  px-4  py-8">
            <IoCubeOutline size={25} />
            <div className=" flex flex-col gap-1">
              <p className=" font-sans  text-lg">Flexible Rental options</p>
              <p className=" text-sm">Choose from variety of rental duration to suite your farming needs</p>
            </div>
            
            </div>
            <div  className=" flex gap-4 hover:scale-110 transition-all duration-300   cursor-pointer  justify-evenly items-center shadow-lg shadow-green-800  bg-white rounded-md  px-4 py-8">
            <IoCubeOutline  size={25}/>
            <div className=" flex flex-col gap-1">
              <p className=" font-sans  text-lg">Wide Range Of Equipment</p>
              <p className=" text-sm">Access a diverse selection of high-quality farming equipment for rent</p>
            </div>
            
            </div>
            <div className=" flex gap-4 hover:scale-110 transition-all duration-300  cursor-pointer   justify-evenly items-center shadow-lg shadow-green-800  bg-white rounded-md  px-4 py-8">
            <IoCubeOutline  size={25}/>
            <div className=" flex flex-col gap-1">
              <p className=" font-sans  text-lg">Flexible Rental options</p>
              <p className=" text-sm">Choose from variety of rental duration to suite your farming needs</p>
            </div>
            
            </div>
            <div   className=" flex gap-4 hover:scale-110 transition-all duration-300  cursor-pointer   justify-evenly items-center shadow-lg shadow-green-800  bg-white rounded-md  px-4 py-8">
            <IoCubeOutline  size={25}/>
            <div className=" flex flex-col gap-1">
              <p className=" font-sans  text-lg">Flexible Rental options</p>
              <p className=" text-sm">Choose from variety of rental duration to suite your farming needs</p>
            </div>
            
            </div>
          </div> 
        </div>
      </div>


    {/* Welcome section */}
      <div className=" flex justify-center items-center md:h-[50vh] p-5 h-[30vh]">
        <div className=" flex flex-col h-full md:p-5 p-2 items-center justify-center">
          <img src={logo} className=" md:w-[300px] w-[30vh]"  />
        </div>
      </div>


      {/* FAQ */}
      <div></div>

    </div>
  );
};

export default Home;
