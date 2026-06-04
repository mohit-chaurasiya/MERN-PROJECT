import SecurityLayout from "@/layouts/SecurityLayout";
import API from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  UserCheck,
  LogOut,
  Activity,
  QrCode,
  ClipboardList,
  ArrowRight,
  Shield,
} from "lucide-react";

const SecurityDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    todayVisitors: 0,
    checkedIn: 0,
    checkedOut: 0,
    activeVisitors: 0,
    recentActivity: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/security");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Today's Visitors",
      value: stats.todayVisitors,
      icon: Users,
    },
    {
      title: "Checked In",
      value: stats.checkedIn,
      icon: UserCheck,
    },
    {
      title: "Checked Out",
      value: stats.checkedOut,
      icon: LogOut,
    },
    {
      title: "Active Visitors",
      value: stats.activeVisitors,
      icon: Activity,
    },
  ];

  const actions = [
    {
      title: "Scan Visitor",
      desc: "Scan QR & verify visitor",
      icon: QrCode,
      path: "/security/scan",
    },
    {
      title: "Visitor Logs",
      desc: "View all visitor entries",
      icon: ClipboardList,
      path: "/security/logs",
    },
    {
      title: "Verify Pass",
      desc: "Verify visitor credentials",
      icon: Shield,
      path: "/security/verify",
    },
  ];

  return (
    <SecurityLayout>
      <div className="space-y-6">
        {/* Hero Section */}

        <div
          className="
          w-full
  rounded-3xl
  border
  border-white/10
  bg-linear-to-r
  from-violet-600/20
  via-blue-600/20
  to-cyan-600/20
  p-6
        "
        >
          <div className="flex items-center gap-4">
            <div
              className="
              h-14 w-14
              rounded-2xl
              bg-white/10
              flex
              items-center
              justify-center
            "
            >
              <Shield className="text-violet-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                Security Dashboard
              </h1>

              <p className="text-slate-300 mt-1">
                Monitor visitor activity and access control.
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="text-center text-slate-400 py-10">
            Loading dashboard...
          </div>
        ) : (
          <>
            {/* Stats */}

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {statCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                    bg-[#0f172a]
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                    hover:border-violet-500/50
                    hover:scale-[1.02]
hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]
                    transition-all
                  "
                  >
                    <div className="flex justify-between items-center">
                      <Icon size={24} className="text-violet-400" />

                      <span className="text-3xl font-bold text-white">
                        {item.value}
                      </span>
                    </div>

                    <p className="text-slate-400 mt-4 text-sm">{item.title}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {actions.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      onClick={() => navigate(item.path)}
                      className="
                      cursor-pointer
                      group
                      bg-[#0f172a]
                      border
                      border-white/10
                      rounded-3xl
                      p-6
                      hover:border-violet-500/50
                      hover:-translate-y-1
                      transition-all
                    "
                    >
                      <div
                        className="
                        h-14 w-14
                        rounded-2xl
                        bg-violet-500/10
                        flex
                        items-center
                        justify-center
                        mb-4
                      "
                      >
                        <Icon size={28} className="text-violet-400" />
                      </div>

                      <h3 className="text-white text-lg font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-slate-400 mt-2">{item.desc}</p>

                      <div className="mt-4 flex items-center text-violet-400">
                        Open
                        <ArrowRight
                          size={16}
                          className="
                          ml-2
                          group-hover:translate-x-1
                          transition
                        "
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}

            <div
              className="
              bg-[#0f172a]
              border
              border-white/10
              rounded-3xl
              p-6
            "
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Recent Activity
              </h2>

              {stats.recentActivity?.length === 0 ? (
                <p className="text-slate-400">No recent activity found.</p>
              ) : (
                <div className="space-y-4">
                  {stats.recentActivity.map((activity) => (
                    <div
                      key={activity._id}
                      className="
                        flex
                        justify-between
                        border-b
                        border-white/5
                        pb-3
                      "
                    >
                      <span className="text-white">
                        {activity.passId?.visitorId?.name}
                      </span>

                      <span className="text-slate-400 text-sm">
                        {new Date(activity.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </SecurityLayout>
  );
};

export default SecurityDashboard;
