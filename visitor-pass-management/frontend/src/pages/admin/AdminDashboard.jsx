import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

const AdminDashboard = () => {
  const [count, setCount] = useState({});

  useEffect(() => {
    const fetchCount = async () => {
      const res = await API.get("dashboard/stats");
      setCount(res.data);
    };

    fetchCount();
  }, []);

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Employees</h3>
          <p className="text-2xl font-bold text-blue-900">
            {count.totalEmployee}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Security</h3>
          <p className="text-2xl font-bold text-blue-900">
            {count.totalSecurity}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Visitors</h3>
          <p className="text-2xl font-bold text-blue-900">
            {count.totalVisitors}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Active Passes</h3>
          <p className="text-2xl font-bold text-blue-900">{count.activePasses}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Approved Appointements</h3>
          <p className="text-2xl font-bold text-blue-900">{count.approveAppointments}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Pending Appointements</h3>
          <p className="text-2xl font-bold text-blue-900">
            {count.pendingAppointments}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Rejected Appointements</h3>
          <p className="text-2xl font-bold text-blue-900">
            {count.rejectAppointments}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Today's Checkins</h3>
          <p className="text-2xl font-bold text-blue-900">
            {count.todayCheckins}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Today's Checkout</h3>
          <p className="text-2xl font-bold text-blue-900">
            {count.todayCheckout}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
