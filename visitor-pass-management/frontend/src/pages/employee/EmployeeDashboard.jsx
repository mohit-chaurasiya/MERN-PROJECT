import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import API from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";
import { employeeDashboardConfig } from "../../config/dashboardConfig";
import GradientStatCard from "../../components/ui/GradientStatCard";
import ChartCard from "@/components/ui/ChartCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserPlus, CalendarPlus, Users, ArrowRight } from "lucide-react";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState({});

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await API.get("/dashboard/employee");
        const chartRes = await API.get("/dashboard/weekly");

        setCount(res.data);
        setChartData(chartRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const items = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <EmployeeLayout>
      {/* HERO */}

      <div
        className="
        mb-6
        rounded-3xl
        border border-white/10
        bg-gradient-to-r
        from-violet-600/20
        via-blue-600/20
        to-cyan-600/20
        p-6
      "
      >
        <h1 className="text-3xl font-bold text-white">
          Welcome Back, {user?.name?.split(" ")[0]} 👋
        </h1>

        <p className="text-slate-300 mt-2">
          Manage visitors and appointments efficiently.
        </p>
      </div>

      {loading ? (
        <DashboardSkeleton count={5} />
      ) : (
        <motion.div
          className="max-w-7xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* STATS */}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="
            grid
            grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
            gap-4
          "
          >
            {employeeDashboardConfig.map((item, i) => (
              <motion.div key={i} variants={items}>
                <GradientStatCard
                  title={item.title}
                  value={count[item.key] || 0}
                  icon={item.icon}
                  color={item.color}
                  bg={item.bg}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* QUICK ACTIONS */}

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <Link
                to="/employee/create-visitor"
                className="
                bg-[#0f172a]
                border border-white/10
                rounded-3xl
                p-5
                hover:border-violet-500/50
                hover:bg-white/5
                transition
                "
              >
                <div className="flex items-center justify-between">
                  <UserPlus className="text-violet-400" size={24} />
                  <ArrowRight size={18} className="text-slate-400" />
                </div>

                <h3 className="text-white font-semibold mt-4">
                  Create Visitor
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Register a new visitor.
                </p>
              </Link>

              <Link
                to="/employee/create-appointments"
                className="
                bg-[#0f172a]
                border border-white/10
                rounded-3xl
                p-5
                hover:border-blue-500/50
                hover:bg-white/5
                transition
                "
              >
                <div className="flex items-center justify-between">
                  <CalendarPlus className="text-blue-400" size={24} />
                  <ArrowRight size={18} className="text-slate-400" />
                </div>

                <h3 className="text-white font-semibold mt-4">
                  Create Appointment
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Schedule a new appointment.
                </p>
              </Link>

              <Link
                to="/employee/visitors"
                className="
                bg-[#0f172a]
                border border-white/10
                rounded-3xl
                p-5
                hover:border-green-500/50
                hover:bg-white/5
                transition
                "
              >
                <div className="flex items-center justify-between">
                  <Users className="text-green-400" size={24} />
                  <ArrowRight size={18} className="text-slate-400" />
                </div>

                <h3 className="text-white font-semibold mt-4">My Visitors</h3>

                <p className="text-slate-400 text-sm mt-2">
                  View and manage visitors.
                </p>
              </Link>
            </div>
          </div>

          {/* CHART */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
            bg-[#0f172a]
            border border-white/10
            rounded-3xl
            p-2
          "
          >
            <ChartCard data={chartData} />
          </motion.div>

          {/* RECENT ACTIVITY */}

          <div
            className="
            bg-[#0f172a]
            border border-white/10
            rounded-3xl
            p-6
          "
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Activity
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-white">Total Visitors Registered</p>

                <p className="text-slate-400 text-sm mt-1">
                  {count.totalVisitor || 0} visitors created
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-white">Pending Appointments</p>

                <p className="text-slate-400 text-sm mt-1">
                  {count.pending || 0} requests waiting for approval
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-white">Approved Appointments</p>

                <p className="text-slate-400 text-sm mt-1">
                  {count.approved || 0} approved appointments
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;
