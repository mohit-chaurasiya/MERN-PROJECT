import {Bell , UserCircle} from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"


function Topbar() {
  const {logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = ()=> {
    logout()
    navigate("/login")
  }
  return (
    
    <div className="bg-white flex shadow-sm rounded-2xl items-center justify-between px-6 py-2 ">
      
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
       <div className="flex items-center gap-4">
         <Bell className="cursor-pointer text-gray-600"/>
         <UserCircle className="cursor-pointer text-gray-600"/>
       </div>
       <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Topbar
