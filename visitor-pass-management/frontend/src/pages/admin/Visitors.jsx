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
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Visitors</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search visitor..."
          className="border p-2 rounded mb-4 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Sr. No</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Host</th>
                <th className="p-3">Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            {loading ? (
              <TableSkeleton rows={6} columns={7} />
            ) : (
              <tbody>
                {filteredVisitor.map((visitor, index) => (
                  <tr key={visitor._id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{visitor.name}</td>
                    <td className="p-3">{visitor.email}</td>
                    <td className="p-3">{visitor.purpose}</td>
                    <td className="p-3">{visitor.host}</td>

                    <td>{new Date(visitor.createdAt).toLocaleDateString()}</td>
                    <td className="gap-2">
                      <button className="bg-blue-300 text-blue-900 border-blue-900 border px-3 py-1 rounded me-2 cursor-pointer">
                        <Eye size={18} />
                      </button>
                      <button
                        className="bg-red-300 text-red-900 border-red-800 border px-3 py-1 rounded cursor-pointer"
                        onClick={() => deleteVisitor(visitor._id)}
                      >
                        <Delete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Visitors;
