import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";
import { notify } from "../utils/notify";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    form.name.trim() &&
    form.email.trim() &&
    form.password.trim() &&
    form.confirmPassword.trim() &&
    form.role;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      notify.error("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      notify.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/send-otp", {
        email: form.email,
      });

      notify.success("OTP sent successfully 📩");

      navigate("/verify-otp", {
        state: {
          type: "signup",

          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        },
      });
    } catch (err) {
      notify.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to send OTP",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-20 h-72 w-72 bg-blue-500/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
        <Link
          to="/"
          className="
    inline-flex
    items-center
    gap-2
    text-sm
    text-purple-400
    hover:text-purple-300
    mb-6
  "
        >
          <ArrowLeft size={18} />
          🏠 Home
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Create Account 🚀</h1>

          <p className="text-gray-400 mt-2">Start managing visitors smarter</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="
              w-full
              mb-4
              px-4
              py-4
              rounded-xl
              bg-white/5
              border
              border-white/10
              text-white
              outline-none
              focus:border-purple-500
            "
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="
              w-full
              mb-4
              px-4
              py-4
              rounded-xl
              bg-white/5
              border
              border-white/10
              text-white
              outline-none
              focus:border-purple-500
            "
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="
                w-full
                px-4
                py-4
                rounded-xl
                bg-white/5
                border
                border-white/10
                text-white
                outline-none
                focus:border-purple-500
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Password Strength */}
          <div className="mb-4">
            {form.password.length > 0 && form.password.length < 6 && (
              <p className="text-red-400 text-sm">Weak Password</p>
            )}

            {form.password.length >= 6 && form.password.length < 10 && (
              <p className="text-yellow-400 text-sm">Medium Password</p>
            )}

            {form.password.length >= 10 && (
              <p className="text-green-400 text-sm">Strong Password</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative mb-6">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="
                w-full
                px-4
                py-4
                rounded-xl
                bg-white/5
                border
                border-white/10
                text-white
                outline-none
                focus:border-purple-500
              "
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  role: "employee",
                })
              }
              className={`
                p-4 rounded-xl border transition
                ${
                  form.role === "employee"
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-white/10 bg-white/5"
                }
              `}
            >
              👨‍💼 Employee
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  role: "security",
                })
              }
              className={`
                p-4 rounded-xl border transition
                ${
                  form.role === "security"
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-white/10 bg-white/5"
                }
              `}
            >
              🛡️ Security
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className="
              w-full
              py-4
              rounded-xl
              font-semibold
              flex
              justify-center
              items-center
              gap-2
              bg-linear-to-r
              from-purple-500
              to-indigo-500
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
