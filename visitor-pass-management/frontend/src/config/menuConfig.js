import { LayoutDashboard, Users, CalendarCheck, Ticket, User, LaptopMinimalCheck, CameraIcon, Table } from "lucide-react";

export const adminMenu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard
  },
  {
    name: "Manage Users",
    path: "/admin/users",
    icon: LayoutDashboard
  },
  {
    name: "Visitors",
    path: "/admin/visitors",
    icon: Users
  },
  {
    name: "Appointments",
    path: "/admin/appointments",
    icon: CalendarCheck
  },
  {
    name: "Passes",
    path: "/admin/passes",
    icon: Ticket
  }
];

export const employeeMenu = [
  {
    name: "Dashboard",
    path: "/employee",
    icon: LayoutDashboard
  },
  {
    name: "Appointments",
    path: "/employee/appointments",
    icon: CalendarCheck
  },
  {
    name: "Register Visitor",
    path: "/employee/create-visitor",
    icon: LaptopMinimalCheck
  },
  {
    name: "Create Appointments",
    path: "/employee/create-appointments",
    icon: User
  },
  {
    name: "Visitors",
    path: "/employee/visitors",
    icon: User
  }
];

export const securityMenu = [
  {
    name: "Dashboard",
    path: "/security",
    icon: LayoutDashboard
  },
  {
    name: "Scan Visitor",
    path: "/security/scan",
    icon: CameraIcon

  },
  {
    name: "Verify Pass",
    path: "/security/verify",
    icon: Ticket
  },
  {
    name: "Visitor Logs",
    path: "/security/logs",
    icon: Table
  }
];