import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";
import { notify } from "../../utils/notify";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { motion } from "framer-motion";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      notify.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      setButtonLoading(id);

      await API.delete(`/appointments/${id}`);

      notify.success("Appointment deleted");

      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch {
      notify.error("Unable to delete appointment");
    } finally {
      setButtonLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "approved") {
      return <Badge className="bg-green-500/20 text-green-400">Approved</Badge>;
    }

    if (status === "rejected") {
      return <Badge className="bg-red-500/20 text-red-400">Rejected</Badge>;
    }

    return <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>;
  };

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.visitorId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.hostId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.purpose?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const total = appointments.length;

  const pending = appointments.filter((a) => a.status === "pending").length;

  const approved = appointments.filter((a) => a.status === "approved").length;

  const rejected = appointments.filter((a) => a.status === "rejected").length;

  return (
    <AdminLayout>
      <motion.div
        className="max-w-7xl mx-auto px-4 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
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
          <h1 className="text-3xl font-bold text-white">
            Appointment Management
          </h1>

          <p className="text-slate-300 mt-2">
            Monitor all visitor appointments.
          </p>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Total</p>

            <h2 className="text-3xl font-bold text-white mt-2">{total}</h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Pending</p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              {pending}
            </h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Approved</p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              {approved}
            </h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Rejected</p>

            <h2 className="text-3xl font-bold text-red-400 mt-2">{rejected}</h2>
          </div>
        </div>

        {/* SEARCH + FILTER */}

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search visitor, host or purpose..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            bg-[#0f172a]
            border border-white/10
            text-white
            rounded-2xl
            p-3
            outline-none
            "
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
            bg-[#0f172a]
            border border-white/10
            text-white
            rounded-2xl
            p-3
            "
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* DESKTOP */}

        <div
          className="
          hidden lg:block
          bg-[#1e293b]
          border border-gray-800
          rounded-xl
          overflow-x-auto
          "
        >
          <Table>
            <TableHeader className="bg-[#0f172a]">
              <TableRow>
                <TableHead className="text-white text-center">#</TableHead>

                <TableHead className="text-white text-center">
                  Visitor
                </TableHead>

                <TableHead className="text-white text-center">Host</TableHead>

                <TableHead className="text-white text-center">
                  Purpose
                </TableHead>

                <TableHead className="text-white text-center">Date</TableHead>

                <TableHead className="text-white text-center">Status</TableHead>

                <TableHead className="text-white text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            {loading ? (
              <TableSkeleton rows={6} columns={7} />
            ) : (
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-16">
                      <div className="text-7xl mb-4">📅</div>

                      <h2 className="text-xl text-white font-semibold">
                        No Appointments Found
                      </h2>

                      <p className="text-slate-400 mt-2">
                        Appointments will appear here.
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((a, index) => (
                    <TableRow
                      key={a._id}
                      className="
                        border-t border-gray-800
                        hover:bg-[#0f172a]
                        transition
                        "
                    >
                      <TableCell className="text-center">{index + 1}</TableCell>

                      <TableCell className="text-center">
                        {a.visitorId?.name}
                      </TableCell>

                      <TableCell className="text-center">
                        {a.hostId?.name}
                      </TableCell>

                      <TableCell className="text-center">{a.purpose}</TableCell>

                      <TableCell className="text-center">
                        {new Date(a.date).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-center">
                        {getStatusBadge(a.status)}
                      </TableCell>

                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          className="
                            bg-red-500/10
                            text-red-400
                            hover:bg-red-600
                            hover:text-white
                            "
                          disabled={buttonLoading === a._id}
                          onClick={() => handleDelete(a._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            )}
          </Table>
        </div>

        {/* MOBILE */}

        <div className="lg:hidden space-y-4">
          {filteredAppointments.length === 0 ? (
            <div
              className="
              bg-[#0f172a]
              border border-white/10
              rounded-3xl
              p-10
              text-center
              "
            >
              <div className="text-7xl mb-4">📅</div>

              <h2 className="text-xl text-white font-semibold">
                No Appointments Found
              </h2>

              <p className="text-slate-400 mt-2">
                Appointments will appear here.
              </p>
            </div>
          ) : (
            filteredAppointments.map((a) => (
              <div
                key={a._id}
                className="
                bg-[#0f172a]
                border border-white/10
                rounded-3xl
                p-5
                "
              >
                <div className="flex justify-between">
                  <h3 className="text-white font-semibold">
                    {a.visitorId?.name}
                  </h3>

                  {getStatusBadge(a.status)}
                </div>

                <p className="text-slate-400 mt-3">Host: {a.hostId?.name}</p>

                <p className="text-slate-400">Purpose: {a.purpose}</p>

                <p className="text-slate-500 text-sm mt-2">
                  {new Date(a.date).toLocaleDateString()}
                </p>

                <Button
                  className="
                  mt-4
                  w-full
                  bg-red-500/10
                  text-red-400
                  hover:bg-red-600
                  hover:text-white
                  "
                  disabled={buttonLoading === a._id}
                  onClick={() => handleDelete(a._id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </AdminLayout>
  );
}

export default AdminAppointments;
