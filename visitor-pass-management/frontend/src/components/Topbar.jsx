import {Bell , UserCircle} from "lucide-react"

import React from 'react'

function Topbar() {
  return (
    <div className="bg-white flex shadow-sm rounded-2xl items-center justify-between px-6 py-2 ">
      
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
       <div className="flex items-center gap-4">
         <Bell className="cursor-pointer text-gray-600"/>
         <UserCircle className="cursor-pointer text-gray-600"/>


       </div>
    </div>
  )
}

export default Topbar
