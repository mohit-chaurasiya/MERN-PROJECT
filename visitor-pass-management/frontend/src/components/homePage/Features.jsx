import { motion } from "framer-motion";
import {
  FaUsers,
  FaCalendarCheck,
  FaQrcode,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUsers />,
    title: "Visitor Management",
    desc: "Manage all visitors from a single dashboard.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Appointments",
    desc: "Schedule and manage appointments easily.",
  },
  {
    icon: <FaQrcode />,
    title: "QR Passes",
    desc: "Generate secure QR visitor passes instantly.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Security First",
    desc: "Role-based access and secure verification.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-5xl font-bold mb-16"
      >
        Powerful <span className="text-purple-400">Features</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="
              p-8
              rounded-3xl
              bg-white/5
              border border-white/10
              backdrop-blur-xl
              shadow-xl
            "
          >
            <div className="text-4xl text-purple-400 mb-5">{item.icon}</div>

            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
