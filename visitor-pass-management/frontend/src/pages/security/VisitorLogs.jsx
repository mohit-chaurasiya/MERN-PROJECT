import VisitorLogTable from "@/components/securityComponent/VisitorLogTable";
import SecurityLayout from "@/layouts/SecurityLayout";
import API from "@/services/api";
import React, { useEffect, useState } from "react";

function VisitorLogs() {
  const [logs, setLogs] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchLogs = async (fromDate = "", toDate = "") => {
    try {
      let url = "/check/logs";

      if (fromDate && toDate) {
        url += `?from=${fromDate}&to=${toDate}`;
      }

      const res = await API.get(url);
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // filter

  const handleToday = () => {
    const today = new Date().toISOString().split("T")[0];

    setFrom(today);
    setTo(today);

    fetchLogs(today, today);
  };

  const handleLast7Days = () => {
    const today = new Date();
    const last7 = new Date();

    last7.setDate(today.getDate() - 7);

    const toDate = today.toISOString().split("T")[0];
    const fromDate = last7.toISOString().split("T")[0];

    setFrom(fromDate);
    setTo(toDate);

    fetchLogs(fromDate, toDate);
  };

  // Custom Filter
  const handleFilter = () => {
    fetchLogs(from, to);
  };

  // Export CSV

  const handleExport = () => {
    const headers = ["Visitor", "Host", "Purpose", "Check  In", "Check Out"];

    const rows = logs.map((log) => [
      log.visitorName,
      log.hostName,
      log.purpose,
      new Date(log.checkIn).toLocaleString(),
      log.checkOutTime ? new Date(log.checkOut).toLocaleString() : "-",
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodeUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodeUri);
    link.setAttribute("download", "visitor_logs.csv");

    document.body.appendChild(link);
    link.click();
  };

  return (
    <SecurityLayout>
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
        <h1 className="text-3xl font-bold text-white">Visitor Logs</h1>

        <p className="text-slate-300 mt-2">
          Monitor visitor entry and exit records.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Total Logs</p>

          <h2 className="text-3xl font-bold text-white mt-2">{logs.length}</h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Today's Entries</p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {
              logs.filter((log) => {
                const today = new Date().toLocaleDateString();

                return new Date(log.checkIn).toLocaleDateString() === today;
              }).length
            }
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Checked Out</p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {logs.filter((log) => log.checkOutTime).length}
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Active Visitors</p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {logs.filter((log) => !log.checkOutTime).length}
          </h2>
        </div>
      </div>

      <div
        className="bg-[#0f172a]
  border border-white/10
  rounded-3xl
  p-5
  mb-6"
      >
        <div className="flex flex-wrap gap-3">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-slate-900
border border-white/10
text-white
px-4 py-2
rounded-xl"
          />

          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-slate-900
border border-white/10
text-white
px-4 py-2
rounded-xl"
          />

          <button
            onClick={handleFilter}
            className="bg-violet-600
hover:bg-violet-700
text-white
px-4 py-2
rounded-xl
transition "
          >
            Filter
          </button>

          <button
            onClick={handleToday}
            className="bg-slate-700
hover:bg-slate-600
text-white
px-4 py-2
rounded-xl"
          >
            Today
          </button>

          <button
            onClick={handleLast7Days}
            className="bg-slate-700
hover:bg-slate-600
text-white
px-4 py-2
rounded-xl"
          >
            Last 7 Day
          </button>

          <button
            onClick={handleExport}
            className="bg-green-600
hover:bg-green-700
text-white
px-4 py-2
rounded-xl"
          >
            Export CSV
          </button>

          {/* table */}
        </div>
      </div>

      <div
        className="
  bg-[#0f172a]
  border border-white/10
  rounded-3xl
  p-5
"
      >
        <VisitorLogTable logs={logs} />
      </div>
    </SecurityLayout>
  );
}

export default VisitorLogs;
