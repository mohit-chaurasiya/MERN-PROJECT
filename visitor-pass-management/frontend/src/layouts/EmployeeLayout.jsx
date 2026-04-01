import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { notify } from '../utils/notify'
import { employeeMenu } from '../config/menuConfig'


function EmployeeLayout({children}) {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
        
          <Sidebar menuItems={employeeMenu}/>
        


        <div className="flex-1 bg-[#0f172a] h-screen overflow-y-auto py-6 md:ml-0">
          <Topbar role={"Employee"} />
          <div className="p-6">
            {children}
          </div>
            
        </div>
    </div>
  )
}

export default EmployeeLayout
