import SecurityCard from '@/components/securityComponent/SecurityCard'
import SecurityLayout from '@/layouts/SecurityLayout'
import React from 'react'



const SecurityDashboard = () => {
  return (
    <SecurityLayout>
      <h1 className='text-2xl font-bold mb-6'>Security Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
       <SecurityCard heading="Scan Visitor Pass" para="Scab QR code to check-in visitor" />
       <SecurityCard heading="Check-out Visitor" para="Scan pass to check-out visitor" />
       <SecurityCard heading="Visitor Log" para="View all visitor entries" />
       <SecurityCard heading="" para="Scab QR code to check-in visitor" />
      </div>

    </SecurityLayout>
  )
}

export default SecurityDashboard