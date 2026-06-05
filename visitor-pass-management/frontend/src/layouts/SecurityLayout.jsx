import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { securityMenu } from "@/config/menuConfig";
import BottomNav from "../components/securityComponent/BottomNav";

function SecurityLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <div className="hidden md:block">
        <Sidebar menuItems={securityMenu} />
      </div>

      <main className="flex-1 min-w-0 p-4 md:p-6 pb-24 md:pb-6">
        <div className="hidden md:block mb-6">
          <Topbar role="Security" />
        </div>

        {children}
      </main>

      <BottomNav role="security" />
    </div>
  );
}

export default SecurityLayout;
