import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { notify } from '../utils/notify'
import { employeeMenu } from '../config/menuConfig'


function EmployeeLayout({children}) {
  return (
    <div className="flex ">
        <Sidebar menuItems={employeeMenu}/>


        <div className="flex-1 bg-gray-100 min-h-screen p-6 md:ml-0">
          <Topbar role={"Employee"} />
          <div className="p-6">
            {children}
          </div>
            
        </div>
    </div>
  )
}

export default EmployeeLayout
