import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { notify } from "../../utils/notify";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { motion } from "framer-motion";

function Visitors() {
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await API.get("/visitors");
        setVisitors(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  const filteredVisitors = visitors.filter((visitor) => {
    return (
      visitor.name.toLowerCase().includes(search.toLowerCase()) ||
      visitor.email.toLowerCase().includes(search.toLowerCase()) ||
      visitor.phone.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async (id) => {
    try {
      await API.delete(`/visitors/${id}`);
      notify.success("Visitor deleted successfully");

      // ✅ FIXED STATE UPDATE
      setVisitors((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      notify.error("Failed to delete visitor");
    }
  };

  return (
    <EmployeeLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transiton={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 space-y-6"
      >
        {/* Heading */}
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
          <h1 className="text-3xl font-bold text-white">My Visitors</h1>

          <p className="text-slate-300 mt-2">
            Manage and track registered visitors.
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search Visitor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
    bg-[#0f172a]
    border border-white/10
    text-white
    p-3
    rounded-2xl
    md:w-80
    outline-none
    "
          />

          <div
            className="
    bg-[#0f172a]
    border border-white/10
    rounded-2xl
    px-5
    py-3
    text-white
    "
          >
            Total Visitors: {filteredVisitors.length}
          </div>
        </div>

        {/* Table */}
        <div className="hidden lg:block">
          <div
            className="
        bg-[#1e293b] border border-gray-800 rounded-xl 
        shadow-lg overflow-x-auto
        "
          >
            <table className="w-full text-sm text-gray-300 overflow-hidden">
              {/* Head */}
              <thead className="bg-[#0f172a] text-gray-400">
                <tr>
                  <th className="p-3 text-left">Sr.no</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Mobile No</th>
                  <th className="p-3 text-left">Host</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              {/* Body */}
              {loading ? (
                <TableSkeleton rows={6} columns={6} />
              ) : filteredVisitors.length === 0 ? (
                // 🔥 EMPTY STATE
                <div className="py-16 text-center">
                  <div className="text-6xl mb-4">👥</div>

                  <h2 className="text-xl text-white font-semibold">
                    No Visitors Found
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Create your first visitor.
                  </p>
                </div>
              ) : (
                <tbody>
                  {filteredVisitors.map((visitor, index) => (
                    <tr
                      key={visitor._id}
                      className="
                    border-t border-gray-800 
                    hover:bg-[#0f172a] 
                    hover:scale-[1.01] 
                    transition duration-200
                    "
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{visitor.name}</td>
                      <td className="p-3">{visitor.email}</td>
                      <td className="p-3">{visitor.phone}</td>
                      <td className="p-3">{visitor.host}</td>

                      <td className="p-3 flex gap-2">
                        {/* Appointment */}
                        <button
                          onClick={() =>
                            navigate("/employee/create-appointments", {
                              state: { visitorId: visitor._id },
                            })
                          }
                          className="
                        bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg 
                        hover:bg-blue-600 hover:text-white 
                        hover:shadow-md hover:shadow-blue-500/20
                        transition
                        "
                        >
                          Appointment
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(visitor._id)}
                          className="
                        bg-red-500/10 text-red-400 px-3 py-1 rounded-lg 
                        hover:bg-red-600 hover:text-white 
                        hover:shadow-md hover:shadow-red-500/20
                        transition
                        "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {filteredVisitors.map((visitor) => (
            <div
              key={visitor._id}
              className="
      bg-[#0f172a]
      border border-white/10
      rounded-3xl
      p-5
      "
            >
              <h3 className="text-white font-semibold text-lg">
                {visitor.name}
              </h3>

              <p className="text-slate-400 text-sm mt-2">{visitor.email}</p>

              <p className="text-slate-400 text-sm">{visitor.phone}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    navigate("/employee/create-appointments", {
                      state: {
                        visitorId: visitor._id,
                      },
                    })
                  }
                  className="
          flex-1
          bg-blue-600
          text-white
          py-2
          rounded-xl
          "
                >
                  Appointment
                </button>

                <button
                  onClick={() => handleDelete(visitor._id)}
                  className="
          flex-1
          bg-red-600
          text-white
          py-2
          rounded-xl
          "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </EmployeeLayout>
  );
}

export default Visitors;
