import Image from 'next/image'
import Link from 'next/link'
import picture from '../../../../assets/landing/card.jpg'
import loc from '../../../../assets/landing/location.svg'


const PayMentCard = ({ value }) => {
    const price = Number(value?.price)
    const discounted = Number(value?.discounted_price)

    const discountPercent =
        discounted && price && discounted < price
            ? Math.round(((price - discounted) / price) * 100)
            : null
    return (
        <div className='w-full flex flex-col justify-center items-center  '>
            <Link href={`FastReserve/${value?.id}`} className='flex flex-col w-full max-sm:w-full max-sm:h-130 bg-white rounded-3xl overflow-hidden border dark:border-[#313131] shadow-sm mx-auto font-sans'>
                {/* image holder */}
                <div className='relative h-80 w-full overflow-hidden'>
                    <Image
                        src={value?.photos?.[0] || picture}
                        fill
                        alt="landing background"
                        className="object-cover"
                        unoptimized
                    />

                    {/* Top Right Badges */}
                    <div className='absolute top-3 right-3 flex gap-2'>
                        <div className='bg-[#FF4D4D] text-white px-4 py-3  rounded-full text-2xl max-sm:px-2 max-sm:py-0 max-sm:h-10 max-sm:text-sm font-bold flex items-center justify-center shadow-md'>
                            %{discountPercent}
                        </div>
                        <div className='bg-[#1E3A8A] text-white px-3 py-3 rounded-full text-2xl max-sm:text-sm max-sm:h-10 font-bold flex items-center justify-center gap-1 shadow-md'>
                            <span>{value?.rate}</span>
                            {/* You can replace this star with an SVG or icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* Location Overlay */}
                    <div className=' w-full absolute bottom-3 right-3 flex flex-row gap-1 justify-start items-center text-white drop-shadow-md'>
                        <Image
                            src={loc}
                            width={20}
                            height={20}
                            alt="location"
                            className="object-contain w-[5%] text-white"
                            unoptimized
                        />
                        <p className='text-2xl max-sm:text-sm font-medium text-right'>{value?.address || "خیابان 404 بروکلین کالیفرنیا نیویورک"}</p>
                    </div>
                </div>

                {/* card info */}
                <div className='flex flex-col bg-[#FFFFFA] dark:bg-[#353535] p-5 gap-6'>

                    <div className='w-full flex flex-row justify-center items-center '>
                        <p className='w-[50%] text-sm text-gray-400 '>تاریخ ورود به هتل  </p>
                        <span className='w-[50%] text-gray-400 text-left'>1404/06/16</span>
                    </div>
                    <div className='w-full flex flex-row justify-center items-center '>
                        <p className='w-[50%] text-sm text-gray-400 '>تاریخ ورود به هتل  </p>
                        <span className='w-[50%] text-gray-400 text-left'>1404/06/16</span>
                    </div>


                    {/* Pricing Area */}
                    <div className='bg-[#F3F4F6] rounded-full max-sm:py-3 flex flex-row-reverse justify-center items-center py-5 px-4 mt-2'>
                        {value?.price && (
                            <>
                                <span className='flex flex-row-reverse justify-center items-center text-xl max-sm:text-sm text-[#EF4444] line-through ml-2 font-medium'>
                                    {Number(value?.price).toLocaleString("fa-IR") || "5,500,000"}
                                    <span className='mr-1'>تومان</span>
                                </span>
                                <div className='w-[1px] h-4 bg-gray-300 mx-2'></div>
                            </>
                        )}
                        <span className='flex flex-row-reverse justify-center items-center text-xl max-sm:text-xl font-bold text-black gap-1'>
                            {Number(value?.discounted_price).toLocaleString("fa-IR") || "4,500,000"}
                            <span className='text-xl font-normal ml-1 max-sm:text-xl'>ت</span> /
                            <span className='text-xl max-sm:text-sm text-gray-500 font-normal'> هر شب</span>
                        </span>
                    </div>
                    {/* button */}

                    <button className='w-full rounded-full bg-blue-900 p-5 max-sm:p-3 flex justify-center items-center text-white'>
                        <p>تغییر هتل</p>
                    </button>
                </div>

            </Link>
        </div>

    )
}

export default PayMentCard