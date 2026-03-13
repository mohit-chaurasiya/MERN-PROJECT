import { Bell, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Topbar({ role }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="bg-white flex shadow-sm rounded-2xl items-center justify-between px-6 py-2  ">
      <h1 className="text-lg font-semibold text-gray-800">{role} Dashboard</h1>
      <div className="flex gap-4 ">
        <div className="flex items-center gap-4 relative"  ref={dropdownRef} >
          <Bell className="cursor-pointer text-gray-600" />
          <div onClick={()=>setOpen(!open)} className=" flex items-center  cursor-pointer text-gray-600">
            <UserCircle size={24} />
          </div>


{/* dropdown */}

      {open && (
         <div className="absolute right-3 mt-36 w-44 bg-gray-100 shadow-lg  border rounded-bl-2xl rounded-br-2xl rounded-tl-2xl p-1">
          <div className="p-3 mt-2  bg-white rounded-lg">
            <p className="text-gray-900 font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500 font-semibold">{user?.email}</p>
          </div>
   
         <div className="w-full p-3 bg-white mt-1 rounded-lg cursor-pointer"  onClick={handleLogout}>
          <button className="cursor-pointer ">
           <LogOut className="inline" size={16}/> Logout
          
        </button>
        </div>
         </div>
      

      )}


          
        </div>
        
      </div>
    </div>
  );
}

export default Topbar;
