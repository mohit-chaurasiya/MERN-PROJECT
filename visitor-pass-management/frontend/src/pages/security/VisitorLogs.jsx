import VisitorLogTable from '@/components/securityComponent/VisitorLogTable'
import SecurityLayout from '@/layouts/SecurityLayout'
import API from '@/services/api'
import React, { useEffect, useState } from 'react'




function VisitorLogs() {

    const [logs, setLogs] = useState([])
    const [from, setFrom] = useState("")
    const [to,setTo] = useState("")

    
        const fetchLogs = async (fromDate="",toDate="")=>{
            
            try{
                let url = "/check/logs"

                if(fromDate && toDate){
                    url += `?from=${fromDate}&to=${toDate}`
                }

                const res = await API.get(url)
                setLogs(res.data)
            }catch(err){
             console.log(err)
           }

        }

        useEffect(()=>{
            fetchLogs()
        },[])


        // filter

        const handleToday = () => {
            const today = new Date().toISOString().split("T")[0]

        setFrom(today)
        setTo(today)

        fetchLogs(today,today)
        }
        
        const handleLast7Days = () => {
            
            const today = new Date()
            const last7 = new Date()

            last7.setDate(today.getDate()-7)

            const toDate = today.toISOString().split("T")[0]
            const fromDate = last7.toISOString().split("T")[0]

            setFrom(fromDate)
            setTo(toDate)

            fetchLogs(fromDate,toDate)
        }


        // Custom Filter
        const handleFilter = () => {

            fetchLogs(from,to)
        }

        // Export CSV

        const handleExport = () =>{
            const headers = [
                "Visitor",
                "Host",
                "Purpose",
                "Check  In",
                "Check Out"
            ]

            const rows = logs.map(log => [
                log.visitorName,
                log.hostName,
                log.purpose,
                new Date(log.checkIn).toLocaleString(),
                log.checkOutTime ? new Date(log.checkOut).toLocaleString() : "-"
            ])

            let csvContent = "data:text/csv;charset=utf-8,"+[headers,...rows].map(e => e.join(",")).join("\n")

            const encodeUri = encodeURI(csvContent)

            const link = document.createElement("a")
            link.setAttribute("href",encodeUri)
            link.setAttribute("download","visitor_logs.csv")

            document.body.appendChild(link)
            link.click()
        }
    
  return (
    <SecurityLayout>

        <h1 className='text-2xl font-bold mb-6'>Visitor Logs</h1>

        <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-3 items-center w-295">

             <input 
             type="date"
             value={from}
             onChange={(e)=>setFrom(e.target.value)}
             className='border p-2 rounded'
             />

             <input 
             type="date"
             value={to}
             onChange={(e)=>setTo(e.target.value)}
             className='border p-2 rounded'
             />

             <button
             onClick={handleFilter}
             className='bg-blue-600 text-white px-4 py-2 rounded'
             >Filter</button>

             <button
             onClick={handleToday}
             className='bg-gray-600 text-white px-4 py-2 rounded'
             >Today</button>

             <button
             onClick={handleLast7Days}
             className='bg-gray-600 text-white px-4 py-2 rounded'
             >Last 7 Day</button>

             <button
             onClick={handleExport}
             className='bg-green-600 text-white px-4 py-2 rounded'
             >Export CSV</button>


             {/* table */}
             </div>

               <VisitorLogTable logs = {logs}/>


       
      
    </SecurityLayout>
  )
}

export default VisitorLogs
