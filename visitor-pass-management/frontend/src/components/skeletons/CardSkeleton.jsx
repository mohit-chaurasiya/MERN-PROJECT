import React from 'react'

function CardSkeleton() {
  return (
    <div className='bg-white p-6 rounded-xl shadow flex items-center justify-between animate-pulse'>

      <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
       <div className='space-y-3 '>
        <div className='h-4 bg-gray-200  rounded w-24 mb-4'></div>
       <div className='h-4 bg-gray-200  rounded w-16'></div> 
       </div>

       
    </div>
  )
}

export default CardSkeleton
