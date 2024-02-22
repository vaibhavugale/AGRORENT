import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { DELETE_EQUIPMENT_API, GET_ALL_LIST, REGISTER_EQUIPMENT } from "../constant/constant";
import { setAllEqu } from "../store/slices/equSlice";

export  function registeredEquip(formData,reset,setData,token){
    return async (dispatch)=>{
        const toastId = toast.loading("Uploading ")
        try{

            const res = await apiConnector("POST",REGISTER_EQUIPMENT,formData,{ 'Authorization': `Bearer ${token}`});
            if(res?.data?.success){
                toast.success("Registration successfully..");
                toast.dismiss(toastId);
                setData(null)
                reset();
            }

        }catch(err){
            console.log(err);
            toast.error("Something went wrong while registration..");
            toast.dismiss(toastId);
        }
    }
}

export function getALlEquipment (){
    return async (dispatch) =>{
        
        try{
            const res = await apiConnector("GET",GET_ALL_LIST); 
            dispatch( setAllEqu(res?.data?.data));
        }catch(err){
            console.log(err);
        }
    }
}

export async function DeleteEquipment(equID){
    const toastId = toast.loading("Wait, You request is in process.")
    try{
    const result = await apiConnector("POST",DELETE_EQUIPMENT_API,{equID});
    if(result?.data?.success){
        toast.success("Deleted Successfully");
        toast.dismiss(toastId);
    }
    }catch(err){
        console.log(err)
     toast.error("Failed to Delete");
     toast.dismiss(toastId);
    }
}
