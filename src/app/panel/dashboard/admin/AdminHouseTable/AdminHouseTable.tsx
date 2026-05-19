import { useDeleteHouse } from "@/core/api/admin/dashboard/dashboardQuery/DashboardQuery";
import React from "react";


export default function AdminHouseTable({ houses }: { houses: any[] }) {
    const { mutate: deleteHouse } = useDeleteHouse();

    return (
        <div className="bg-white rounded-3xl shadow p-6 dark:bg-[#353535]">
            <h3 className="font-bold text-lg mb-4">خانه‌ها</h3>
            <table className="w-full text-right">
                <thead>
                    <tr className="border-b font-semibold">
                        <th>شناسه</th>
                        <th>نام</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {houses?.map((h) => (
                        <tr key={h.id} className="border-b">
                            <td>{h.id}</td>
                            <td>{h.title}</td>
                            <td>{h.status}</td>
                            <td>
                                <button
                                    onClick={() => deleteHouse(h.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    حذف
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
