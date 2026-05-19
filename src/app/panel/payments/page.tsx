"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Download, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { usePayments } from "@/core/api/dashboard/paymets/PaymentsQuery/PaymetsQuery";

const PaymentsUserPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [filters, setFilters] = useState({
        status: "all",
        type: "all",
    });

    const { data, isLoading } = usePayments();

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const mappedData = useMemo(() => {
        const apiPayments = Array.isArray(data?.payments) ? data.payments : [];
        return apiPayments.map((p: any) => ({
            id: p.id,
            date: p.created_at ? new Date(p.created_at).toLocaleDateString("fa-IR") : "-",
            bookingId: p.bookingId || p.bookingId || "-",
            amount: typeof p.amount === "number" ? p.amount.toLocaleString("fa-IR") : p.amount || "-",
            status: p.status === "completed" ? "تایید شده" : "تایید نشده",
            type: p.type === "wallet" ? "شارژ کیف پول" : "رزرو",
        }));
    }, [data]);

    const filteredData = useMemo(() => {
        return mappedData.filter((item) => {
            const statusMatch = filters.status === "all" || item.status === filters.status;
            const typeMatch = filters.type === "all" || item.type === filters.type;
            return statusMatch && typeMatch;
        });
    }, [mappedData, filters]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage]);

    if (isLoading) return <div className="p-8 text-center font-black">در حال بارگذاری...</div>;

    return (
        <div className="p-4 md:p-8 space-y-8" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-row-reverse items-center gap-4 w-full md:w-auto flex-wrap">
                    <div className="relative flex-grow md:w-44">
                        <span className="absolute -top-3 right-6 bg-white dark:bg-[#121212] px-2 text-[10px] text-slate-400 font-bold z-10">
                            وضعیت:
                        </span>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full border-2 border-slate-100 dark:border-white/5 rounded-full px-5 py-3 text-xs font-bold text-slate-500 bg-transparent appearance-none outline-none cursor-pointer"
                        >
                            <option value="all">همه</option>
                            <option value="تایید شده">تایید شده</option>
                            <option value="تایید نشده">تایید نشده</option>
                        </select>
                        <ChevronDown size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>

                    <button className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-2xl hover:text-black transition-colors">
                        <Download size={20} />
                    </button>
                </div>

                <h1 className="text-xl font-black">تراکنش‌های مالی</h1>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm">
                <div className="overflow-x-auto text-right">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 text-xs font-black text-slate-500">
                                <th className="p-6 text-right">تاریخ</th>
                                <th className="p-6 text-center">شماره پیگیری</th>
                                <th className="p-6 text-center">مبلغ (تومان)</th>
                                <th className="p-6 text-center">وضعیت</th>
                                <th className="p-6 text-center">نوع تراکنش</th>
                                <th className="p-6 text-left">عملیات</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6 text-xs font-medium text-slate-600 dark:text-slate-400">{t.date}</td>
                                        <td className="p-6 text-center text-sm font-mono tracking-wider">{t.bookingId}</td>
                                        <td className="p-6 text-center text-sm font-black">{t.amount}</td>
                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                {t.status === "تایید شده" ? (
                                                    <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-black rounded-full flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-500/20">
                                                        <CheckCircle2 size={12} />
                                                        {t.status}
                                                    </span>
                                                ) : (
                                                    <span className="px-4 py-1.5 bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 text-[10px] font-black rounded-full flex items-center gap-1.5 border border-rose-200 dark:border-rose-500/20">
                                                        <XCircle size={12} />
                                                        {t.status}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-center text-xs font-bold text-slate-500">{t.type}</td>
                                        <td className="p-6 text-left">
                                            <button className="text-[10px] font-black text-slate-400 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4">
                                                جزئیات
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-sm text-slate-400 font-bold">
                                        هیچ تراکنشی یافت نشد.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 py-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-black transition-all duration-300 ${currentPage === page
                                ? "bg-black text-white shadow-xl shadow-black/20 "
                                : "bg-white dark:bg-[#1E1E1E] text-slate-400 hover:bg-slate-50 border border-slate-100 dark:border-white/5"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PaymentsUserPage;
