import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { MdMessage } from "react-icons/md";
import { useDispatch } from "react-redux";
import Footer from "./components/footer/Footer";
import { getAddress } from "./api/getCurrentAddress";
import { motion } from "framer-motion";
import { setAddress, setUserEqu } from "./store/slices/userSlice";
import { getALlEquipment } from "./api/equipmentApi";
import { setSocketID, appendEqu } from "./store/slices/userSlice";
import io from "socket.io-client";
import { setAllEqu } from "./store/slices/equSlice";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import  GoogleMap from "google-map-react";
import Marker from "google-map-react"
const socket = io(process.env.REACT_APP_BASE_URL);
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const { latitude, longitude } = pos.coords;
      const data = await getAddress(latitude, longitude);
      const addData = {
        city: data?.address?.city || data?.address?.town,
        country: data?.address?.country,
        pincode: data?.address?.postcode,
        district: data?.address?.state_district,
        countryState: data?.address?.state,
      };
      dispatch(setAddress(addData));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    const getIp = async () => {
      navigator.geolocation.getCurrentPosition(success, error, options);
    };
    getIp();

    dispatch(getALlEquipment());

    return () => socket.disconnect();
  }, []);
  socket.on("connect", () => {
    dispatch(setSocketID(socket.id));
  });
  socket.on("equipmentDeleted", ({ userEqu }) => {
    dispatch(setUserEqu(userEqu?.equipments));
    localStorage.setItem("userData", JSON.stringify(userEqu));
  });
  socket.on("equipmentDeletedToAll", ({ allEqp }) => {
    dispatch(setAllEqu(allEqp));
  });
  socket.on("equipmentAdded", ({ allEqp }) => {
    dispatch(setAllEqu(allEqp));
  });
  socket.on("equAddedForUser", ({ userEqu }) => {
    // console.log("equipment",userEqu);
    dispatch(setUserEqu(userEqu?.equipments));
    localStorage.setItem("userData", JSON.stringify(userEqu));
  });
  const [showChatBot, setShowChatBot] = useState(false);
  return (
    <div className="  min-w-[100vw] min-h-[100vh]  box-border relative  overflow-clip ">
      <Header />
      <Outlet />
    <div className=" w-full h-[100vh]">
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{
        lat: 18.46187019989448,
        lng:  73.8380342011331,
      }}
    >
     <AnyReactComponent
          lat={18.46187019989448}
          lng={ 73.8380342011331}
          text="My Marker"
        />
    </GoogleMap>
    </div>
      
{/*    
        <motion.div
          drag
          onTap={() => setShowChatBot(!showChatBot)}
          className=" flex items-end flex-col"
        >
          <div className={`${!showChatBot ? "hidden" : "block"}`}>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>


          <div className=" w-[70px] cursor-pointer  flex justify-center items-center mt-2 h-[70px] bg-OR-50 rounded-full ">
            <MdMessage size={40} className=" text-white" />
          </div>
        </motion.div> */}
    
      <Footer />
    </div>
  );
};

export default App;
