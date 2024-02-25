import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData: JSON.parse(localStorage.getItem('userData') ) ?   JSON.parse(localStorage.getItem('userData') ) :null,
    token:localStorage.getItem('token') ?  localStorage.getItem('token') :"",
    imgUrl:localStorage.getItem('imgUrl') ?  localStorage.getItem('imgUrl') :"",
    address:{
      city:"",
      district:"",
      countryState:"", 
      country:"",
      pincode:""
    },
    socketID:"",
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser : (state,value) => {
         state.userData =value.payload;
    
    },
    setToken : (state,value) =>{
      state.token = value.payload;
    },
    setImg: (state,value)=>{
      state.imgUrl = value.payload;
    },
    setAddress(state,value){
      state.address = value.payload
    },
    setSocketID(state,value){
      state.socketID = value.payload;
    },
    setUserEqu(state,value){
      state.userData.equipments=value.payload;
    }
  },
});

// this is for dispatch
export const { setUser,setToken ,setImg,setAddress,setSocketID,setUserEqu} = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
