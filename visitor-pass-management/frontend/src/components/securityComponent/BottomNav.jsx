import {
  LayoutDashboard,
  QrCode,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function BottomNav() {
  const menus = [
    {
      name: "Home",
      icon: LayoutDashboard,
      path: "/security",
    },
    {
      name: "Scan",
      icon: QrCode,
      path: "/security/scan",
    },
    {
      name: "Verify",
      icon: ShieldCheck,
      path: "/security/verify",
    },
    {
      name: "Logs",
      icon: ClipboardList,
      path: "/security/logs",
    },
  ];

  return (
    <div
      className="
      fixed
      bottom-0
      left-0
      right-0
      z-50
      md:hidden
      bg-[#0f172a]
      border-t
      border-white/10
      backdrop-blur-xl
      "
    >
      <div className="grid grid-cols-4">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                flex-col
                items-center
                justify-center
                py-3
                gap-1
                ${isActive ? "text-violet-400" : "text-slate-400"}
                `
              }
            >
              <Icon size={20} />

              <span className="text-xs">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;
