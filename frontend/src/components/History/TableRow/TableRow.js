import React from 'react'
import {useSelector} from "react-redux"
import styles from "./styles.module.css"

const TableRow = ({rowData,children}) => {
 
  
    const {name,_id} = rowData?.eupId;
  
  
  return (
    <tr className=' text-left table-auto'>
    <td className=''>
    <p>{name}</p>
    </td>
    <td className=' overflow-scroll'>{_id}</td>
    <td className=' flex  items-center gap-2'> {children}  </td>
    
    </tr>
  )
}

export default TableRow