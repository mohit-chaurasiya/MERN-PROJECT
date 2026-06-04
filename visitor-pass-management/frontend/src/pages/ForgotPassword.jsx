import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { notify } from "../utils/notify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      notify.error("Please enter email");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/forgot-password", {
        email,
      });

      notify.success("OTP sent successfully 📩");

      navigate("/verify-otp", {
        state: { email, type: "forgot" },
      });
    } catch (err) {
      notify.error(err?.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8"
      >
        <h1 className="text-4xl font-bold text-white text-center">
          Forgot Password
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Enter your email to receive OTP
        </p>

        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-6 px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <button
            disabled={loading}
            className="
            w-full
            py-4
            rounded-xl
            bg-linear-to-r
            from-purple-500
            to-indigo-500
            font-semibold
          "
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
