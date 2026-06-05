import { NavLink } from "react-router-dom";
import { mobileNavConfig } from "@/config/mobileNavConfig";

function BottomNav({ role }) {
  const menus = mobileNavConfig[role] || [];

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
      "
    >
      <div
        className={`grid`}
        style={{
          gridTemplateColumns: `repeat(${menus.length},1fr)`,
        }}
      >
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
                py-3
                text-xs
                ${isActive ? "text-violet-400" : "text-slate-400"}
                `
              }
            >
              <Icon size={20} />

              <span className="mt-1">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;
