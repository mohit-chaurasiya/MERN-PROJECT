import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="
          relative
          max-w-6xl
          mx-auto
          overflow-hidden
          rounded-[40px]
          border border-white/10
          bg-linear-to-r
          from-purple-900/60
          via-indigo-900/50
          to-blue-900/60
          backdrop-blur-2xl
          p-10 md:p-20
        "
      >
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/20 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 blur-[120px]" />

        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Secure.
            <span className="text-purple-400"> Smart.</span>
            <br />
            Seamless.
          </h2>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Transform visitor management with digital passes, appointment
            scheduling, QR verification and real-time security tracking.
          </p>

          <div className="mt-10">
            <Link
              to="/login"
              className="
                inline-flex
                items-center
                px-8
                py-4
                rounded-2xl
                bg-linear-to-r
                from-purple-500
                to-indigo-500
                font-semibold
                shadow-2xl
                hover:scale-105
                transition
              "
            >
              Get Started Now →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
