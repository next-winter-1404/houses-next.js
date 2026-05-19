"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    MoreHorizontal,
    SlidersHorizontal,
    CheckCircle2,
    XCircle,
    Clock,
    CreditCard,
    Info,
    Trash2,
    AlertCircle,
} from "lucide-react";
import { useBookings } from "@/core/api/dashboard/booking/bookingQuery/BookingQuery";

const BookingsPage = () => {
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 5;

    const { data: apiData, isLoading } = useBookings();

    const staticBookings = [
        {
            id: 1,
            property: "هتل سراوان رانین رشت (استاتیک)",
            date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
            amount: "۱,۸۰۰,۰۰۰",
            passengers: "۲ عدد مسافر",
            status: "تایید شده",
            payment: "لغو شده",
            travelerDetails: [],
        },
        {
            id: 2,
            property: "هتل سراوان رانین رشت (استاتیک)",
            date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
            amount: "۱,۸۰۰,۰۰۰",
            passengers: "۲ عدد مسافر",
            status: "در انتظار",
            payment: "تایید شده",
            travelerDetails: [],
        },
        {
            id: 3,
            property: "هتل سراوان رانین رشت (استاتیک)",
            date: "۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳",
            amount: "۱,۸۰۰,۰۰۰",
            passengers: "۲ عدد مسافر",
            status: "تایید شده",
            payment: "تایید شده",
            travelerDetails: [],
        },
    ];

    const rawData = Array.isArray(apiData) ? apiData : (apiData as any)?.data || [];
    const isDataStatic = !isLoading && rawData.length === 0;

    const allMappedData = useMemo(() => {
        return isDataStatic
            ? staticBookings
            : rawData.map((item: any) => ({
                id: item.id,
                property: item?.house?.title || `اقامتگاه کد ${item.houseId}`,
                date: item?.reservedDates?.length
                    ? `${new Date(item.reservedDates[0]).toLocaleDateString("fa-IR")} - ${new Date(
                        item.reservedDates[1]
                    ).toLocaleDateString("fa-IR")}`
                    : new Date(item.created_at).toLocaleDateString("fa-IR"),
                amount: item?.house?.price
                    ? Number(item.house.price).toLocaleString("fa-IR")
                    : "نامشخص",
                passengers: `${item.traveler_details?.length || 0} عدد مسافر`,
                travelerDetails: item.traveler_details || [],
                status:
                    item.status === "pending"
                        ? "در انتظار"
                        : item.status === "confirmed"
                            ? "تایید شده"
                            : "لغو شده",
                payment:
                    item.status === "confirmed"
                        ? "تایید شده"
                        : item.status === "pending"
                            ? "در انتظار"
                            : "لغو شده",
            }));
    }, [isDataStatic, rawData]);

    const filteredData = useMemo(() => {
        return allMappedData.filter((item: any) =>
            item.property?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allMappedData, searchTerm]);

    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

    const paginatedData = useMemo(() => {
        return filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }, [filteredData, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "تایید شده":
                return (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/50 text-black rounded-full text-[10px] font-black border border-[#CCFF00]/30">
                        <CheckCircle2 size={12} /> {status}
                    </span>
                );
            case "لغو شده":
                return (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 text-rose-500 rounded-full text-[10px] font-black border border-rose-200">
                        <XCircle size={12} /> {status}
                    </span>
                );
            case "در انتظار":
                return (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-500 rounded-full text-[10px] font-black border border-amber-200">
                        <Clock size={12} /> {status}
                    </span>
                );
            default:
                return null;
        }
    };

    if (isLoading) return <div className="p-10 text-center font-bold">در حال بارگذاری...</div>;

    return (
        <div className="p-4 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-row-reverse justify-between items-end gap-6 bg-white dark:bg-[#1E1E1E]">
                <div className="flex flex-row-reverse items-center gap-4 w-full md:w-auto">
                    <button className="bg-black hover:bg-[#353535] text-white font-black px-6 py-3 rounded-2xl transition-all flex items-center gap-2 text-sm">
                        فیلترها
                        <SlidersHorizontal size={18} />
                    </button>

                    <div className="relative flex-grow md:w-80 group">
                        <span className="absolute -top-3 right-6 bg-white dark:bg-[#1E1E1E] px-2 text-[10px] text-slate-400 font-bold z-10">
                            جستجو:
                        </span>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="نام هتل مورد نظر..."
                            className="w-full bg-transparent border-2 border-slate-100 dark:border-white/5 rounded-full px-6 py-3 text-sm outline-none focus:border-black transition-all text-right"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <h1 className="text-xl font-black text-slate-800 dark:text-white">لیست رزرو های شما</h1>
                    {isDataStatic && (
                        <span className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                            <AlertCircle size={12} /> در حال نمایش دیتای استاتیک
                        </span>
                    )}
                </div>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] rounded-[32px] shadow-sm border border-slate-50 dark:border-white/5 overflow-hidden">
                <div className="overflow-x-auto text-right" dir="rtl">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/5 text-slate-400 text-[11px] font-black uppercase tracking-wider">
                                <th className="p-5 text-center">نام اقامتگاه</th>
                                <th className="p-5">تاریخ رزرو</th>
                                <th className="p-5">قیمت کل</th>
                                <th className="p-5 text-center">تعداد مسافر</th>
                                <th className="p-5 text-center">وضعیت رزرو</th>
                                <th className="p-5 text-center">وضعیت پرداخت</th>
                                <th className="p-5 w-10"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item: any, index: number) => (
                                    <tr key={item.id ?? index} className="group hover:bg-slate-50/30 dark:hover:bg-white/[0.02] transition-all">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 bg-slate-100 dark:bg-white/10 rounded-2xl flex-shrink-0"></div>
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                                    {item.property}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="p-5 text-xs font-medium text-slate-500 leading-relaxed tabular-nums">
                                            {item.date}
                                        </td>

                                        <td className="p-5 text-sm font-black text-slate-800 dark:text-white tabular-nums">
                                            {item.amount} <span className="text-[10px] font-normal opacity-60">ت</span>
                                        </td>

                                        <td className="p-5 text-center text-xs font-bold text-slate-600 dark:text-slate-400">
                                            {item.passengers}
                                        </td>

                                        <td className="p-5">
                                            <div className="flex justify-center">{getStatusBadge(item.status)}</div>
                                        </td>

                                        <td className="p-5">
                                            <div className="flex justify-center">{getStatusBadge(item.payment)}</div>
                                        </td>

                                        <td className="p-5 relative">
                                            <button
                                                onClick={() => setOpenMenu(openMenu === index ? null : index)}
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-400"
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>

                                            {openMenu === index && (
                                                <div className="absolute left-full top-0 mt-2 w-32 bg-white dark:bg-[#252525] shadow-2xl rounded-2xl border border-slate-100 dark:border-white/10 z-50 overflow-hidden animate-in zoom-in-95">
                                                    <button className="w-full px-4 py-3 text-[11px] font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between">
                                                        پرداخت <CreditCard size={14} className="text-slate-400" />
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setSelectedBooking(item);
                                                            setOpenMenu(null);
                                                        }}
                                                        className="w-full px-4 py-3 text-[11px] font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between border-y border-slate-50 dark:border-white/5"
                                                    >
                                                        جزئیات <Info size={14} className="text-slate-400" />
                                                    </button>

                                                    <button className="w-full px-4 py-3 text-[11px] font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center justify-between">
                                                        حذف <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-10 text-center text-slate-500 text-sm font-bold">
                                        موردی یافت نشد
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 py-4 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all ${currentPage === page
                                    ? "bg-black text-white shadow-lg shadow-[#CCFF00]/20"
                                    : "bg-white dark:bg-[#1E1E1E] text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}

            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setSelectedBooking(null)}
                            className="absolute top-4 left-4 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-black mb-6 text-slate-800 dark:text-white">جزئیات رزرو</h2>

                        <div className="grid grid-cols-2 gap-6 text-sm mb-8">
                            <div>
                                <div className="text-slate-400 text-xs mb-1">نام اقامتگاه</div>
                                <div className="font-bold text-slate-800 dark:text-white">{selectedBooking.property}</div>
                            </div>

                            <div>
                                <div className="text-slate-400 text-xs mb-1">تاریخ رزرو</div>
                                <div className="font-bold text-slate-800 dark:text-white">{selectedBooking.date}</div>
                            </div>

                            <div>
                                <div className="text-slate-400 text-xs mb-1">قیمت کل</div>
                                <div className="font-bold text-slate-800 dark:text-white">{selectedBooking.amount} ت</div>
                            </div>

                            <div>
                                <div className="text-slate-400 text-xs mb-1">وضعیت رزرو</div>
                                <div>{getStatusBadge(selectedBooking.status)}</div>
                            </div>
                        </div>

                        {selectedBooking.travelerDetails?.length > 0 && (
                            <div>
                                <h3 className="text-sm font-black mb-4 text-slate-700 dark:text-white">اطلاعات مسافران</h3>

                                <div className="space-y-4">
                                    {selectedBooking.travelerDetails.map((traveler: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4 border border-slate-100 dark:border-white/5"
                                        >
                                            <div className="font-black text-slate-800 dark:text-white mb-2">
                                                {traveler.firstName} {traveler.lastName}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
                                                <div>کد ملی: {traveler.nationalId}</div>
                                                <div>جنسیت: {traveler.gender}</div>
                                                <div>
                                                    تاریخ تولد: {traveler.birthDate ? new Date(traveler.birthDate).toLocaleDateString("fa-IR") : "-"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingsPage;
