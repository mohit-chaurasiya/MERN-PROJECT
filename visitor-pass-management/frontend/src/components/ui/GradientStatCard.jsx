const StatCard = ({ title, value, icon, color, bg }) => {
  const Icon = icon;

  return (
     <div className="
    relative bg-[#1e293b] backdrop-blur-xl border border-gray-800 rounded-xl p-5 
    flex items-center gap-4 
    hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/10 
    transition duration-300
    ">

      {/* glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 hover:opacity-100 transition"></div>

      <div className={`p-3 rounded-lg ${color}`}>
        <Icon />
      </div>

      <div className="relative z-10">
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className="text-xl font-bold text-white">{value}</h2>
      </div>

    </div>
  );
};

export default StatCard;