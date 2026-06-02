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

  today.setDate(today.getDate()+1);

  const minDate = today.toISOString().split("T")[0];

  const [form, setForm] = useState({
    visitorId: "",
    purpose: "",
    date: "",
  });

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
      <motion.div
        className="max-w-xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transiton={{ durataion: 0.5 }}
      >
        {/* Card */}
        <div className="bg-[#1e293b] border border-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6">
            Create Appointment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Visitor Select */}
            <select
              name="visitorId"
              value={form.visitorId}
              onChange={handleChange}
              required
              className="
              w-full bg-[#0f172a] border border-gray-700 text-white 
              p-3 rounded-lg outline-none focus:border-blue-500
              "
            >
              <option value="">Select Visitor</option>
              {visitors.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.name}
                </option>
              ))}
            </select>

            {/* Purpose */}
            <input
              type="text"
              name="purpose"
              placeholder="Purpose of Visit"
              value={form.purpose}
              onChange={handleChange}
              required
              className="
              w-full bg-[#0f172a] border border-gray-700 text-white 
              p-3 rounded-lg outline-none focus:border-blue-500
              "
            />

            {/* Date */}
            <input
              type="date"
              name="date"
              min={minDate}
              value={form.date}
              onChange={handleChange}
              required
              className="
              w-full bg-[#0f172a] border border-gray-700 text-gray-300 
              p-3 rounded-lg outline-none focus:border-blue-500
              "
            />

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="
              w-full py-3 rounded-lg font-semibold 
              bg-blue-600 hover:bg-blue-700 
              transition duration-200
              disabled:opacity-50
              "
            >
              {loading ? "Creating..." : "Create Appointment"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </EmployeeLayout>
  );
}

export default CreateAppointment;
