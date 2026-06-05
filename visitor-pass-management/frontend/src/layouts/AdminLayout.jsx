import Sidebar from "../components/Sidebar";

import React from "react";
import Topbar from "../components/Topbar";
import { adminMenu } from "../config/menuConfig";
import BottomNav from "../components/securityComponent/BottomNav";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <div className="hidden md:block">
        <Sidebar menuItems={adminMenu} role="Admin" />
      </div>

      <div className="flex-1 bg-[#0f172a] h-screen overflow-y-auto py-6 md:ml-0">
        <div className="hidden md:block">
          <Topbar role="Admin" />
        </div>
        <div className="p-4 md:p-6 pb-24 md:pb-6">{children}</div>
      </div>

      <BottomNav role="admin" />
    </div>
  );
};

export default AdminLayout;
