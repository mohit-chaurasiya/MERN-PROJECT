import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";
import { notify } from "../../utils/notify";
import { motion } from "framer-motion";
import { Trash2, Search } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let data = [...users];

    if (roleFilter !== "all") {
      data = data.filter((u) => u.role === roleFilter);
    }

    if (search) {
      data = data.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredUsers(data);
  }, [users, search, roleFilter]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("auth/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);

      notify.success("User deleted");

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      notify.error("Failed to delete user");
    }
  };

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
          p-6
          "
        >
          <h1 className="text-3xl font-bold text-white">User Management</h1>

          <p className="text-slate-300 mt-2">
            Manage employees and security staff.
          </p>
        </div>

        {/* SEARCH */}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search
              size={18}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              pl-11
              p-3
              rounded-2xl
              bg-[#0f172a]
              border border-white/10
              text-white
              "
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="
            p-3
            rounded-2xl
            bg-[#0f172a]
            border border-white/10
            text-white
            "
          >
            <option value="all">All Roles</option>

            <option value="employee">Employee</option>

            <option value="security">Security</option>
          </select>
        </div>

        {/* USER LIST */}

        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <motion.div
              key={user._id}
              whileHover={{
                y: -4,
              }}
              className="
              bg-[#0f172a]
              border border-white/10
              rounded-3xl
              p-5
              flex
              items-center
              justify-between
              "
            >
              <div>
                <h3 className="text-white font-semibold">{user.name}</h3>

                <p className="text-slate-400 text-sm">{user.email}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`
                  px-3 py-1 rounded-full text-sm
                  ${
                    user.role === "employee"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-green-500/20 text-green-400"
                  }
                  `}
                >
                  {user.role}
                </span>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="
                  p-2
                  rounded-xl
                  bg-red-500/10
                  text-red-400
                  hover:bg-red-500
                  hover:text-white
                  transition
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
