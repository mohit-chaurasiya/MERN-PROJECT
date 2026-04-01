import React from 'react'

function VisitorLogTable({logs}) {
  return (
    <table className='w-full bg-white shadow rounded-xl border-2'>
        <thead className='bg-gray-100'>
                   <tr>
                    <th className='p-3'>Sr.No</th>
                    <th className="p-3">Visitor</th>
                    <th className="p-3">Host</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Check In</th>
                    <th className="p-3">Check out</th>
                    {/* <th className="p-3">Status</th> */}
                    </tr> 
                    
        </thead>

        <tbody className='rounded-xl'>
            {logs.map((log,index) =>(
                <tr key={index} className='border-t rounded-2xl'>
                    
                    <td className='p-3 text-center'>{index+1}</td>
                    <td className="p-3 text-center">{log.visitorName}</td>
                    <td className="p-3 text-center">{log.hostName}</td>
                    <td className='p-3 text-center'>{log.purpose}</td>
                    <td className="p-3 text-center">{new Date(log.checkIn).toLocaleString()}</td>
                    <td className="p-3 text-center">{new Date(log.checkOut).toLocaleString() || "-"}</td>
                    {/* <td className="p-3">{log.passId.visitorId.status}</td> */}

                </tr>
            ) )}
        </tbody>
    </table>
  )
}

export default VisitorLogTable
