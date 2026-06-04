import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }

    if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, {
        email,
      });

      toast.success("OTP resent successfully 📩");

      setTimer(30);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return toast.error("Enter complete OTP");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        {
          email,
          otp: finalOtp,
        },
      );

      toast.success(res.data.message);

      if (location.state?.type === "signup") {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          name: location.state.name,
          email: location.state.email,
          password: location.state.password,
          role: location.state.role,
        });

        toast.success("Account created successfully 🎉");

        navigate("/login");
      } else {
        navigate("/reset-password", {
          state: {
            email,
          },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          {location.state?.type === "signup" ? "Verify Email " : "Verify Otp"}
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Enter the 6-digit OTP sent to your
          <br />
          <span className="text-purple-400">{email}</span>
        </p>

        <div
          onPaste={(e) => {
            const pasted = e.clipboardData.getData("text").trim();

            if (/^\d{6}$/.test(pasted)) {
              setOtp(pasted.split(""));
            }
          }}
          className="flex justify-center gap-3 mb-8"
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-xl font-bold bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:border-violet-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full h-14 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-500 hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="mt-6 text-center">
          {timer > 0 ? (
            <p className="text-gray-400 text-sm">
              Resend OTP in{" "}
              <span className="text-purple-400 font-semibold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={resending}
              className="
        text-purple-400
        hover:text-purple-300
        font-medium
        transition
      "
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
