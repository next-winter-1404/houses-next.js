'use client'
import { useState } from "react";
import { useRegisterComplete } from "@/core/api/register/RegisterQuery/RegisterQuery";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Step3Form = ({ onBack, userId }) => {
    const router = useRouter()
    const { mutate, isPending } = useRegisterComplete();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("رمز عبور و تکرار آن یکسان نیستند");
            return;
        }

        mutate(
            {
                userId,
                password,
                phoneNumber
            },
            {
                onSuccess: () => {
                    toast.success("ثبت نام با موفقیت انجام شد ");
                    router.push("/")
                    router.refresh()
                },
                onError: (error) => {
                    const message =
                        error?.response?.data?.message ||
                        error?.response?.data?.error ||
                        "خطایی رخ داده است";

                    toast.error(message);
                }
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">

            <div className="relative w-full">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>

                <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border dark:bg-[#353535] text-gray-700 outline-none p-3.5 pr-12 rounded-full focus:border-[#1a3b99] transition-colors placeholder:text-gray-400 text-sm"
                    placeholder="شماره موبایل"
                    type="text"
                />
            </div>

            <div className="relative w-full">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border dark:bg-[#353535] text-gray-700 outline-none p-3.5 pr-12 rounded-full focus:border-[#1a3b99] transition-colors placeholder:text-gray-400 text-sm"
                    placeholder="رمز عبور"
                    type="password"
                />
            </div>

            <div className="relative w-full">
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border dark:bg-[#353535] text-gray-700 outline-none p-3.5 pr-12 rounded-full focus:border-[#1a3b99] transition-colors placeholder:text-gray-400 text-sm"
                    placeholder="تکرار رمز عبور"
                    type="password"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-[#1a3b99] text-white p-4 rounded-full mt-2 font-bold text-sm hover:bg-blue-900 transition-colors disabled:bg-gray-400"
            >
                {isPending ? "در حال ارسال..." : "ارسال و ورود"}
            </button>

            <div className="flex justify-end mt-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1"
                >
                    بازگشت
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            </div>

        </form>
    );
};
