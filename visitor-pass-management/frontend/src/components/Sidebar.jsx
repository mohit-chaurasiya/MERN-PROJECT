import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";

const Sidebar = ({ menuItems }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="text-violet-400" size={22} />
          <h2 className="text-white font-bold">VMS Portal</h2>
        </div>

        <Menu
          className="text-white cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0 z-50
          h-screen w-72
          bg-[#020617]
          border-r border-white/10
          transition-all duration-300
          overflow-hidden

          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="
                h-12 w-12 rounded-xl
                bg-linear-to-r
                from-violet-600
                to-blue-600
                flex items-center justify-center
              "
            >
              <Shield size={24} className="text-white" />
            </div>

            <div>
              <h1 className="text-white font-bold text-xl">VMS Portal</h1>

              <p className="text-slate-400 text-xs">Visitor Management</p>
            </div>
          </div>

          <X
            className="md:hidden text-white cursor-pointer absolute right-5 top-5"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3
                  px-4 py-3 rounded-xl
                  transition-all duration-300

                  ${
                    active
                      ? "bg-linear-to-r from-violet-600 to-blue-600 text-white  shadow-[0_0_30px_rgba(124,58,237,0.45)]"
                      : "text-slate-400 hover:bg-white/5 hover:translate-x-1 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />

                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-5 left-4 right-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-slate-400">Security Portal</p>

            <h3 className="text-white font-semibold mt-1">
              Access Control Active
            </h3>

            <div className="flex items-center gap-2 mt-3">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>

              <span className="text-xs text-slate-400">System Online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
