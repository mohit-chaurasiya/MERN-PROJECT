import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import API from "../../services/api";
import { notify } from "../../utils/notify";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { motion } from "framer-motion"

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
      return <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>;

    if (status === "rejected")
      return <Badge className="bg-red-500/20 text-red-400">Rejected</Badge>;
  };

  return (
    <EmployeeLayout>
      <motion.div className="max-w-6xl mx-auto px-4 space-y-6"
      initial={{ opacity: 0, y: 20}}
    animate={{ opacity: 1, y: 0}}
    transiton={{durataion: 0.5}}
      >

        <h1 className="text-2xl font-bold text-white">
          Appointments
        </h1>

        {/* Table Card */}
        <div className="
        bg-[#1e293b] border border-gray-800 rounded-xl 
        shadow-lg overflow-x-auto
        ">

          <Table className="text-gray-300">

            {/* Header */}
            <TableHeader className="bg-[#0f172a] text-white">
              <TableRow>
                <TableHead className="text-center text-white">#</TableHead>
                <TableHead className="text-center text-white">Visitor</TableHead>
                <TableHead className="text-center text-white">Purpose</TableHead>
                <TableHead className="text-center text-white">Date</TableHead>
                <TableHead className="text-center text-white">Status</TableHead>
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

                    <TableCell className="text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="text-center">
                      {a.visitorId?.name}
                    </TableCell>

                    <TableCell className="text-center">
                      {a.purpose}
                    </TableCell>

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
      </motion.div>
    </EmployeeLayout>
  );
}

export default EmployeeAppointmentTable;