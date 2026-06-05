import { User, Mail, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const roleColors = {
    admin: "text-red-400 bg-red-500/10",
    employee: "text-blue-400 bg-blue-500/10",
    security: "text-green-400 bg-green-500/10",
  };

  const role = user?.role?.toLowerCase() || "employee";
  console.log(user);
  console.log(role);
  console.log(user?.email);

  return (
    <div className="space-y-6">
      {/* Hero */}

      <div
        className="
        rounded-3xl
        border border-white/10
        bg-linear-to-r
        from-violet-600/20
        via-blue-600/20
        to-cyan-600/20
        p-6
      "
      >
        <h1 className="text-3xl font-bold text-white">My Profile</h1>

        <p className="text-slate-300 mt-2">Manage your account details.</p>
      </div>

      {/* Profile Card */}

      <div
        className="
        bg-[#0f172a]
        border border-white/10
        rounded-3xl
        p-6
        max-w-3xl
        "
      >
        <div className="flex items-center gap-4 mb-8">
          <div
            className="
            h-20
            w-20
            rounded-full
            bg-violet-500/20
            flex
            items-center
            justify-center
            "
          >
            <User size={36} className="text-violet-400" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">{user?.name}</h2>

            <span
              className={`
              inline-flex
              px-3
              py-1
              rounded-full
              text-sm
              mt-2
              ${roleColors[role]}
              `}
            >
              {role}
            </span>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-slate-400 text-sm">Name</p>

            <div className="flex items-center gap-3 mt-1">
              <User size={18} />
              <span className="text-white">{user?.name}</span>
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Email</p>

            <div className="flex items-center gap-3 mt-1">
              <Mail size={18} />
              <span className="text-white">{user?.email}</span>
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Role</p>

            <div className="flex items-center gap-3 mt-1">
              <Shield size={18} />
              <span className="text-white">{role}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="
          mt-8
          w-full
          bg-red-600
          hover:bg-red-700
          text-white
          py-3
          rounded-xl
          flex
          items-center
          justify-center
          gap-2
          transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
