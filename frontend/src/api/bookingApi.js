import { SEND_ACCEPT_URL, SEND_BOOK_REQUEST, SEND_REJECT_URL } from "../constant/constant";
import { apiConnector } from "./apiConnector";


export async function sendBookRequest(data,toast){
    const toastID  = toast.loading("Wait")
    try{
        const res = await  apiConnector("POST",SEND_BOOK_REQUEST,data);

        if(res){
            toast.success("Request send successfully");
            toast.dismiss(toastID);
        }
    }catch(err){
        toast.error("Fail To  send Request");
        toast.dismiss(toastID);
        console.log(err)
    }
}

export async function sendAcceptRequest(id,toast,setAccepted){
    const toastID = toast.loading("Wait,While processing")
  try{

    const res = await apiConnector("POST",SEND_ACCEPT_URL+id);

    if(res){
        toast.success(res?.data?.message);
        toast.dismiss(toastID);
        setAccepted(true);
    }
  }catch(err){
    toast.error(err.message);
    toast.dismiss(toastID);
    console.log(err.message);
  }
}

export async function sendRejectRequest(id,toast,setAccepted){
  const toastID = toast.loading("Wait,While processing")
try{

  const res = await apiConnector("POST",SEND_REJECT_URL+id);

  if(res){
      toast.success(res?.data?.message);
      toast.dismiss(toastID);
      setAccepted(true);
  }
}catch(err){
  toast.error(err.message);
  toast.dismiss(toastID);
  console.log(err.message);
}
}