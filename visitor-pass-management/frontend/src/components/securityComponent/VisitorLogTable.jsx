import React from "react";

function VisitorLogTable({ logs }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-300">
        <thead>
          <tr className="border-b border-white/10">
            <th className="p-4">#</th>
            <th className="p-4">Visitor</th>
            <th className="p-4">Host</th>
            <th className="p-4">Purpose</th>
            <th className="p-4">Check In</th>
            <th className="p-4">Check Out</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="
                text-center
                p-10
                text-slate-400
              "
              >
                No visitor logs found
              </td>
            </tr>
          ) : (
            logs.map((log, index) => (
              <tr
                key={index}
                className="
                border-b
                border-white/5
                hover:bg-white/5
                transition
              "
              >
                <td className="p-4">{index + 1}</td>

                <td className="p-4 font-medium text-white">
                  {log.visitorName}
                </td>

                <td className="p-4">{log.hostName}</td>

                <td className="p-4">{log.purpose}</td>

                <td className="p-4">
                  {new Date(log.checkIn).toLocaleString()}
                </td>

                <td className="p-4">
                  {log.checkOut ? new Date(log.checkOut).toLocaleString() : "-"}
                </td>

                <td className="p-4">
                  {log.checkOut ? (
                    <span
                      className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      bg-red-500/20
                      text-red-400
                    "
                    >
                      Checked Out
                    </span>
                  ) : (
                    <span
                      className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      bg-green-500/20
                      text-green-400
                    "
                    >
                      Active
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VisitorLogTable;
