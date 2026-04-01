import { User, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";

export const employeeDashboardConfig = [
  {
    title: "Total Visitors",
    key: "totalVisitor",
    icon: User,
    color: "bg-green-500/10 backdrop-blur-xl bg-gradient-to-r from-blue-600/20 to-transparent border-blue-500/40 text-green-400",
    bg: "bg-green-500/10 text-green-400"
  },
  {
    title: "Total Appointments",
    key: "total",
    icon: Calendar,
    color: "bg-blue-500/10 text-blue-400",
    bg: "bg-blue-500/10 text-blue-400"
  },
  {
    title: "Pending Requests",
    key: "pending",
    icon: Clock,
    color: "bg-yellow-500/10 text-yellow-400",
    bg: "bg-yellow-500/10"
  },
  {
    title: "Approved",
    key: "approved",
    icon: CheckCircle,
    color: "bg-green-500/10 text-green-400",
    bg: "bg-green-500/10"
  },
  {
    title: "Rejected",
    key: "rejected",
    icon: XCircle,
    color: "bg-red-500/10 text-red-400",
    bg: "bg-red-500/10"
  }
];