"use client";
import { useAdminHouses, useAdminInfo } from "@/core/api/admin/dashboard/dashboardQuery/DashboardQuery";
import React from "react";
import AdminStats from "./adminstate/AdminStats";
import AdminHouseTable from "./AdminHouseTable/AdminHouseTable";
import DashboardChart from "./DashboardChart/DashboardChart";


export default function AdminDashboardPage() {
    const { data: info, isLoading: infoLoading } = useAdminInfo();
    const { data: houses, isLoading: housesLoading } = useAdminHouses();

    if (infoLoading || housesLoading) {
        return <div>در حال بارگذاری ...</div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* خلاصه وضعیت */}
            <AdminStats info={info} />

            <div className="grid lg:grid-cols-3 gap-8">
                {/* جدول خانه‌ها */}
                <AdminHouseTable houses={houses} />

                {/* نمودار */}
    
                <DashboardChart info={info} />


                {/* خلاصه اعتبار یا وضعیت کلی */}
                <div className="bg-primary dark:bg-[#353535] text-white rounded-[32px] p-8 shadow-xl shadow-primary/20 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold opacity-80 mb-2 text-sm">مجموع درآمد</h3>
                        <p className="text-3xl font-black">
                            {info?.income?.toLocaleString() || "۰"} <span className="text-sm">تومان</span>
                        </p>
                    </div>
                    <div className="mt-8 space-y-3">
                        <button className="w-full py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl font-bold transition-all text-sm">
                            مدیریت پرداخت‌ها
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
