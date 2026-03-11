import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



function Login() {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleLogin = async ()=>{
        try{

          
            const res = await API.post("/auth/login",{email,password})

            // token save
            localStorage.setItem("token",res.data.token)

            // role detect

            const role = res.data.role

            // role navigate

            if(role === "admin" ){
              navigate("/admin")
            }

            if(role === "employee"){
              navigate("/employee")
            }

            if(role === "security"){
              navigate("/security")
            }
             
            // console.log(res.data)
            login(res.data)

            alert("Login successfull")
        }catch(err){
            console.log(err)
            alert("Login failed")
        }
    }



  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center">
          Login
        </h2>

        <input
          type="email"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          id="email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
