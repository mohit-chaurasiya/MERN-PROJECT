import { LayoutDashboard, Users, CalendarCheck, Ticket } from "lucide-react";

export const adminMenu = [
  {
    name: "Dashboard",
    path: "/admin",
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
  }
];

export const securityMenu = [
  {
    name: "Dashboard",
    path: "/security",
    icon: LayoutDashboard 
  },
  {
    name: "Verify Pass",
    path: "/security/verify",
    icon: Ticket 
  }
];