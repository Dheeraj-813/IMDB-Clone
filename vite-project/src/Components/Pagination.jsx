/* eslint-disable react/prop-types */
 
/* eslint-disable no-unused-vars */
import React from 'react'

function Pagination({handlePrev, handleNext, pageNo}) {
  return (
    <div className='bg-gray-400 p-8 mt-20 flex justify-center'>
    <div onClick={handlePrev} className='px-8'><i className="fa-solid fa-arrow-left-long"></i></div>
    <div className='font-bold'>{pageNo}</div>
    <div onClick={handleNext} className='px-8'><i className="fa-solid fa-arrow-right"></i></div>
    </div>
    
  )
}

export default Pagination