import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../../layouts/AdminLayout";

import { Eye, Delete } from "lucide-react";
import { notify } from "../../utils/notify";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

function Visitors() {
  const [loading, setLoading] = useState(true);

  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVisitors = async () => {
      const res = await API.get("/visitors");
      setVisitors(res.data || []);
      console.log(res.data);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    fetchVisitors();
  }, []);

  const deleteVisitor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this visitor?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/visitors/${id}`);

      setVisitors(visitors.filter((v) => v._id !== id));

      notify.success("Visitor Deleted Successfully !");
    } catch (err) {
      console.log(err);
      notify.error("Deleted failed !");
    }
  };

  const filteredVisitor = (visitors || []).filter((visitor) =>
    visitor.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
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
        <h1 className="text-3xl font-bold text-white">Visitor Management</h1>

        <p className="text-slate-300 mt-2">
          View, search and manage registered visitors.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0f172a] rounded-3xl p-5 border border-white/10">
          <p className="text-slate-400 text-sm">Total Visitors</p>

          <h2 className="text-white text-3xl font-bold mt-2">
            {visitors.length}
          </h2>
        </div>

        <div className="bg-[#0f172a] rounded-3xl p-5 border border-white/10">
          <p className="text-slate-400 text-sm">Search Results</p>

          <h2 className="text-white text-3xl font-bold mt-2">
            {filteredVisitor.length}
          </h2>
        </div>
      </div>

      <div
        className="bg-[#0f172a]
  border border-white/10
  rounded-3xl
  p-6"
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search visitor..."
          className=" w-full
  bg-[#0f172a]
  border border-white/10
  text-white
  p-3
  rounded-2xl
  mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Laptop view */}

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-900 border-b border-white/10">
              <tr>
                <th className="p-4 text-slate-400 font-medium">Sr. No</th>
                <th className="p-4 text-slate-400 font-medium">Name</th>
                <th className="p-4 text-slate-400 font-medium">Email</th>
                {/* <th className="p-4 text-slate-400 font-medium">Purpose</th> */}
                <th className="p-4 text-slate-400 font-medium">Host</th>
                <th className="p-4 text-slate-400 font-medium">Created</th>
                <th className="p-4 text-slate-400 font-medium">Action</th>
              </tr>
            </thead>

            {loading ? (
              <TableSkeleton rows={6} columns={7} />
            ) : (
              <tbody>
                {filteredVisitor.length === 0 ? (
                  <div className="flex flex-col items-center">
                    <div className="text-6xl animate-bounce mb-4">👥</div>

                    <h3 className="text-white text-xl font-semibold">
                      No Visitors Found
                    </h3>

                    <p className="text-slate-400 mt-2">
                      No visitor records available at the moment.
                    </p>
                  </div>
                ) : (
                  filteredVisitor.map((visitor, index) => (
                    <tr
                      key={visitor._id}
                      className="border-b border-white/5
  hover:bg-slate-900/50
  transition"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3 font-medium">{visitor.name}</td>
                      <td className="p-3">{visitor.email}</td>
                      {/* <td className="p-3">{visitor?.purpose}</td> */}
                      <td className="p-3">{visitor.host}</td>

                      <td>
                        {new Date(visitor.createdAt).toLocaleDateString()}
                      </td>
                      <td className="gap-2">
                        <button
                          className="bg-blue-500/10
text-blue-400
hover:bg-blue-500
hover:text-white
p-2
rounded-xl
transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="bg-red-500/10
text-red-400
hover:bg-red-500
hover:text-white
p-2
rounded-xl
transition"
                          onClick={() => deleteVisitor(visitor._id)}
                        >
                          <Delete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>

        {/* Mobile View */}

        <div className="lg:hidden space-y-4">
          {filteredVisitor.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-12 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-6xl animate-bounce mb-4">👥</div>

                  <h3 className="text-white text-xl font-semibold">
                    No Visitors Found
                  </h3>

                  <p className="text-slate-400 mt-2">
                    No visitor records available at the moment.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            filteredVisitor.map((visitor) => (
              <div
                key={visitor._id}
                className="
      bg-[#0f172a]
      border border-white/10
      rounded-3xl
      p-5
      "
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">{visitor.name}</h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {visitor.email}
                    </p>
                  </div>

                  <span
                    className="
          bg-violet-500/10
          text-violet-400
          px-3 py-1
          rounded-full
          text-xs
          "
                  >
                    Visitor
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-slate-400 text-sm">
                    Purpose:
                    <span className="text-white ml-2">{visitor.purpose}</span>
                  </p>

                  <p className="text-slate-400 text-sm">
                    Host:
                    <span className="text-white ml-2">{visitor.host}</span>
                  </p>

                  <p className="text-slate-400 text-sm">
                    Created:
                    <span className="text-white ml-2">
                      {new Date(visitor.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    className="
          flex-1
          bg-blue-500/10
          text-blue-400
          py-2
          rounded-xl
          "
                  >
                    View
                  </button>

                  <button
                    onClick={() => deleteVisitor(visitor._id)}
                    className="
          flex-1
          bg-red-500/10
          text-red-400
          py-2
          rounded-xl
          "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Visitors;
