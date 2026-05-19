"use client";

import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// تعریف اینترفیس جدید بر اساس داده‌های ادمین
interface AdminChartProps {
    info: {
        totalUsers: number;
        totalHouses: number;
        totalBookings: number;
        averageRating: string;
    };
}

const DashboardChart = ({ info }: AdminChartProps) => {
    // تبدیل داده‌های دریافتی به فرمتی که نمودار می‌فهمد
    const data = [
        { name: "کاربران", value: info?.totalUsers || 0 },
        { name: "خانه‌ها", value: info?.totalHouses || 0 },
        { name: "رزروها", value: info?.totalBookings || 0 },
        { name: "امتیاز", value: parseFloat(info?.averageRating || "0") * 10 }, // ضرب در ۱۰ برای نمایش بصری بهتر در نمودار
    ];

    return (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-white/5 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 px-2">
                <div>
                    <h3 className="font-black text-slate-800 dark:text-white text-lg">
                        خلاصه عملکرد سیستم
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                        آمار کلی پلتفرم
                    </p>
                </div>
            </div>

            <div className="flex-grow w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#4F46E5"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorCount)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl border-none">
                <p className="text-[10px] font-bold opacity-60 mb-1">{payload[0].payload.name}</p>
                <p className="text-sm font-black">{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

export default DashboardChart;
