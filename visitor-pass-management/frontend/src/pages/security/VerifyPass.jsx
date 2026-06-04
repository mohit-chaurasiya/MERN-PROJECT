import { useState } from "react";
import SecurityLayout from "@/layouts/SecurityLayout";
import API from "@/services/api";
import { notify } from "@/utils/notify";
import { ShieldCheck } from "lucide-react";

function VerifyPass() {
  const [passNumber, setPassNumber] = useState("");
  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!passNumber.trim()) {
      return notify.error("Enter Pass Number");
    }

    try {
      setLoading(true);

      const res = await API.get(`/check/pass/${passNumber}`);

      setVisitor(res.data);

      notify.success("Pass Verified");
    } catch (err) {
      setVisitor(null);
      notify.error("Invalid Pass");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SecurityLayout>
      {/* Hero */}

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
        <h1 className="text-3xl font-bold text-white">Verify Pass</h1>

        <p className="text-slate-300 mt-2">Verify visitor pass manually.</p>
      </div>

      {/* Search Card */}

      <div
        className="
        bg-[#0f172a]
        border border-white/10
        rounded-3xl
        p-6
        mb-6
      "
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Pass Number"
            value={passNumber}
            onChange={(e) => setPassNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleVerify();
              }
            }}
            className="
            flex-1
            bg-slate-900
            border border-white/10
            text-white
            rounded-xl
            px-4
            py-3
            outline-none
            "
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className="
            bg-violet-600
            hover:bg-violet-700
            px-6
            py-3
            rounded-xl
            text-white
            font-medium
            transition
            "
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>

      {/* Result */}

      {visitor && (
        <div
          className="
          bg-[#0f172a]
          border border-white/10
          rounded-3xl
          p-6
        "
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={28} className="text-green-400" />

            <h2 className="text-2xl font-semibold text-white">Pass Verified</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <p className="text-slate-400 text-sm">Visitor Name</p>

              <p className="text-white font-medium">{visitor.visitorName}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Host Name</p>

              <p className="text-white font-medium">{visitor.hostName}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Purpose</p>

              <p className="text-white font-medium">{visitor.purpose}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Appointment Date</p>

              <p className="text-white font-medium">
                {new Date(visitor.date).toLocaleDateString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Pass Number</p>

              <p className="text-white font-medium">{visitor.passNumber}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Status</p>

              <span
                className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${
                    visitor.status === "check-in"
                      ? "bg-green-500/20 text-green-400"
                      : visitor.status === "checked-out"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                  }
                `}
              >
                {visitor.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </SecurityLayout>
  );
}

export default VerifyPass;
