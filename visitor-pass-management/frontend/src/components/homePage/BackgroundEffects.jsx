import { motion } from "framer-motion";

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="
          absolute
          top-20
          left-20
          w-96
          h-96
          rounded-full
          bg-purple-500/20
          blur-[140px]
        "
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="
          absolute
          top-40
          right-20
          w-96
          h-96
          rounded-full
          bg-blue-500/20
          blur-[140px]
        "
      />

      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-20
          left-1/2
          w-96
          h-96
          rounded-full
          bg-pink-500/20
          blur-[140px]
        "
      />
    </div>
  );
};

export default BackgroundEffects;
