import React from 'react'

function SecurityCard({heading,para}) {
  return (
    <div className='bg-white  shadow rounded-xl p-6'>
        <h2 className='text-lg font-semibold'>{heading}</h2>
        <p className='text-gray-500'>{para}</p>
      
    </div>
  )
}

export default SecurityCard
