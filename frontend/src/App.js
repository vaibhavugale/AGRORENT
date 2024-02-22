import React, { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import Footer from "./components/footer/Footer";
import { getAddress } from "./api/getCurrentAddress";
import { setAddress } from "./store/slices/userSlice";
import { getALlEquipment } from "./api/equipmentApi";
import io from 'socket.io-client';
const socket = io('http://localhost:4000');
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
        city: data?.address?.city ||  data?.address?.town,
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

  return (
    <div className="  min-w-[100vw] min-h-[100vh]  box-border  overflow-clip ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
