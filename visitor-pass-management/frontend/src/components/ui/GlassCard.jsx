import React from 'react'

function GlassCard({children, className}) {
  return (
    <div
    
    className={` backdrop-blur-lg bg-white/10 border border-white/20
        shadow-lg rounded-2xl p-5 ${className}`}
    >
      {children}
    </div>
  )
}

export default GlassCard
