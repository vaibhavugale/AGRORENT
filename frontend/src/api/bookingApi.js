import { SEND_BOOK_REQUEST } from "../constant/constant";
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