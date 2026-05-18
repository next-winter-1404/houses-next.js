import Image from "next/image";
import adduser from "../../../../../assets/details/user-add.svg";
import clock from "../../../../../assets/details/clock.svg";
import { useEffect } from "react";

export const Step2Passengers = ({ passengerInfo, setPassengerInfo }) => {
    useEffect(() => {
        if (!passengerInfo && typeof window !== "undefined") {
            const stored = localStorage.getItem("passengerInfo");
            if (stored) {
                setPassengerInfo(JSON.parse(stored));
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updated = {
            ...passengerInfo,
            [name]: value,
        };

        setPassengerInfo(updated);

        if (typeof window !== "undefined") {
            localStorage.setItem("passengerInfo", JSON.stringify(updated));
        }
    };
    return (
        <div className="flex  flex-col gap-10">

            <section>
                <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-[#D9D9E0]">مشخصات مسافران</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
                    <input type="text" placeholder={passengerInfo?.firstName} className="bg-gray-100 dark:bg-[#353535] dark:text-white p-3 rounded-full outline-none focus:ring-2 ring-blue-500 w-full" />
                    <input type="text" placeholder={passengerInfo?.lastName} className="bg-gray-100 p-3  dark:bg-[#353535] dark:text-white rounded-full outline-none focus:ring-2 ring-blue-500 w-full" />
                    <input type="text" placeholder={passengerInfo?.gender} className="bg-gray-100 p-3 dark:bg-[#353535] dark:text-white rounded-full outline-none focus:ring-2 ring-blue-500 w-full" />
                    <input type="text" placeholder={passengerInfo?.birthDate} className="bg-gray-100 p-3 dark:bg-[#353535] dark:text-white rounded-full outline-none focus:ring-2 ring-blue-500 w-full" />
                    <input type="text" placeholder={passengerInfo?.nationalId} className="bg-gray-100 p-3 dark:bg-[#353535] dark:text-white rounded-full outline-none focus:ring-2 ring-blue-500 w-full md:col-start-1" />

                    <div className="flex flex-row-reverse max-sm:flex-col gap-3 justify-end mt-4">
                        <button className="border w-[50%] max-sm:w-full flex-row justify-center border-blue-800 text-blue-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-50 transition">
                            <span><Image src={clock} alt="" unoptimized /></span> انتخاب مسافران سابق
                        </button>
                        <button className="bg-blue-800 w-[50%] max-sm:w-full flex-row justify-center text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition">
                            <span><Image src={adduser} alt="" unoptimized /></span> افزودن مسافر جدید
                        </button>
                    </div>
                </div>
            </section>

            <hr className="border-gray-200" />

            <section >
                <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-[#D9D9E0]" >ارسال بلیت به دیگران</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="شماره تلفن" className="bg-gray-100 p-3 dark:bg-[#353535] dark:text-white rounded-full outline-none focus:ring-2 ring-blue-500 w-full" />
                    <input type="email" placeholder="ایمیل" className="bg-gray-100 p-3 dark:bg-[#353535] dark:text-white rounded-full outline-none focus:ring-2 ring-blue-500 w-full" />
                </div>
                <div className="flex justify-start  mt-4 " >
                    <button className="bg-blue-800 max-sm:w-full text-center text-white px-6 py-2 rounded-full flex flex-row items-center gap-2 hover:bg-blue-700 transition">
                        ثبت اطلاعات <span dir="ltr">‹</span>
                    </button>
                </div>
            </section>
        </div>
    );
};