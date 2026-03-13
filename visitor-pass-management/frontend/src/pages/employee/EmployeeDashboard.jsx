import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";
import API from "../../services/api";
import { useAuth } from "../../hooks/useAuth";



const EmployeeDashboard = () => {




  const {user} = useAuth()

  const [count, setCount] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await API.get("/dashboard/employee");
        setCount(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCount();
  }, []);

  return (
    <EmployeeLayout>
      <h1 className="text-2xl font-bold mb-6">Welcome {user?.name.split(" ")[0]} 😊</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <User className="text-green-600" />
          </div>
          <p className="text-gray-500 text-sm">Total Visitors</p>
          <h2 className="text-bold font-bold">{count?.totalVisitor}</h2>
        </div>

        {/* Total appointment */}

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Calendar className="text-blue-600" />
          </div>
          <p className="text-gray-500 text-sm">Total Appointments</p>
          <h2 className="text-bold font-bold">{count?.total}</h2>
        </div>

        {/* pending  */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Clock className="text-yellow-600" />
          </div>

          <div>
            <p className="text-gray-500 text-sm">Pending Requests</p>
            <h2 className="text-xl font-bold">{count?.pending}</h2>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle className="text-green-600" />
          </div>

          <div>
            <p className="text-gray-500 text-sm">Approved</p>
            <h2 className="text-xl font-bold">{count?.approved}</h2>
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-lg">
            <XCircle className="text-red-600" />
          </div>

          <div>
            <p className="text-gray-500 text-sm">Approved</p>
            <h2 className="text-xl font-bold">{count?.approved}</h2>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;
