"use client"

import { useLogin } from '@/core/api/Login/LoginQuery/LoginQuery'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Form = () => {
    const router = useRouter()
    const { mutate, isPending } = useLogin()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutate(
            { email, password },
            {
                onSuccess: () => {
                    toast.success("ورود با موفقیت انجام شد")
                    router.push("/")
                    router.refresh()
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "خطایی رخ داده است ❌")
                }
            }
        )
    }

    return (
        <div>
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">

                <div className="relative w-full">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-full outline-none focus:border-[#1a3b99]"
                        placeholder="ایمیل خود را وارد کنید"
                        type="email"
                        required
                    />
                </div>

                <div className="relative w-full">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-full outline-none focus:border-[#1a3b99]"
                        placeholder="رمز عبور خود را وارد کنید"
                        type="password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#1a3b99] text-white p-4 rounded-full mt-4 font-bold text-base hover:bg-blue-900 transition-colors disabled:bg-gray-400"
                >
                    {isPending ? "در حال ورود..." : "ورود به حساب کاربری"}
                </button>

                <Link href='/Forget' className="text-[#1a3b99] text-sm text-center mt-2">
                    رمز خود را فراموش کرده‌اید؟
                </Link>
            </form>
        </div>
    )
}

export default Form
