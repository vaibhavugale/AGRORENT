socket.on("connect",()=>{
    dispatch(setSocketID(socket.id));
    })
  socket.on("equipmentDeleted",({userEqu})=>{
    console.log("Equipment Deleted",userEqu?.equipments);
    // dispatch(setUserEqu(userEqu?.equipments));
  })