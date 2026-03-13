import React, { useEffect, useState } from 'react'
import EmployeeLayout from '../../layouts/EmployeeLayout'
import { notify } from '../../utils/notify'
import API from '../../services/api'
import { useLocation } from 'react-router-dom'



function CreateAppointment() {

    const location = useLocation()
    const visitorId = location.state?.visitorId
    const [visitors,setVisitors] = useState([])
    const [selectedVisitor, setSelectedVisitor] = useState("")
    const [form, setForm] = useState({
        visitorId: "",
        purpose: '',
        date:""
    })

    useEffect(()=>{
        const fetchVisitors = async ()=> {
            try{
                const res = await API.get("/visitors")
                setVisitors(res.data)

                if(visitorId){
                    setSelectedVisitor(visitorId)
                }
            }catch(err){
                console.log(err)
            }
        }

        fetchVisitors()
    },[])


    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try{
            await API.post("/appointments",form)
            notify.success("Appointment created Successfully")

            setForm({
                visitorId:"",
                purpose:"",
                date:""
            })
        }catch(err){
            notify.error("Failed to create appointment")
        }
    }

  return (
    
    <EmployeeLayout>
        <div className='bg-white p-6 rounded-xl shadow max-w-xl'>

            <h2 className='text-xl font-bold mb-4'>Create Appointment</h2>

            <form className='space-y-4' onSubmit={handleSubmit}>

                <select 
                name = "visitorId"
                value={selectedVisitor}
                onChange={(e)=>setSelectedVisitor(e.target.value)}
                className='w-full border p-2 rounded'
                required
                >
                    <option value="">Select Visitor</option>
                    {visitors.map((v) => (
                        <option key={v._id} value={v._id}>{v.name}</option>
                    ))}
                </select>

                <input
                type='text'
                name='purpose'
                placeholder='purpose'
                value={form.purpose}
                onChange={handleChange}
                className='w-full border p-2 rounded'
                required
                />

                <input
                 type='date'
                 name='date'
                 value={form.date}
                 onChange={handleChange}
                 className='w-full border p-2 rounded'
                 required
                />

                <button 
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'>Create Appointment</button>
            </form>

        </div>
    </EmployeeLayout>
      
    
  )
}

export default CreateAppointment
