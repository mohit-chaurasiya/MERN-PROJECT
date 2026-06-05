import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
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

function EmployeeAppointmentTable() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data.appointments);
    } catch (err) {
      notify.error("Failed to get appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const approveAppointment = async (id) => {
    try {
      setButtonLoading(id);
      await API.patch(`/appointments/${id}/approve`);
      notify.success("Appointment approved");
      fetchAppointments();
    } catch {
      notify.error("Failed to approve");
    } finally {
      setButtonLoading(null);
    }
  };

  const rejectAppointment = async (id) => {
    try {
      setButtonLoading(id);
      await API.patch(`/appointments/${id}/reject`);
      notify.success("Appointment rejected");
      fetchAppointments();
    } catch {
      notify.error("Failed to reject");
    } finally {
      setButtonLoading(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setButtonLoading(id);
      await API.delete(`/appointments/${id}`);
      notify.success("Appointment deleted");
      fetchAppointments();
    } catch {
      notify.error("Unable to delete");
    } finally {
      setButtonLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "approved")
      return <Badge className="bg-green-500/20 text-green-400">Approved</Badge>;

    if (status === "pending")
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>
      );

    if (status === "rejected")
      return <Badge className="bg-red-500/20 text-red-400">Rejected</Badge>;
  };

  return (
    <EmployeeLayout>
      <motion.div
        className="max-w-6xl mx-auto px-4 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transiton={{ durataion: 0.5 }}
      >
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
          <h1 className="text-3xl font-bold text-white">
            Appointment Management
          </h1>

          <p className="text-slate-300 mt-2">
            Track and manage all visitor appointments.
          </p>
        </div>

        {/* APPOINTMENT STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Total</p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {appointments.length}
            </h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Pending</p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              {appointments.filter((a) => a.status === "pending").length}
            </h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Approved</p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              {appointments.filter((a) => a.status === "approved").length}
            </h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Rejected</p>

            <h2 className="text-3xl font-bold text-red-400 mt-2">
              {appointments.filter((a) => a.status === "rejected").length}
            </h2>
          </div>
        </div>

        {/* Table Card */}
        <div
          className="
        bg-[#1e293b] border border-gray-800 rounded-xl 
        shadow-lg overflow-x-auto
        "
        >
          <div className="hidden lg:block">
            <Table className="text-gray-300 overflow-hidden">
              {/* Header */}
              <TableHeader className="bg-[#0f172a] text-white">
                <TableRow>
                  <TableHead className="text-center text-white">#</TableHead>
                  <TableHead className="text-center text-white">
                    Visitor
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Purpose
                  </TableHead>
                  <TableHead className="text-center text-white">Date</TableHead>
                  <TableHead className="text-center text-white">
                    Status
                  </TableHead>
                  <TableHead className="text-left text-white">Action</TableHead>
                </TableRow>
              </TableHeader>

              {loading ? (
                <TableSkeleton rows={6} columns={6} />
              ) : appointments.length === 0 ? (
                // 🔥 EMPTY STATE
                <TableBody>
                  <TableRow>
                    <TableCell colSpan="6" className="text-center p-12">
                      <div className="flex flex-col items-center gap-3 text-gray-400">
                        <span className="text-4xl">📭</span>
                        <p className="text-lg font-medium">No Appointments</p>
                        <p className="text-sm">Create one to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {appointments.map((a, index) => (
                    <TableRow
                      key={a._id}
                      className="
                    border-t border-gray-800 
                    hover:bg-[#0f172a] 
                    hover:scale-[1.01] 
                    transition duration-200
                    "
                    >
                      <TableCell className="text-center">{index + 1}</TableCell>

                      <TableCell className="text-center">
                        {a.visitorId?.name}
                      </TableCell>

                      <TableCell className="text-center">{a.purpose}</TableCell>

                      <TableCell className="text-center">
                        {new Date(a.date).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-center">
                        {getStatusBadge(a.status)}
                      </TableCell>

                      <TableCell className="flex gap-2">
                        {a.status === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              className="
                            bg-blue-500/10 text-blue-400 
                            hover:bg-blue-600 hover:text-white
                            transition
                            "
                              disabled={buttonLoading === a._id}
                              onClick={() => approveAppointment(a._id)}
                            >
                              {buttonLoading === a._id ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                "Approve"
                              )}
                            </Button>

                            <Button
                              size="sm"
                              className="
                            bg-red-500/10 text-red-400 
                            hover:bg-red-600 hover:text-white
                            transition
                            "
                              disabled={buttonLoading === a._id}
                              onClick={() => rejectAppointment(a._id)}
                            >
                              {buttonLoading === a._id ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                "Reject"
                              )}
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            className="
                          bg-red-500/10 text-red-400 
                          hover:bg-red-600 hover:text-white
                          transition
                          "
                            disabled={buttonLoading === a._id}
                            onClick={() => handleDelete(a._id)}
                          >
                            {buttonLoading === a._id ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>

          <div className="lg:hidden space-y-4">
            {appointments.map((a) => (
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

                <p className="text-slate-400 mt-3">{a.purpose}</p>

                <p className="text-slate-500 text-sm mt-2">
                  {new Date(a.date).toLocaleDateString()}
                </p>

                <div className="flex gap-2 mt-4">
                  {a.status === "pending" ? (
                    <>
                      <Button
                        className="
        flex-1
        bg-blue-500/10
        text-blue-400
        hover:bg-blue-600
        hover:text-white
        "
                        disabled={buttonLoading === a._id}
                        onClick={() => approveAppointment(a._id)}
                      >
                        {buttonLoading === a._id ? "..." : "Approve"}
                      </Button>

                      <Button
                        className="
        flex-1
        bg-red-500/10
        text-red-400
        hover:bg-red-600
        hover:text-white
        "
                        disabled={buttonLoading === a._id}
                        onClick={() => rejectAppointment(a._id)}
                      >
                        {buttonLoading === a._id ? "..." : "Reject"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="
      flex-1
      bg-red-500/10
      text-red-400
      hover:bg-red-600
      hover:text-white
      "
                      disabled={buttonLoading === a._id}
                      onClick={() => handleDelete(a._id)}
                    >
                      {buttonLoading === a._id ? "..." : "Delete"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </EmployeeLayout>
  );
}

export default EmployeeAppointmentTable;
