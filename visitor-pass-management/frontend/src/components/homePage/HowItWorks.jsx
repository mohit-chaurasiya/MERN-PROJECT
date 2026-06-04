import { motion } from "framer-motion";
import { FaUserPlus, FaUserCheck, FaQrcode, FaShieldAlt } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Register",
    desc: "Create an account and login.",
  },
  {
    icon: <FaUserCheck />,
    title: "Add Visitor",
    desc: "Enter visitor details quickly.",
  },
  {
    icon: <FaQrcode />,
    title: "Generate Pass",
    desc: "Instant QR visitor pass.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Entry",
    desc: "Scan and verify at gate.",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-center text-5xl font-bold mb-16">
        How It <span className="text-purple-400">Works</span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="
              p-8
              rounded-3xl
              bg-white/5
              border border-white/10
              backdrop-blur-xl
            "
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-2xl mb-5">
              {step.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>

            <p className="text-gray-400">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
