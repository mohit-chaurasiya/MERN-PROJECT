import React, { useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import API from "../../services/api";
import { notify } from "../../utils/notify";
import { useAuth } from "../../hooks/useAuth";

import validator from 'validator'



function CreateVisitor() {

    const [loading,setLoading] = useState()

    const {user} = useAuth()

    const [form,setForm] = useState({
        name: "",
        email: "",
        phone:"",
        host:"",
        photo:null
        
    })

    const handleChange = (e) => {


      const {name,value,files} = e.target

      if(name === "photo"){
        setForm((prev) => ({
          ...prev,
          photo: files[0]
        }))
        return
      }

      if(name === "phone" && !/^\d{0,10}$/.test(value)){
        return
      }

       setForm((prev)=>({
  ...prev,
  [name]: value
}))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        if(loading) return
        setLoading(true)

        try{

          const data = {
            ...form,
            host: user?.name
          }
            
          if(!data.name || !data.email || !data.phone || !data.host){
            notify.error("All field required")
            return
          }

          if(!validator.isEmail(data.email)){
            notify.error("Enter valid email id")
            return
          }

          if(!validator.isMobilePhone(data.phone,"en-IN")){
            notify.error("Enter valid mobile number")
            return
          }

          const formData = new FormData()
          formData.append("name",form.name)
          formData.append("photo",form.photo)
          formData.append("email",form.email)
          formData.append("phone",form.phone)
          formData.append("host",user?.name)
          
          await API.post("/visitors",formData)

          setLoading(false)
         

            notify.success("Visitor Created Successfully ")

            setForm({
                name:"",
                email:"",
                phone:"",
                host:"",
                photo:null
            })
        }
        catch(err){
          console.log("FULL ERROR:", err)
  console.log("RESPONSE:", err.response)
  console.log("DATA:", err.response?.data)
            console.log("BACKEND ERRORR :",err.response?.data)
        notify.error(err.response?.data?.error || err.response?.message || "failed to create visior")
       }
    }

  return (
    <EmployeeLayout>
      <div className="max-w-lg bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Create Visitor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
          type="text" 
          name="name" 
          placeholder="Visitor Name" 
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          
          />
           
           <input
           type="file" 
           name="photo"
           accept="image/*"
           onChange={handleChange}
           
           className="w-full border p-2 rounded"
           />
    

          <input 
          type="text" 
          name="email"
          placeholder="Visitor Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          
          />

          <input 
          type="text" 
          name="phone"
          
          placeholder="Visitor mobile number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          
          />

          <input 
          type="text" 
          name="host"
          
          value={user?.name || ""}
          
          readOnly
          className="w-full border p-2 rounded"
          
          />

          <button 
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 w-full">
            Create Visitor
          </button>
        </form>
      </div>
    </EmployeeLayout>
  );
}

export default CreateVisitor;
