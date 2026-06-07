import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";
import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        console.log(res);
        setCount(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <DashboardSkeleton count={8} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HERO */}

        <div
          className="
          rounded-3xl
          border border-white/10
          bg-gradient-to-r
          from-violet-600/20
          via-blue-600/20
          to-cyan-600/20
          p-8
          "
        >
          <h1 className="text-4xl font-bold text-white">
            Admin Control Center
          </h1>

          <p className="text-slate-300 mt-3">
            Monitor users, visitors, passes and appointments.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          <span className="px-4 py-2 rounded-full bg-white/10 text-white text-sm">
            👨‍💼 {count.totalEmployee || 0} Employees
          </span>

          <span className="px-4 py-2 rounded-full bg-white/10 text-white text-sm">
            👥 {count.totalVisitors || 0} Visitors
          </span>

          <span className="px-4 py-2 rounded-full bg-white/10 text-white text-sm">
            🎫 {count.activePasses || 2} Active Passes
          </span>
        </div>

        {/* MAIN CARDS */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {
              title: "Employees",
              value: count.totalEmployee || 0,
              icon: "👨‍💼",
              route: "/admin/users",
              color: "from-violet-500/20 to-purple-500/20",
            },
            {
              title: "Visitors",
              value: count.totalVisitors || 0,
              icon: "👥",
              route: "/admin/visitors",
              color: "from-cyan-500/20 to-blue-500/20",
            },
            {
              title: "Pending Appointments",
              value: count.pendingAppointments || 0,
              icon: "📅",
              route: "/admin/appointments",
              color: "from-orange-500/20 to-amber-500/20",
            },
            {
              title: "Passes",
              value: count.activePasses || 0,
              icon: "🎫",
              route: "/admin/passes",
              color: "from-green-500/20 to-emerald-500/20",
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => navigate(card.route)}
              className={`
      cursor-pointer
      rounded-3xl
      p-5
      bg-linear-to-br
      ${card.color}
      border border-white/10
      backdrop-blur-xl
      hover:border-white/20
      hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]
      transition-all
      `}
            >
              <div className="text-4xl">{card.icon}</div>

              <p className="text-slate-300 mt-4 text-sm">{card.title}</p>

              <h2 className="text-white text-4xl font-bold mt-2">
                {card.value}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* SYSTEM STATS */}

        <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6">
          <h2 className="text-white text-xl font-semibold mb-6">
            System Overview
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Approved</p>

              <h3 className="text-green-400 text-3xl font-bold mt-2">
                {count.approveAppointments || 0}
              </h3>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Check-ins</p>

              <h3 className="text-blue-400 text-3xl font-bold mt-2">
                {count.todayCheckins || 0}
              </h3>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Check-outs</p>

              <h3 className="text-orange-400 text-3xl font-bold mt-2">
                {count.todayCheckout || 0}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
