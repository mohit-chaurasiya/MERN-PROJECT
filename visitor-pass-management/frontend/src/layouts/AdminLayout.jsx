import Sidebar from "../components/Sidebar";


import React from 'react'
import Topbar from "../components/Topbar";
import { adminMenu } from "../config/menuConfig";


const AdminLayout = ({children}) => {
  return (
    <div className="flex ">
        <Sidebar menuItems={adminMenu}/>


        <div className="flex-1 bg-slate-100 min-h-screen p-6 md:ml-0">
          <Topbar />
          <div className="p-6">
            {children}
          </div>
            
        </div>
    </div>
  )
}

export default AdminLayout