import React, { useEffect, useState } from 'react'
import EmployeeLayout from '../../layouts/EmployeeLayout'
import { useNavigate } from 'react-router-dom'
import API from '../../services/api'
import { notify } from '../../utils/notify'



function Visitors() {

    const [visitors,setVisitors] = useState([])
    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchVisitors = async ()=>{
            try{
                const res = await API.get("/visitors")
                setVisitors(res.data)
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }

        fetchVisitors()
    },[])

    

    const filteredVisitors = visitors.filter((visitor) => {
       return (
        visitor.name.toLowerCase().includes(search.toLowerCase()) ||
  visitor.email.toLowerCase().includes(search.toLowerCase()) ||
  visitor.phone.toLowerCase().includes(search.toLowerCase())
       )
    })

    const handleDelete = async(id) => {
        
       

        try {
            await API.delete(`/visitors/${id}`)
            notify.success("Visitor deleted Successfully")

            setVisitors(visitors.filter(v => v._id !== id))
        }catch (err){
            notify.error("failed to delete visitor")
        }
    }

  return (
    <EmployeeLayout>

        <h1 className='text-2xl font-bold mb-6'>Visitors</h1>


        {/* Search input */}

        <input 
        type="text" 
        name="search" 
        id="search" 
        placeholder='Search Visitor...'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-72"
        />

        {/* table */}

        <div className='bg-white rounded-xl shadow overflow-x-auto' >
            <table className='w-full' >
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='p-3 text-left'>Sr.no</th>
                        <th className='p-3 text-left'>Name</th>
                        <th className='p-3 text-left'>Email</th>
                        <th className='p-3 text-left'>Mobile No</th>
                        <th className='p-3 text-left'>Host</th>
                        <th className='p-3 text-left'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredVisitors.map((visitor,index)=>(
                        <tr key={visitor._id} className='border-t'>
                            
                            <td className='p-3'>{index + 1}</td>
                            <td className='p-3'>{visitor.name}</td>
                            <td className='p-3'>{visitor.email}</td>
                            <td className='p-3'>{visitor.phone}</td>
                            <td className='p-3'>{visitor.host}</td>
                            <td className='p-3'>
                                <button
                                onClick={()=>navigate("/employee/create-appointments",{state:{visitorId:visitor._id}})} 
                                className='bg-blue-300 text-blue-800 px-3 py-1 rounded hover:bg-blue-600 hover:text-white'>
                                    Appointment
                                </button>

                                <button onClick={()=>handleDelete(visitor._id)}
                                className='bg-red-300 text-red-800 px-3 py-1 rounded hover:bg-red-600 hover:text-white ml-2'>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      
    </EmployeeLayout>
  )
}

export default Visitors
