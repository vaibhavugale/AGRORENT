import React from "react";
import TableRow from "./TableRow/TableRow";
import { FcOk } from "react-icons/fc";
import { LuActivity } from "react-icons/lu";
import styles from "./styles.module.css"
import { useSelector } from "react-redux";
const History = () => {
  const rowsData = useSelector((state)=>state.userSlice?.userData?.history)
  const user = useSelector((state)=>state.userSlice?.userData)
  return (
    <div className=" md:w-[1080px] mx-auto bg-slate-200 p-2">
      <p className=" tracking-widest  mt-6">/profile/history</p>

      {/* table section */}
      <section className=" md:w-[80%] mx-auto mt-8">
        <table className=" md:w-full  ">
          <thead className="">
            <tr className=" ">
              <td className=" ">Equipment</td>
              <td className=" ">History ID</td>
              <td className="   ">Progress</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
           {
            rowsData?.map((rowData)=>(
              <TableRow key={rowData?._id} user={user} rowData={rowData}>
             
              {rowData?.inProgress ? (<>  <LuActivity /> In Progress</>):(<><FcOk />Completed</>)}
              </TableRow>
            ))
           }
          
          
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default History;
