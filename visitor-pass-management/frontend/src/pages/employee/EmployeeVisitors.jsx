import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { notify } from "../../utils/notify";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { motion } from "framer-motion"

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
    <EmployeeLayout
    >
      <motion.div 
      initial={{ opacity: 0, y: 20}}
    animate={{ opacity: 1, y: 0}}
    transiton={{durataion: 0.5}}
      className="max-w-6xl mx-auto px-4 space-y-6">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-white">Visitors</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Visitor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          bg-[#1e293b] border border-gray-700 text-white 
          p-3 rounded-xl w-72 outline-none 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
          transition
          "
        />

        {/* Table */}
        <div className="
        bg-[#1e293b] border border-gray-800 rounded-xl 
        shadow-lg overflow-x-auto
        ">

          <table className="w-full text-sm text-gray-300">

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
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center p-12">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <span className="text-4xl">📭</span>
                      <p className="text-lg font-medium">No Visitors Found</p>
                      <p className="text-sm">Try adding a new visitor</p>
                    </div>
                  </td>
                </tr>
              </tbody>

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
      </motion.div>
    </EmployeeLayout>
  );
}

export default Visitors;