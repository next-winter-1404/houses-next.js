"use client";

import React, { useMemo, useState } from "react";
import { Download, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { usePayments } from "../../../core/api/dashboard/paymets/PaymentsQuery/PaymetsQuery";
import ReceiptModal from "./modal/ReceipModal";

const staticData = [
    {
        id: 1,
        date: "۱۴۰۲/۰۵/۱۲",
        trackingId: "۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶",
        amount: "۱,۲۵۰,۰۰۰",
        status: "تایید شده",
        type: "رزرو",
    },
    {
        id: 2,
        date: "۱۴۰۲/۰۵/۱۲",
        trackingId: "۹۸۷۶۵۴۳۲۱۰۹۸۷۶۵",
        amount: "۵۵۰,۰۰۰",
        status: "تایید نشده",
        type: "شارژ کیف پول",
    },
];

const FinancialPage = () => {
    const [filters, setFilters] = useState({
        sort: "createdAt",
        order: "DESC",
        status: "",
        type: "",
    });

    const { data } = usePayments(filters);

    console.log(data?.payments,'from payments')

    const apiPayments = Array.isArray(data?.payments) ? data.payments : [];

    const mappedApiData = useMemo(() => {
        return apiPayments.map((p: any) => ({
            id: p.id,
            date: p.created_at
                ? new Date(p.created_at).toLocaleDateString("fa-IR")
                : "-",
            trackingId: p.trackingId || p.tracking_id || "-",
            amount:
                typeof p.amount === "number"
                    ? p.amount.toLocaleString("fa-IR")
                    : p.amount || "-",
            status: p.status === "completed" ? "تایید شده" : "تایید نشده",
            type: p.type === "wallet" ? "شارژ کیف پول" : "رزرو",
        }));
    }, [apiPayments]);

    const filteredData = useMemo(() => {
        const source = mappedApiData.length > 0 ? mappedApiData : staticData;

        return source.filter((item: any) => {
            const statusMatch =
                filters.status === "" || item.status === filters.status;

            const typeMatch =
                filters.type === "" || item.type === filters.type;

            return statusMatch && typeMatch;
        });
    }, [mappedApiData, filters]);


    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="p-4 md:p-8 space-y-8">
            {mappedApiData.length === 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 text-amber-700 px-4 py-3 text-sm">
                    در حال حاضر داده‌ای از API دریافت نشد و داده‌های نمونه نمایش داده می‌شوند.
                </div>
            )}

            <div className="bg-white dark:bg-[#1E1E1E]">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-row-reverse items-center gap-4 w-full md:w-auto flex-wrap">
                        {/* وضعیت پرداخت */}
                        <div className="relative flex-grow md:w-48">
                            <span className="absolute -top-3 right-6 bg-white dark:bg-[#1E1E1E] px-2 text-[10px] text-slate-400 font-bold">
                                وضعیت پرداخت:
                            </span>

                            <div className="relative">
                                <select
                                    value={filters.status}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            status: e.target.value,
                                        }))
                                    }
                                    className="w-full border-2 border-slate-100 dark:border-white/5 rounded-full px-5 py-3 text-xs font-bold text-slate-400 bg-white dark:bg-[#1E1E1E] appearance-none outline-none cursor-pointer"
                                >
                                    <option value="all">همه</option>
                                    <option value="تایید شده">تایید شده</option>
                                    <option value="تایید نشده">تایید نشده</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* نوع تراکنش */}
                        <div className="relative flex-grow md:w-48">
                            <span className="absolute -top-3 right-6 bg-white dark:bg-[#1E1E1E] px-2 text-[10px] text-slate-400 font-bold">
                                نوع تراکنش:
                            </span>

                            <div className="relative">
                                <select
                                    value={filters.type}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            type: e.target.value,
                                        }))
                                    }
                                    className="w-full border-2 border-slate-100 dark:border-white/5 rounded-full px-5 py-3 text-xs font-bold text-slate-400 bg-white dark:bg-[#1E1E1E] appearance-none outline-none cursor-pointer"
                                >
                                    <option value="all">همه</option>
                                    <option value="رزرو">رزرو</option>
                                    <option value="شارژ کیف پول">شارژ کیف پول</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* مرتب‌سازی */}
                        <div className="relative flex-grow md:w-48">
                            <span className="absolute -top-3 right-6 bg-white dark:bg-[#1E1E1E] px-2 text-[10px] text-slate-400 font-bold">
                                مرتب‌سازی بر اساس:
                            </span>

                            <div className="relative">
                                <select
                                    value={filters.sort}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            sort: e.target.value,
                                        }))
                                    }
                                    className="w-full border-2 border-slate-100 dark:border-white/5 rounded-full px-5 py-3 text-xs font-bold text-slate-400 bg-white dark:bg-[#1E1E1E] appearance-none outline-none cursor-pointer"
                                >
                                    <option value="createdAt">تاریخ ایجاد</option>
                                    <option value="updatedAt">تاریخ بروزرسانی</option>
                                    <option value="amount">مبلغ</option>
                                    <option value="status">وضعیت</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* ترتیب */}
                        <div className="relative flex-grow md:w-48">
                            <span className="absolute -top-3 right-6 bg-white dark:bg-[#1E1E1E] px-2 text-[10px] text-slate-400 font-bold">
                                ترتیب:
                            </span>

                            <div className="relative">
                                <select
                                    value={filters.order}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            order: e.target.value,
                                        }))
                                    }
                                    className="w-full border-2 border-slate-100 dark:border-white/5 rounded-full px-5 py-3 text-xs font-bold text-slate-400 bg-white dark:bg-[#1E1E1E] appearance-none outline-none cursor-pointer"
                                >
                                    <option value="ASC">صعودی (ASC)</option>
                                    <option value="DESC">نزولی (DESC)</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* دانلود */}
                        <button className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-2xl">
                            <Download size={20} />
                        </button>
                    </div>

                    <h1 className="text-xl font-black">لیست تراکنش های شما</h1>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] border overflow-hidden">
                <div className="overflow-x-auto text-right" dir="rtl">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-100/50 dark:bg-white/5 text-xs font-black">
                                <th className="p-6">تاریخ</th>
                                <th className="p-6 text-center">شماره پیگیری</th>
                                <th className="p-6 text-center">مبلغ</th>
                                <th className="p-6 text-center">وضعیت</th>
                                <th className="p-6 text-center">نوع</th>
                                <th className="p-6 text-left">عملیات</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {filteredData.length > 0 ? (
                                filteredData.map((t: any) => (
                                    <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.03]">
                                        <td className="p-6 text-xs">{t.date}</td>

                                        <td className="p-6 text-center text-sm">
                                            {t.trackingId}
                                        </td>

                                        <td className="p-6 text-center text-sm font-black">
                                            {t.amount}
                                        </td>

                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                {t.status === "تایید شده" ? (
                                                    <span className="px-3 py-1 bg-green-500 text-black text-[10px] rounded-full flex items-center gap-1">
                                                        <CheckCircle2 size={12} />
                                                        {t.status}
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-rose-400 text-white text-[10px] rounded-full flex items-center gap-1">
                                                        <XCircle size={12} />
                                                        {t.status}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="p-6 text-center text-xs">{t.type}</td>

                                        <td
                                            onClick={() => {
                                                setSelectedPayment(t);
                                                setOpenModal(true);
                                            }}
                                            className="p-6 text-left text-[10px] font-black text-slate-400 hover:text-primary cursor-pointer"
                                        >
                                            مشاهده رسید
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-sm text-slate-400">
                                        موردی برای نمایش وجود ندارد.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReceiptModal
                open={openModal}
                payment={selectedPayment}
                onClose={() => setOpenModal(false)}
            />

        </div>
    );
};

export default FinancialPage;
