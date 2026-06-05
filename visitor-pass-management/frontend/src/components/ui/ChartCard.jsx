import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

const ChartCard = ({ data }) => {
  return (
    <div
      className="
    bg-[#1e293b] border border-gray-800 rounded-xl p-5 shadow
    "
    >
      <h2 className="text-white font-semibold mb-4">Weekly Visitors</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          <XAxis dataKey="name" stroke="#94a3b8" />

          <YAxis stroke="#94a3b8" allowDecimals={false} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="count"
            fill="rgba(59,130,246,0.15)"
            stroke="none"
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{
              r: 4,
              stroke: "#3b82f6",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
            }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
