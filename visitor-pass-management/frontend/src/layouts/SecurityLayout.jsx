import Sidebar from '@/components/Sidebar'
import React from 'react'

import { securityMenu } from '@/config/menuConfig'
import Topbar from '@/components/Topbar'

function SecurityLayout({children}) {
  return (
    <div className='flex'>

       <div className="flex ">
        <Sidebar menuItems={securityMenu}/>


        <div className="flex-1 bg-gray-100 min-h-screen p-6 md:ml-0">
          <Topbar role={"Security"} />
          <div className="p-6 rounded-xl">
            {children}
          </div>
            
        </div>
    </div>
      
    </div>
  )
}

export default SecurityLayout
