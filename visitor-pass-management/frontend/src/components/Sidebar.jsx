import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck, Ticket, Menu, X } from "lucide-react"


const Sidebar = ({menuItems}) => {

  const [open, setOpen]= useState(false)

  return (
   <>
      {/* Mobile responsice */}

      <div className="md:hidden flex items-start justify-between bg-[#0f172a] text-white py-8 px-5 ">
        <Menu className="cursor-pointer text-white"
        onClick={()=>setOpen(!open)} />
      </div>
   
      <div className={`
    w-64 h-screen bg-[#020617]  backdrop-blur-xl border-r border-gray-800 p-5
    z-20

      fixed md:static 
      transition-transform
      ${open ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
      `}>
        
        <div className="flex items-center justify-between"> 
           <h2 className="text-2xl text-white font-bold mb-8 hidden md:block">
        VMS Panel
      </h2>
      <X className={`cursor-pointer mb-8 md:hidden` }size={29} 
        onClick={()=>setOpen(!open)}/>
        </div>

      <nav className="flex flex-col gap-4">

        {/* <Link
          to="/admin"
          className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded"
        >
          <LayoutDashboard size={18}/>
          Dashboard
        </Link> */}

        {menuItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
          key={index}
          to={item.path}
          className="flex shadow-md bg-blu-300 items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-[#1e293b] hover:text-white transition"
        >
          <Icon size={18}/>
          {item.name}
        </Link>
        )})}

      </nav>
      </div>

   </>
  );
        
};

export default Sidebar;
