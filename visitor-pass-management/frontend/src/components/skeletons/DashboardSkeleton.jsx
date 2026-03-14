import React from 'react'

import CardSkeleton from '../skeletons/CardSkeleton'

function DashboardSkeleton({count}) {
  return (
    <div className='
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-6
    '>

        {Array.from({length: count}).map((_,i)=>(
            <CardSkeleton key={i} />
        ))}
      
    </div>
  )
}

export default DashboardSkeleton
