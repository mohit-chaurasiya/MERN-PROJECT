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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-[#1e293b] border border-gray-800 shadow-lg
  mx-5  px-6 py-3 rounded-xl ">

      {/* Left */}
      <h1 className="text-white text-lg font-semibold tracking-wide">
        {role} Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        
        {/* Bell */}
        <div className="p-2 hover:bg-[#334155] rounded-full cursor-pointer">
          <Bell className="text-gray-300" size={20} />
        </div>

        {/* User */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-[#13243c] px-3 py-1 rounded-full cursor-pointer"
        >
          <UserCircle className="text-white" size={22} />
          <span className="text-white text-sm font-medium">
            {user?.name?.split(" ")[0]}
          </span>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-52 
          bg-[#344664]  border border-white/20 
          rounded-xl shadow-xl p-2 z-50">

            {/* User Info */}
            <div className="p-3  hover:bg-[#4c5c77]  rounded">
              <p className="text-gray-300 font-semibold">{user?.name}</p>
              <p className="text-xs text-gray-300">{user?.email}</p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 p-3 rounded-lg 
              text-red-400 hover:bg-red-500/20 transition mt-2"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;