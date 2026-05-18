"use client"
import React, { useEffect, useState } from "react";
import { Step3Confirmation } from "./Step3Confirmation";
import { SuccessModal } from "./SuccessModal";
import Image from "next/image";
import step1 from "../../../../../assets/payment/Apartment.svg";
import step2 from "../../../../../assets/payment/user.svg";
import step2blue from "../../../../../assets/payment/userblue.svg";
import step3 from "../../../../../assets/payment/Tick.svg";
import step3blue from "../../../../../assets/payment/Tickblue.svg";
import step4 from "../../../../../assets/payment/money-01.svg";
import step5 from "../../../../../assets/payment/tiket.svg";
import { useCreatePayment } from "@/core/api/dashboard/paymets/PaymentsQuery/PaymetsQuery";
import { Step2Passengers } from "./Step2Passengers ";


const PaymentWizard = ({ bookingData }) => {

    const price = Number(bookingData?.price)
    const discounted = Number(bookingData?.discounted_price)

    const discountPercent =
        discounted && price && discounted < price
            ? Math.round(((price - discounted) / price) * 100)
            : null
    const [passengerInfo, setPassengerInfo] = useState(null);

    useEffect(() => {
        const item = localStorage.getItem("bookingInfo");
        if (item) {
            setPassengerInfo(JSON.parse(item));
        }
    }, []);

    const [currentStep, setCurrentStep] = useState(2);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // استفاده از هوک
    const { mutate, isPending } = useCreatePayment();

    const steps = [
        { id: 1, title: 'انتخاب هتل', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending' },
        { id: 2, title: 'مشخصات مسافران', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending' },
        { id: 3, title: 'تایید اطلاعات', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending' },
        { id: 4, title: 'پرداخت آنلاین', status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'active' : 'pending' },
        { id: 5, title: 'صدور بلیت', status: currentStep > 5 ? 'completed' : currentStep === 5 ? 'active' : 'pending' },
    ];

    const handleNextStep = () => {
        if (currentStep === 3) {

            const payload = {
                amount: bookingData?.discounted_price,
                description: `پرداخت بابت رزرو شماره ${bookingData?.id || 'تست'}`,
                callbackUrl: `http://localhost:3000/FastReserve/${bookingData?.id}/Payment`,
                bookingId: passengerInfo?.bookingId
            };

            mutate(payload, {
                onSuccess: (res) => {
                    setCurrentStep(4);
                    if (res?.paymentUrl) {
                        window.location.href = res.paymentUrl;
                    }
                },
                onError: () => {
                    alert("خطا در برقراری ارتباط با درگاه");
                }
            });
        } else {
            setCurrentStep(prev => Math.min(prev + 1, 5));
        }
    };

    return (
        <div dir="rtl" className="w-full h-full p-4 max-sm:p-0 relative">

            {/* Progress Navigation - بدون تغییر استایل */}
            <div className=" flex items-center justify-between bg-gray-50 dark:bg-[#353535] dark:text-white p-2 rounded-full mb-6 border text-sm overflow-x-auto">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div
                            onClick={() => !isPending && setCurrentStep(step.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${step.status === 'completed' ? 'bg-blue-800 text-white' :
                                step.status === 'active' ? 'border border-blue-800 text-blue-800 bg-white dark:bg-[#353535] shadow-sm' :
                                    'text-gray-400'
                                }`}
                        >
                            <span>
                                {step.id === 1 && <Image src={step1} alt="" unoptimized className="w-10 max-sm:w-5" />}
                                {step.id === 2 && <Image src={step.status === 'completed' ? step2 : step2blue} alt="" unoptimized className="w-10 max-sm:w-5" />}
                                {step.id === 3 && <Image src={step.status === 'completed' ? step3 : step3blue} alt="" unoptimized className="w-10 max-sm:w-5" />}
                                {step.id === 4 && <Image src={step4} alt="" unoptimized className="w-10 max-sm:w-5" />}
                                {step.id === 5 && <Image src={step5} alt="" unoptimized className="w-10 max-sm:w-5" />}
                            </span>
                            <span className='text-sm md:text-base font-medium whitespace-nowrap max-sm:hidden'>{step.title}</span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-[2px] mx-2 transition-colors ${step.status === 'completed' ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Main Form */}
            <div className="border rounded-3xl p-6 md:p-8 bg-white dark:bg-[#272727] shadow-sm flex flex-col gap-8">

                {currentStep === 2 && <Step2Passengers passengerInfo={passengerInfo} setPassengerInfo={setPassengerInfo} />}
                {currentStep === 3 && <Step3Confirmation />}
                {(currentStep === 4 || isPending) && (
                    <div className="text-center py-10 text-lg font-bold text-gray-600 animate-pulse">
                        در حال اتصال به درگاه پرداخت امن...
                    </div>
                )}

                <hr className="border-gray-200" />

                <div className="flex items-center justify-between pt-2 max-sm:hidden" dir='ltr'>
                    <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={isPending}
                        className={`${isPending ? 'bg-gray-400' : 'bg-blue-800 hover:bg-blue-700'} text-white px-6 py-3 rounded-full font-semibold flex flex-row-reverse items-center gap-2 transition`}
                    >
                        {isPending ? 'لطفاً صبر کنید...' : currentStep === 3 ? 'پرداخت آنلاین' : 'تایید و ادامه فرایند'}
                        <span>‹</span>
                    </button>

                    <div className="text-gray-800 flex items-center gap-2 flex-row-reverse" dir='rtl'>
                        <span className="text-gray-500 text-sm">قیمت کل</span>
                        <span className="text-2xl font-bold text-blue-900">{Number(bookingData?.discounted_price).toLocaleString("fa-IR")}</span>
                        <span className="text-gray-500 text-sm">تومان</span>
                    </div>
                </div>
            </div>

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
            />
        </div>
    );
};

export default PaymentWizard;
