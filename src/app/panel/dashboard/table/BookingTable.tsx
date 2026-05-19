import { useBookings } from '@/core/api/dashboard/booking/bookingQuery/BookingQuery'
import React from 'react'

const staticBookings = [
    {
        id: 1,
        villaName: 'ویلای دوبلکس ساحلی',
        date: '۲۴ مهر ۱۴۰۲',
        status: 'تکمیل شده',
    },
    {
        id: 2,
        villaName: 'سوئیت جنگلی رامسر',
        date: '۱۸ مهر ۱۴۰۲',
        status: 'در انتظار',
    },
    {
        id: 3,
        villaName: 'کلبه لوکس کوهستانی',
        date: '۱۲ مهر ۱۴۰۲',
        status: 'لغو شده',
    },
]

const BookingTable = () => {
    const { data } = useBookings()
    const booking = data?.data

    const bookingsData =
        booking && booking.length > 0 ? booking : staticBookings

    const isStaticData = !booking || booking.length === 0

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'text-emerald-500'

            case 'pending ':
                return 'text-yellow-500'

            case ' canceled':
                return 'text-red-500'

            default:
                return 'text-slate-400'
        }
    }
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'تکمیل شده'
            case 'pending':
                return 'در انتظار'
            case 'canceled':
                return 'لغو شده'
            default:
                return status
        }
    }


    const formatDate = (date) => {
        const d = new Date(date);

        const day = d.toLocaleDateString("fa-IR", { day: "numeric" });
        const month = d.toLocaleDateString("fa-IR", { month: "long" });
        const year = d.toLocaleDateString("fa-IR", { year: "numeric" });
        const time = d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

        return `${day} ${month} - ${year} / ${time}`;
    };
    return (
        <div className="lg:col-span-2 bg-white dark:bg-[#1E1E1E] rounded-[32px] p-8 border border-gray-100 dark:border-white/5 shadow-sm">

            <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-lg dark:text-white">
                    آخرین رزروها
                </h3>

                {isStaticData && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                        داده نمایشی (استاتیک)
                    </span>
                )}
            </div>

            <div className="space-y-4 h-70 overflow-y-scroll">
                {bookingsData.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors"
                    >
                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                #
                            </div>

                            <div>
                                <p className="font-bold text-sm dark:text-white">
                                    {item?.house?.title}
                                </p>

                                <p className="text-xs text-slate-400">
                                    {formatDate(item?.reservedDates[0])}
                                </p>
                            </div>
                        </div>

                        <span
                            className={`text-xs font-bold ${getStatusColor(item?.status)}`}
                        >
                            {getStatusLabel(item?.status)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookingTable
