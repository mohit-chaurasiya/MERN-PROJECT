import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { notify } from "../utils/notify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      notify.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      login(res.data);

      notify.success(`Welcome Back! ${res.data.name} 👋`);

      const role = res.data.role;

      if (role === "admin") {
        navigate("/admin");
      }

      if (role === "employee") {
        navigate("/employee");
      }

      if (role === "security") {
        navigate("/security");
      }
    } catch (err) {
      console.log(err);
      notify.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px]" />

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome Back 👋</h1>

          <p className="text-gray-400 mt-2">Login to your account</p>
        </div>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="button"
            className="absolute right-4 top-8 -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="text-gray-400 flex items-center gap-2">
            <input type="checkbox" />
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-purple-400 hover:text-purple-300"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full
            py-4
            rounded-xl
            font-semibold
            flex
            justify-center
            items-center
            gap-2
            bg-gradient-to-r
            from-purple-500
            to-indigo-500
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing In...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
