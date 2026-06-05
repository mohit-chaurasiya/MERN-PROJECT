import {
    LayoutDashboard,
    QrCode,
    ShieldCheck,
    ClipboardList,
    User,
    Calendar,
    Users,
    Building2,
} from "lucide-react";

export const mobileNavConfig = {
    security: [
        {
            name: "Home",
            icon: LayoutDashboard,
            path: "/security",
        },
        {
            name: "Scan",
            icon: QrCode,
            path: "/security/scan",
        },
        {
            name: "Verify",
            icon: ShieldCheck,
            path: "/security/verify",
        },
        {
            name: "Logs",
            icon: ClipboardList,
            path: "/security/logs",
        },
        {
            name: "Profile",
            icon: User,
            path: "/security/profile",
        },
    ],

    employee: [
        {
            name: "Home",
            icon: LayoutDashboard,
            path: "/employee",
        },
        {
            name: "Visitors",
            icon: Users,
            path: "/employee/visitors",
        },
        {
            name: "Appointments",
            icon: Calendar,
            path: "/employee/appointments",
        },
        {
            name: "Profile",
            icon: User,
            path: "/employee/profile",
        },
    ],

    admin: [
        {
            name: "Home",
            icon: LayoutDashboard,
            path: "/admin",
        },
        {
            name: "Users",
            icon: Users,
            path: "/admin/users",
        },
        {
            name: "Departments",
            icon: Building2,
            path: "/admin/departments",
        },
        {
            name: "Profile",
            icon: User,
            path: "/admin/profile",
        },
    ],
};