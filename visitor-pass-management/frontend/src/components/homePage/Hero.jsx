import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaQrcode, FaUsers, FaChartLine } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex px-5 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300">
            Smart • Secure • Seamless
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">
            Visitor Pass
            <br />
            Management
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg max-w-xl">
            Manage visitors, appointments, QR passes and security verification
            with a modern digital platform.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/login"
              className="
                px-8 py-4 rounded-2xl
                bg-gradient-to-r
                from-purple-500
                to-indigo-500
                font-semibold
                hover:scale-105
                transition
              "
            >
              Get Started
            </Link>

            <button
              className="
                px-8 py-4 rounded-2xl
                border border-white/10
                bg-white/5
                hover:bg-white/10
                transition
              "
            >
              Explore Features
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              QR Passes
            </div>

            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              Security
            </div>

            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              Real-time Tracking
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          {/* Main Card */}
          <div
            className="
              w-full max-w-[520px]
              rounded-[32px]
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8
            "
          >
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-bold">Visitor Analytics</h3>

              <span className="text-green-400">+12%</span>
            </div>

            {/* Fake Graph */}
            <div className="h-44 rounded-2xl bg-white/5 flex items-end gap-3 p-5">
              <div className="w-8 h-20 bg-purple-500 rounded-lg"></div>
              <div className="w-8 h-28 bg-purple-500 rounded-lg"></div>
              <div className="w-8 h-16 bg-purple-500 rounded-lg"></div>
              <div className="w-8 h-36 bg-purple-500 rounded-lg"></div>
              <div className="w-8 h-24 bg-purple-500 rounded-lg"></div>
              <div className="w-8 h-40 bg-purple-500 rounded-lg"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 rounded-2xl p-4">
                <p className="text-gray-400">Visitors</p>
                <h4 className="text-3xl font-bold">1248</h4>
              </div>

              <div className="bg-white/5 rounded-2xl p-4">
                <p className="text-gray-400">Passes</p>
                <h4 className="text-3xl font-bold">18</h4>
              </div>
            </div>
          </div>

          {/* Floating Cards */}

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="
              absolute
              top-10
              -left-10
              bg-white/10
              backdrop-blur-xl
              border border-white/10
              px-5 py-4
              rounded-2xl
            "
          >
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-green-400" />
              <span>Secure Access</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="
              absolute
              top-28
              -right-8
              bg-white/10
              backdrop-blur-xl
              border border-white/10
              px-5 py-4
              rounded-2xl
            "
          >
            <div className="flex items-center gap-3">
              <FaQrcode className="text-blue-400" />
              <span>QR Generated</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="
              absolute
              bottom-8
              -left-8
              bg-white/10
              backdrop-blur-xl
              border border-white/10
              px-5 py-4
              rounded-2xl
            "
          >
            <div className="flex items-center gap-3">
              <FaChartLine className="text-purple-400" />
              <span>Live Analytics</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
