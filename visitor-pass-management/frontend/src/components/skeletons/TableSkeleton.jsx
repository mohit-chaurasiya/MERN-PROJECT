import React from 'react'
import { Skeleton } from '../ui/skeleton'

function TableSkeleton({rows, columns}) {
  return (
    <tbody>
        {Array.from({length: rows}).map((_,i) => (
            <tr key={i} className='animate-pulse'>
                
                {Array.from({length: columns}).map((_, j)=>(
                    <td key={j} className='p-6'>
                        <Skeleton className='h-4 w-full' />
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
      
    
  )
}

export default TableSkeleton
