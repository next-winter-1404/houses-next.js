"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    User,
    CalendarDays,
    Bell,
    LogOut,
    PieChart,
    Heart,
    UserRoundSearch,
} from "lucide-react";
import { useEffect, useState } from "react";

const menuItems = [
    { title: "داشبورد", icon: <LayoutDashboard size={22} />, href: "/panel/dashboard", roles: ["admin", "seller", "buyer"] },
    { title: "اطلاعات کاربری", icon: <User size={22} />, href: "/panel/profile", roles: ["admin", "seller", "buyer"] },
    { title: "مدیریت رزروها", icon: <CalendarDays size={22} />, href: "/panel/booking", roles: ["admin", "seller", "buyer"] },
    { title: "مدیریت مالی", icon: <PieChart size={22} />, href: "/panel/financial", roles: ["admin", "seller", "buyer"] },
    { title: "علاقه‌مندی‌ها", icon: <Heart size={22} />, href: "/panel/favorites", roles: ["buyer"] },
    { title: "اعلان‌ها", icon: <Bell size={22} />, href: "/panel/notifications", roles: ["admin", "seller", "buyer"] },
    { title: "ملاقات ها", icon: <UserRoundSearch size={22} />, href: "/panel/appointments", roles: ["seller", "buyer"] },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchRole = async () => {
            const res = await fetch("/api/me", { credentials: "include" });
            const data = await res.json();
            setRole(data.role);
        };

        fetchRole();
    }, []);

    if (!role) {
        return <div className="p-6">Loading...</div>;
    }

    const visibleItems = menuItems.filter((item) =>
        item.roles.includes(role)
    );



    return (
        <div className="flex flex-col p-6 overflow-y-hidden h-200">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 font-sans">
                    G
                </div>
                <span className="font-black text-xl tracking-tight dark:text-white">
                    پنل مدیریت
                </span>
            </div>

            <nav className="flex-1 space-y-2">
                {visibleItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                    ? "bg-primary text-white shadow-md dark:text-black shadow-primary/30"
                                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"
                                }`}
                        >
                            <span className={`${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`}>
                                {item.icon}
                            </span>
                            <span className="text-[15px] font-bold">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            <button className="mt-auto flex items-center gap-4 px-4 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-colors font-bold">
                <LogOut size={22} />
                <span>خروج</span>
            </button>
        </div>
    );
}
