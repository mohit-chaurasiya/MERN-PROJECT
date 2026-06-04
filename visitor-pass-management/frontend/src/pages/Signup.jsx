import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { notify } from "../utils/notify";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isValid =
    form.name &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    form.role;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      notify.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      notify.success("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      notify.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="
      w-full
      max-w-md
      rounded-[32px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
    "
      >
        <h1 className="text-4xl font-bold text-center text-white">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Join Visitor Management System
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-4 rounded-xl bg-[#0f172a] border border-white/10 text-white"
          >
            <option value="employee">Employee</option>
            <option value="security">Security</option>
          </select>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="
          w-full
          py-4
          rounded-xl
          font-semibold
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
          bg-gradient-to-r
          from-purple-500
          to-indigo-500
        "
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
