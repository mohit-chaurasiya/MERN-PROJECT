import React, { useEffect, useState } from "react";

import EmployeeLayout from "../../layouts/EmployeeLayout";
import API from "../../services/api";
import { notify } from "../../utils/notify";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

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

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      console.log(err);
      notify.error("Failed to get appointments");
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
    } catch (err) {
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
    } catch (err) {
      notify.error("Failed to reject");
    } finally {
      setButtonLoading(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setButtonLoading(id);

      await API.delete(`/appointments/${id}`);

      notify.success("Appointment deleted successfully");

      fetchAppointments();
    } catch (error) {
      notify.error("Unable to delete appointment");
    } finally {
      setButtonLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "approved")
      return <Badge className="bg-green-500">Approved</Badge>;

    if (status === "pending")
      return <Badge variant="secondary">Pending</Badge>;

    if (status === "rejected")
      return <Badge variant="destructive">Rejected</Badge>;
  };

  return (
    <EmployeeLayout>
      <h1 className="text-2xl font-bold mb-6">Appointment table</h1>

      <div className="bg-white rounded-xl shadow w-full ">

        <Table>

          <TableHeader>
            <TableRow>
              <TableHead>Sr.no</TableHead>
              <TableHead>Visitor</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          {loading ? (
            <TableSkeleton rows={appointments?.length || 8} columns={6} />
          ) : (
            <TableBody>

              {appointments.map((a, index) => (

                <TableRow className='hover:bg-gray-100 ' key={a._id}>

                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{a.visitorId?.name}</TableCell>

                  <TableCell>{a.purpose}</TableCell>

                  <TableCell>
                    {new Date(a.date).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {getStatusBadge(a.status)}
                  </TableCell>

                  <TableCell className="flex gap-2 justify-end">

                    {a.status === "pending" ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-blue-200 text-blue-600 cursor-pointer"
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
                          variant="destructive"
                          className='cursor-pointer'
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
                        variant="destructive"
                        className='cursor-pointer'
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
    </EmployeeLayout>
  );
}

export default EmployeeAppointmentTable;