import React from "react";

export default function AdminStats({ info }: { info: any }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4  ">
            <div className="bg-gray-50 rounded-2xl p-6 shadow dark:bg-[#353535]">
                <p className="text-sm opacity-70">تعداد کاربران</p>
                <p className="text-2xl font-bold">{info?.totalUsers || 0}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 shadow dark:bg-[#353535]">
                <p className="text-sm opacity-70">کل خانه‌ها</p>
                <p className="text-2xl font-bold">{info?.totalHouses || 0}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 shadow dark:bg-[#353535]">
                <p className="text-sm opacity-70">کل رزروها</p>
                <p className="text-2xl font-bold">{info?.totalBookings || 0}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 shadow dark:bg-[#353535]">
                <p className="text-sm opacity-70">کل امتیاز</p>
                <p className="text-2xl font-bold">{info?.averageRating}</p>
            </div>
        </div>
    );
}
