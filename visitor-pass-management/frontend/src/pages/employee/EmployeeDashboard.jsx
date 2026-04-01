import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import API from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";
import { employeeDashboardConfig } from "../../config/dashboardConfig";
import GradientStatCard from "../../components/ui/GradientStatCard";
import ChartCard from "@/components/ui/ChartCard";
import { motion } from "framer-motion"
 
const EmployeeDashboard = () => {

  const { user } = useAuth();
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState({});

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await API.get("/dashboard/employee");
        const chartRes = await API.get("/dashboard/weekly")
        setCount(res.data);
        setChartData(chartRes.data)
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
    <EmployeeLayout
    
    >
      <h1 className="text-2xl font-bold text-white mb-6">
        Welcome {user?.name?.split(" ")[0]} 😊
      </h1>

      {loading ? (
        <DashboardSkeleton count={5} />
      ) : (
        <motion.div className="max-w-6xl mx-auto"
       >
          <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid  grid-cols-1  px-4 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {employeeDashboardConfig.map((item, i) => (
           <motion.div key={i} variants={items}>
             <GradientStatCard
              key={i}
              title={item.title}
              value={count[item.key] || 0}
              icon={item.icon}
              color={item.color}
              bg={item.bg}
            />
           </motion.div>
          ))}

        </motion.div>

        <motion.div className="mt-8 hover:shadow-lg hover:shadow-blue-500/20 transition rounded-xl"
        initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
        >
          <ChartCard data={chartData} />
        </motion.div>
        </motion.div>
      )}
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;