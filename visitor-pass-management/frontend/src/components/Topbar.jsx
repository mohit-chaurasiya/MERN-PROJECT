import { Bell, LogOut, UserCircle, Clock3 } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Topbar({ role }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  const dropdownRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    navigate("/");
  };

  return (
    <div
      className="
      bg-[#0f172a]
      border
      border-white/10
      rounded-2xl
      px-6
      py-4
      flex
      items-center
      justify-between
      backdrop-blur-xl
      shadow-lg
    "
    >
      {/* Left */}

      <div>
        <h1 className="text-white text-2xl font-bold">{role} Dashboard</h1>

        <p className="text-slate-400 text-sm">Welcome back, {user?.name}</p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Clock */}

        <div
          className="
          hidden md:flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          bg-white/5
          border
          border-white/10
        "
        >
          <Clock3 size={16} className="text-violet-400" />

          <span className="text-white text-sm">
            {time.toLocaleTimeString()}
          </span>
        </div>

        {/* Notification */}

        <button
          className="
          relative
          p-3
          rounded-xl
          bg-white/5
          border
          border-white/10
          hover:bg-white/10
          transition
        "
        >
          <Bell size={18} className="text-white" />

          <span
            className="
            absolute
            top-2
            right-2
            h-2
            w-2
            rounded-full
            bg-red-500
            animate-pulse
          "
          />
        </button>

        {/* Profile */}

        <div
          onClick={() => setOpen(!open)}
          className="
          flex
          items-center
          gap-3
          px-4
          py-2
          rounded-xl
          bg-white/5
          border
          border-white/10
          cursor-pointer
          hover:bg-white/10
          transition
        "
        >
          <UserCircle size={28} className="text-violet-400" />

          <div className="hidden sm:block">
            <p className="text-white text-sm font-semibold">{user?.name}</p>

            <p className="text-slate-400 text-xs">{role}</p>
          </div>
        </div>

        {/* Dropdown */}

        {open && (
          <div
            className="
            absolute
            right-0
            top-16
            w-64
            rounded-2xl
            bg-[#111827]
            border
            border-white/10
            shadow-2xl
            p-2
            z-50
          "
          >
            <div className="p-4 border-b border-white/10">
              <p className="text-white font-semibold">{user?.name}</p>

              <p className="text-slate-400 text-sm">{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="
              w-full
              mt-2
              flex
              items-center
              gap-2
              px-4
              py-3
              rounded-xl
              text-red-400
              hover:bg-red-500/10
              transition
            "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
