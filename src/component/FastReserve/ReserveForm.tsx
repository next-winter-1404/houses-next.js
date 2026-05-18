"use client";

import Image from 'next/image';
import home from '../../assets/reserve/home.svg';
import { useState } from 'react';
import { useCreateBooking } from '@/core/api/dashboard/booking/bookingQuery/BookingQuery';
import { useRouter } from 'next/navigation';

// آیکون‌ها
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const PriceTagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 15h2v2H7v-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h2a2 2 0 012 2v5a2 2 0 01-2 2h-2m-5 4v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15h2v2h-2v-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 15v2" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const ReservationForm = ({ data }) => {
    const router = useRouter();
    const { mutate, isPending } = useCreateBooking();

    const [dates, setDates] = useState({
        start: "",
        end: ""
    });

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        nationalId: "",
        sharedEmail: "",
        sharedMobile: "",
    });

    const price = Number(data?.price);
    const discounted = Number(data?.discounted_price);

    const discountPercent =
        discounted && price && discounted < price
            ? Math.round(((price - discounted) / price) * 100)
            : null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookingData = {
            houseId: data?.id,
            reservedDates: [dates.start, dates.end],
            traveler_details: [
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    gender: formData.gender,
                    birthDate: formData.birthDate,
                    nationalId: formData.nationalId,
                }
            ],
            sharedEmail: formData.sharedEmail,
            sharedMobile: formData.sharedMobile,
        };


        mutate(bookingData, {
            onSuccess: (response) => {
                const firstTraveler = response.traveler_details?.[0] || {};
                localStorage.setItem(
                    "bookingInfo",
                    JSON.stringify({
                        bookingId: response.id,
                        userId: response.user_id,
                        
                        firstName: firstTraveler.firstName,
                        lastName: firstTraveler.lastName,
                        gender: firstTraveler.gender,
                        birthDate: firstTraveler.birthDate,
                        nationalId: firstTraveler.nationalId,
                    })
                );
                router.push(`${data?.id}/Payment`);
            }
        });
    };

    return (
        <div dir="rtl" className="w-[90%] flex flex-col justify-center items-center bg-[#FFFFFA] dark:bg-[#272727] border rounded-3xl p-6 gap-5">

            <div className='w-full flex flex-row justify-center items-center gap-3'>
                <Image src={home} alt='' unoptimized className='w-6 h-6' />
                <h2 className='text-2xl'>رزرو خونه برای</h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

                <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">تاریخ رفت</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <div className="flex items-center gap-3">
                            <input
                                type='date'
                                className="font-semibold text-sm"
                                value={dates.start}
                                onChange={(e) => setDates({ ...dates, start: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">تاریخ برگشت</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <div className="flex items-center gap-3">
                            <input
                                type='date'
                                className="font-semibold text-sm"
                                value={dates.end}
                                onChange={(e) => setDates({ ...dates, end: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">تعداد مسافران</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <div className="flex items-center gap-3 w-full">
                            <input type='text' className="w-full font-semibold text-sm outline-0" placeholder='5 نفر' />
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">نام</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <input
                            type="text"
                            className="w-full font-semibold text-sm outline-0"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">نام خانوادگی</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <input
                            type="text"
                            className="w-full font-semibold text-sm outline-0"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">جنسیت</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <input
                            type="text"
                            className="w-full font-semibold text-sm outline-0"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        />
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">تاریخ تولد</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <input
                            type="date"
                            className="w-full font-semibold text-sm outline-0"
                            value={formData.birthDate}
                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        />
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">کد ملی</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <input
                            type="text"
                            className="w-full font-semibold text-sm outline-0"
                            value={formData.nationalId}
                            onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                        />
                    </div>
                </div>

                {/* <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">ایمیل مشترک</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <input
                            type="email"
                            className="w-full font-semibold text-sm outline-0"
                            value={formData.sharedEmail}
                            onChange={(e) => setFormData({ ...formData, sharedEmail: e.target.value })}
                        />
                    </div>
                </div> */}

                {/* <div className='w-full flex flex-col gap-3'>
                    <p className="text-xl">موبایل مشترک</p>
                    <div className="w-full flex items-center justify-between dark:bg-[#353535] bg-gray-100 rounded-full px-4 py-3">
                        <input
                            type="text"
                            className="w-full font-semibold text-sm outline-0"
                            value={formData.sharedMobile}
                            onChange={(e) => setFormData({ ...formData, sharedMobile: e.target.value })}
                        />
                    </div>
                </div> */}

                <div className='w-full flex flex-col justify-center items-center'>
                    <div className="w-full flex items-center gap-2 mb-4 ">
                        <div className='w-[33%] border-b border-2'></div>
                        <div className='w-[33%] dark:text-[#D9D9E0] flex flex-row justify-center items-center gap-2'>
                            <PriceTagIcon />
                            <h3 className="font-bold text-gray-800 dark:text-[#D9D9E0]">قیمت های رزرو</h3>
                        </div>
                        <div className='w-[33%] border-b border-2'></div>
                    </div>

                    <div className="space-y-3 text-xl w-[80%]">
                        <div className="flex justify-between items-center pb-2 ">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 dark:text-[#D9D9E0]">5 شب</span>
                                <span className="text-gray-400 dark:text-[#D9D9E0] flex flex-row-reverse gap-1">
                                    <p>ت</p>
                                    17.000.000
                                </span>
                            </div>
                            <span className="text-gray-600 dark:text-[#D9D9E0] flex flex-row-reverse gap-1">
                                <p>ت</p>
                                18.000.000
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="w-full flex items-center gap-2 mb-4 ">
                        <div className='w-[33%] border-b border-2'></div>
                        <div className='w-[33%] flex flex-row justify-center items-center gap-2'>
                            <PriceTagIcon />
                            <h3 className="font-bold text-gray-800 dark:text-[#D9D9E0]">قیمت  نهایی</h3>
                        </div>
                        <div className='w-[33%] border-b border-2'></div>
                    </div>

                    <div className="flex justify-center items-center w-full">
                        <div className="w-[90%] flex items-center gap-4">
                            <div className="bg-orange-500 text-white text-sm font-bold w-14 h-12 flex items-center justify-center rounded-full">
                                %{discountPercent}
                            </div>

                            <div className='w-[90%] bg-gray-200 rounded-full flex flex-row-reverse gap-3 justify-center items-center p-3'>
                                <p className="text-sm font-extrabold text-gray-900">
                                    {Number(data?.discounted_price).toLocaleString("fa-IR")}
                                    <span className="text-sm font-normal">تومان</span>
                                </p>
                                <p className="text-orange-500 line-through">
                                    {Number(data?.price).toLocaleString("fa-IR")} تومان
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-900 text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-300"
                >
                    <span>{isPending ? "در حال ثبت..." : "همین الان رزرو کن"}</span>
                    <ArrowLeftIcon />
                </button>

            </form>
        </div>
    );
};

export default ReservationForm;
