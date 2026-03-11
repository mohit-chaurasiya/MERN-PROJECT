import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck, Ticket, Menu, X } from "lucide-react"


const Sidebar = () => {

  const [open, setOpen]= useState(false)

  return (
   <>
      {/* Mobile responsice */}

      <div className="md:hidden flex items-start justify-between bg-slate-100 text-blue-800 py-8 px-5 ">
        <Menu className="cursor-pointer"
        onClick={()=>setOpen(!open)} />
      </div>
   
      <div className={`
      bg-blue-900 text-white w-64 h-screen p-5
      fixed md:static 
      transition-transform
      ${open ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
      `}>
        
        <div className="flex items-center justify-between"> 
           <h2 className="text-2xl font-bold mb-8 hidden md:block">
        VMS Panel
      </h2>
      <X className={`cursor-pointer mb-8 md:hidden` }size={29} 
        onClick={()=>setOpen(!open)}/>
        </div>

      <nav className="flex flex-col gap-4">

        <Link
          to="/admin"
          className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded"
        >
          <LayoutDashboard size={18}/>
          Dashboard
        </Link>

        <Link
          to="/admin/visitors"
          className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded"
        >
          <Users size={18}/>
          Visitors
        </Link>

        <Link
          to="/admin/appointments"
          className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded"
        > <CalendarCheck size={18}/>
          Appointments
        </Link>


        <Link
          to="/admin/passes"
          className="flex items-center gap-2 hover:bg-blue-800 p-2 rounded"
        >
          <Ticket size={18}/>
          Passes
        </Link>

      </nav>
      </div>

   </>
  );
        
};

export default Sidebar;
