import React from "react";
import { apiConnector } from "../../../api/apiConnector";
import { UN_BOOK } from "../../../constant/constant";
import toast from "react-hot-toast";

const TableRow = ({ rowData, children, user }) => {
  const { _id } = rowData || {};

  const { name } = rowData?.eupId || {};
  

  const handelClick = async () => {
    const toastId = toast.loading("Uploading ");

    try {
      const res = await apiConnector("POST", UN_BOOK, {
        eupId: rowData?.eupId?._id,
        hisId: _id,
      });
      if (res?.data?.success) {
        toast.success("Your Equipment is available for rent ");
        toast.dismiss(toastId);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong ");
      toast.dismiss(toastId);
    }
  };

  return (
    <tr className=" text-left table-auto">
      <td className="">
        <p>{name}</p>
      </td>
      <td className=" overflow-scroll">{_id}</td>
      <td className=" flex  items-center gap-2"> {children} </td>
      <td>
        {rowData?.eupId?.owner === user?._id && rowData?.inProgress ? (
          <button
            onClick={handelClick}
            className={`bg-red-500 px-3 py-2 rounded-md text-white`}
          >
            Stop
          </button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default TableRow;
