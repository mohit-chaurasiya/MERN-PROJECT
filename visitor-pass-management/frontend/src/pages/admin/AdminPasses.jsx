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

function AdminPasses() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchPasses = async () => {
    try {
      const res = await API.get("/passes");
      console.log(res.data);
      setPasses(res.data);
    } catch (err) {
      notify.error("Failed to fetch passes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasses();
  }, []);

  const handleDelete = async (id) => {
    try {
      setButtonLoading(id);

      await API.delete(`/passes/${id}`);

      notify.success("Pass deleted successfully");

      setPasses((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      notify.error("Unable to delete pass");
    } finally {
      setButtonLoading(null);
    }
  };

  const filteredPasses = passes.filter((p) => {
    const matchesSearch =
      p.passNumber?.toLowerCase().includes(search.toLowerCase()) ||
      p.visitorId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.hostId?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const total = passes.length;

  const active = passes.filter((p) => p.status === "active").length;

  const expired = passes.filter((p) => p.status === "expired").length;

  const today = passes.filter((p) => {
    const created = new Date(p.createdAt).toDateString();

    return created === new Date().toDateString();
  }).length;

  const getStatusBadge = (status) => {
    if (status === "active") {
      return <Badge className="bg-green-500/20 text-green-400">Active</Badge>;
    }

    if (status === "expired") {
      return <Badge className="bg-red-500/20 text-red-400">Expired</Badge>;
    }

    return <Badge className="bg-yellow-500/20 text-yellow-400">{status}</Badge>;
  };

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
          bg-linear-to-r
          from-violet-600/20
          via-blue-600/20
          to-cyan-600/20
          p-6
          "
        >
          <h1 className="text-3xl font-bold text-white">Pass Management</h1>

          <p className="text-slate-300 mt-2">
            Manage and monitor all visitor passes.
          </p>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Total Passes</p>

            <h2 className="text-3xl font-bold text-white mt-2">{total}</h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Active</p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">{active}</h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Expired</p>

            <h2 className="text-3xl font-bold text-red-400 mt-2">{expired}</h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
            <p className="text-slate-400 text-sm">Created Today</p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">{today}</h2>
          </div>
        </div>

        {/* SEARCH */}

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search pass, visitor or host..."
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

            <option value="active">Active</option>

            <option value="expired">Expired</option>
          </select>
        </div>

        {/* DESKTOP */}

        <div className="hidden lg:block bg-[#1e293b] border border-gray-800 rounded-xl overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#0f172a]">
              <TableRow>
                <TableHead className="text-white text-center">
                  Pass No
                </TableHead>

                <TableHead className="text-white text-center">
                  Visitor
                </TableHead>

                <TableHead className="text-white text-center">Host</TableHead>

                <TableHead className="text-white text-center">QR</TableHead>

                <TableHead className="text-white text-center">Status</TableHead>

                <TableHead className="text-white text-center">
                  Valid Till
                </TableHead>

                <TableHead className="text-white text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            {loading ? (
              <TableSkeleton rows={6} columns={7} />
            ) : (
              <TableBody>
                {filteredPasses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-16">
                      <div className="text-7xl mb-4">🎫</div>

                      <h2 className="text-xl text-white font-semibold">
                        No Passes Found
                      </h2>

                      <p className="text-slate-400 mt-2">
                        Passes will appear here.
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPasses.map((pass) => (
                    <TableRow
                      key={pass._id}
                      className="
                      border-t border-gray-800
                      hover:bg-[#0f172a]
                      transition
                      
                      "
                    >
                      <TableCell className="text-center">
                        {pass.passNumber}
                      </TableCell>

                      <TableCell className="text-center">
                        {pass.visitorId?.name}
                      </TableCell>

                      <TableCell className="text-center">
                        {pass.visitorId?.host}
                      </TableCell>

                      <TableCell className="text-center">
                        <img
                          src={pass.qrCode}
                          alt="QR"
                          className="w-14 h-14 rounded-lg text-center"
                        />
                      </TableCell>

                      <TableCell className="text-center">
                        {getStatusBadge(pass.status)}
                      </TableCell>

                      <TableCell className="text-center">
                        {new Date(pass.validTill).toLocaleDateString()}
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
                          disabled={buttonLoading === pass._id}
                          onClick={() => handleDelete(pass._id)}
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
          {filteredPasses.length === 0 ? (
            <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-10 text-center">
              <div className="text-7xl mb-4">🎫</div>

              <h2 className="text-xl text-white font-semibold">
                No Passes Found
              </h2>
            </div>
          ) : (
            filteredPasses.map((pass) => (
              <div
                key={pass._id}
                className="
                bg-[#0f172a]
                border border-white/10
                rounded-3xl
                p-5
                "
              >
                <div className="flex justify-between">
                  <h3 className="text-white font-semibold">
                    {pass.passNumber}
                  </h3>

                  {getStatusBadge(pass.status)}
                </div>

                <div className="flex justify-center mt-4">
                  <img src={pass.qrCode} alt="QR" className="w-24 h-24" />
                </div>

                <p className="text-slate-400 mt-4">
                  Visitor: {pass.visitorId?.name}
                </p>

                <p className="text-slate-400">Host: {pass.visitorId?.host}</p>

                <p className="text-slate-500 text-sm mt-2">
                  Valid Till: {new Date(pass.validTill).toLocaleDateString()}
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
                  disabled={buttonLoading === pass._id}
                  onClick={() => handleDelete(pass._id)}
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

export default AdminPasses;
