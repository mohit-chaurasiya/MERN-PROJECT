import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    number: 1248,
    suffix: "+",
    title: "Total Visitors",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: 24,
    suffix: "+",
    title: "Today's Visitors",
    color: "from-green-500 to-emerald-500",
  },
  {
    number: 18,
    suffix: "+",
    title: "Active Passes",
    color: "from-cyan-500 to-blue-500",
  },
  {
    number: 32,
    suffix: "+",
    title: "Appointments",
    color: "from-orange-500 to-red-500",
  },
];

const StatsCard = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
      }}
      whileHover={{
        y: -12,
        scale: 1.04,
      }}
      className="
      relative
      overflow-hidden
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      group
      cursor-pointer
    "
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-r ${item.color}`}
      />

      {/* Top Glow Orb */}
      <div
        className={`absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-20 bg-gradient-to-r ${item.color}`}
      />

      <div className="relative z-10">
        <h2 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {inView && (
            <CountUp
              start={0}
              end={item.number}
              duration={2.5}
              suffix={item.suffix}
            />
          )}
        </h2>

        <p className="text-gray-400 text-lg">{item.title}</p>
      </div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="relative py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 bg-purple-600/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 bg-blue-600/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-5xl font-bold mb-16">
          Platform <span className="text-purple-400">Statistics</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <StatsCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
