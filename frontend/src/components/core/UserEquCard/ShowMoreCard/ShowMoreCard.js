import React from 'react'
import styles from "./style.module.css"

const ShowMoreCard = ({data}) => {
    const {image,type,rate, manufacturer,name,model,year,capacity}= data;
    console.log(data)
  return (
    <div className=' bg-white w-full h-min md:w-[40%]  mb-9 mt-4 rounded-lg'>
       <img src={image}  className='md:w-[250px] w-[150px] mx-auto' alt='img' loading='lazy'/>
      <table className=' w-[90%] mx-auto mt-3 border mb-4'>
        <thead>
           <tr>
           <td>Property</td>
            <td>Values</td>
           </tr>
        </thead>
        <tbody>
            <tr>
                <th>Name</th>
                <td>{name}</td>
            </tr>
            <tr>
                <th>Model</th>
                <td>{model}</td>
            </tr>
            <tr>
                <th>Manufacturer</th>
                <td>{manufacturer}</td>
            </tr>
            <tr>
                <th>Rate</th>
                <td>{rate}</td>
            </tr>
            <tr>
                <th>Year</th>
                <td>{year}</td>
            </tr>
            <tr>
                <th>Type</th>
                <td>{type}</td>
            </tr>
            <tr>
                <th>capacity</th>
                <td>{capacity}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ShowMoreCard