import React, { useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import API from "../../services/api";
import { notify } from "../../utils/notify";
import { useAuth } from "../../hooks/useAuth";
import validator from "validator";
import { motion } from "framer-motion";

function CreateVisitor() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    host: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setForm((prev) => ({
        ...prev,
        photo: files[0],
      }));
      return;
    }

    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const data = {
        ...form,
        host: user?.name,
      };

      if (!data.name || !data.email || !data.phone || !data.host) {
        notify.error("All fields required");
        setLoading(false);
        return;
      }

      if (!validator.isEmail(data.email)) {
        notify.error("Enter valid email");
        setLoading(false);
        return;
      }

      if (!validator.isMobilePhone(data.phone, "en-IN")) {
        notify.error("Enter valid mobile number");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("photo", form.photo);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("host", user?.name);

      await API.post("/visitors", formData);

      notify.success("Visitor Created Successfully 🚀");

      setForm({
        name: "",
        email: "",
        phone: "",
        host: "",
        photo: null,
      });
    } catch (err) {
      notify.error(err.response?.data?.error || "Failed to create visitor");
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
          <h2 className="text-xl font-bold text-white mb-6">Create Visitor</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Visitor Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-700 text-white p-3 rounded-lg focus:border-blue-500 outline-none"
            />

            {/* Photo */}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-700 text-gray-400 p-2 rounded-lg file:bg-blue-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded"
            />

            {/* Email */}
            <input
              type="text"
              name="email"
              placeholder="Visitor Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-700 text-white p-3 rounded-lg focus:border-blue-500 outline-none"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Visitor Mobile Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-[#0f172a] border border-gray-700 text-white p-3 rounded-lg focus:border-blue-500 outline-none"
            />

            {/* Host */}
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="w-full bg-gray-800 text-gray-400 p-3 rounded-lg cursor-not-allowed"
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
              {loading ? "Creating..." : "Create Visitor"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </EmployeeLayout>
  );
}

export default CreateVisitor;
