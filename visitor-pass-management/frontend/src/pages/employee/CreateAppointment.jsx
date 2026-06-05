import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import { notify } from "../../utils/notify";
import API from "../../services/api";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function CreateAppointment() {
  const location = useLocation();
  const visitorId = location.state?.visitorId;

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();

  today.setDate(today.getDate() + 1);

  const minDate = today.toISOString().split("T")[0];

  const [form, setForm] = useState({
    visitorId: "",
    purpose: "",
    date: "",
  });
  const selectedVisitor = visitors.find((v) => v._id === form.visitorId);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await API.get("/visitors");
        setVisitors(res.data);

        if (visitorId) {
          setForm((prev) => ({
            ...prev,
            visitorId: visitorId,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchVisitors();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      await API.post("/appointments", form);

      notify.success("Appointment created successfully 🚀");

      setForm({
        visitorId: visitorId || "",
        purpose: "",
        date: "",
      });
    } catch (err) {
      notify.error("Failed to create appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeLayout>
      <div
        className="
  mb-6
  rounded-3xl
  border border-white/10
  bg-linear-to-r
  from-violet-600/20
  via-blue-600/20
  to-cyan-600/20
  p-6
  "
      >
        <h1 className="text-3xl font-bold text-white">Create Appointment</h1>

        <p className="text-slate-300 mt-2">
          Schedule meetings for registered visitors.
        </p>
      </div>
      <motion.div
        className="max-w-xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transiton={{ durataion: 0.5 }}
      >
        {/* Card */}
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-7 gap-6">
            {/* LEFT */}

            <div className="lg:col-span-3 h-full">
              <div
                className="
        bg-[#0f172a]
        border border-white/10
        rounded-3xl
        p-6
        "
              >
                <h2 className="text-xl font-semibold text-white mb-5">
                  Appointment Details
                </h2>

                <div className="space-y-4">
                  <select
                    name="visitorId"
                    value={form.visitorId}
                    onChange={handleChange}
                    required
                    className="
            w-full
            bg-slate-900
            border border-white/10
            text-white
            p-3
            rounded-xl
            "
                  >
                    <option value="">Select Visitor</option>

                    {visitors.map((v) => (
                      <option key={v._id} value={v._id}>
                        {v.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    name="purpose"
                    placeholder="Purpose of Visit"
                    value={form.purpose}
                    onChange={handleChange}
                    required
                    className="
            w-full
            bg-slate-900
            border border-white/10
            text-white
            p-3
            rounded-xl
            "
                  />

                  <input
                    type="date"
                    name="date"
                    min={minDate}
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="
            w-full
            bg-slate-900
            border border-white/10
            text-white
            p-3
            rounded-xl
            "
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="lg:col-span-4 space-y-6">
              {/* Visitor Preview */}

              <div
                className="
  bg-[#0f172a]
  border border-white/10
  rounded-3xl
  p-6
  h-full
  "
              >
                <h2 className="text-white font-semibold mb-5">
                  Visitor Preview
                </h2>

                {selectedVisitor ? (
                  <div className="space-y-5">
                    <div>
                      <p className="text-slate-400 text-xs uppercase">Name</p>

                      <p className="text-white font-medium mt-1">
                        {selectedVisitor.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-xs uppercase">Email</p>

                      <p className="text-white break-all mt-1">
                        {selectedVisitor.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-xs uppercase">Phone</p>

                      <p className="text-white mt-1">{selectedVisitor.phone}</p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="
        w-full
        mt-6
        bg-gradient-to-r
        from-violet-600
        to-blue-600
        hover:opacity-90
        text-white
        py-3
        rounded-2xl
        font-semibold
        transition
        "
                    >
                      {loading ? "Creating..." : "Create Appointment"}
                    </button>
                  </div>
                ) : (
                  <p className="text-slate-400">Select a visitor first</p>
                )}
              </div>
              {/* Submit */}
            </div>
          </div>
        </form>
      </motion.div>
    </EmployeeLayout>
  );
}

export default CreateAppointment;
