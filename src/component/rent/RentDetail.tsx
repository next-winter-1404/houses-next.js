"use client"
import React, { FC } from 'react'
import Breadcrumb from '../common/Breadcrumb'
import { slides } from '../Landing/suggestion/Suggestion';
import Image from 'next/image';
import start from '../../assets/landing/start.svg'
import loca from '../../assets/landing/location.svg'
import shair from '../../assets/reserve/Only-IconButton.svg'
import copy from '../../assets/details/Only-IconButton.svg'
import houses from '../../assets/reserve/Frame 14333.png'
import house1 from '../../assets/reserve/image 2.svg'
import house2 from '../../assets/reserve/image 3.svg'
import ReserveComments from '../FastReserve/ReserveComments';
import RentForm from './RentForm';
import FacilitiesRent from './FacilitiesRent';
import Card from '../common/Card';
import { useHouseById } from '@/core/api/housesDetail/housesQuery/HousesQuery';
import Appointments from '../common/Appointments';
import { useAddFavorite } from '@/core/api/favorite/favoritesQuery.ts/favoritesQuery';
import toast from 'react-hot-toast';

interface IProps {
    id: string;
}

const RentDetail: FC<IProps> = ({ id }) => {

    const { data} = useHouseById(id)

    const { mutate: addFavorite, isPending } = useAddFavorite();

    const handleAddFavorite = () => {
        if (!id) return;

        addFavorite(
            { house_id: id },
            {
                onSuccess: () => {
                    toast.success("به علاقه‌مندی‌ها اضافه شد ✅");
                },
                onError: () => {
                    toast.error("خطا در افزودن به علاقه‌مندی‌ها ❌");
                },
            }
        );
    };


    return (
        <div className='w-full flex flex-col justify-center items-center gap-10 p-10' dir='rtl'>

            <Breadcrumb />

            {/* top side picture div */}
            <div className='w-full flex flex-col justify-center items-center gap-5 '>

                {/* title div */}
                <div className='w-full flex flex-row justify-center items-center px-5'>
                    <h1 className='w-[50%] flex justify-start items-center text-3xl'>{data?.title}</h1>
                    <div className='w-[50%] flex justify-end items-center '>
                        <div className='bg-blue-900 px-5 py-2 w-[15%]  rounded-full text-white flex flex-row-reverse justify-center items-center gap-1'>
                            <Image src={start} alt='' unoptimized />
                            <p>ستاره</p>
                            {data?.rate}
                        </div>
                    </div>
                </div>

                {/* location div */}
                <div className='w-full flex flex-row justify-center items-center px-5'>
                    <h1 className='w-[50%] flex justify-start items-center text-gray-400 text-xl'>
                        <Image src={loca} alt='' unoptimized />
                        {data?.address}
                    </h1>
                    <div className='w-[50%] flex justify-end items-center '>
                        <div className=' w-[15%]  flex flex-row-reverse justify-start items-center gap-1'>
                            <Image src={shair} alt='' unoptimized />
                            <Image src={copy} alt='' unoptimized className='' />
                            <button
                                onClick={handleAddFavorite}
                                disabled={isPending}
                                className='text-gray-500  hover:text-red-500 transition text-2xl'
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-12 h-12 text-gray-500 hover:text-red-500 transition"
                                >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
        2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.53h.56
        C12.09 5.01 13.76 4 15.5 4 
        18 4 20 6 20 8.5
        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* houses images */}
                <div className='w-full '>
                    <Image src={houses} alt='' unoptimized className='w-full' />
                </div>

                {/* middle div */}
                <div className='w-full flex flex-row justify-center items-start gap-20 p-10 '>

                    {/* comments and description  */}
                    <div className="w-[70%] bg-white dark:bg-transparent flex flex-col justify-center items-center rounded-lg">
                        <section>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-right dark:text-[#D9D9E0]">چرا {data?.title} رو انتخاب کنیم؟</h2>
                            <p className="text-gray-600 leading-relaxed text-xl text-right dark:text-[#D9D9E0]">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                            </p>
                            <div className="w-full  flex flex-row  justify-center items-center gap-10 p-5">
                                <div className='w-[70%] flex flex-row justify-center items-center  gap-10 '>
                                    <Image src={house1} alt="Lighthouse" className="w-full rounded-lg  h-64" />
                                    <Image src={house2} alt="Lighthouse" className="w-full rounded-lg  h-64" />
                                </div>

                            </div>
                            <p className="text-gray-600 leading-relaxed text-xl text-right dark:text-[#D9D9E0]">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراح
                            </p>
                            {/* <p className="text-gray-600 leading-relaxed text-xl text-right dark:text-[#D9D9E0]">{data?.caption}</p> */}
                        </section>

                        <div className='w-full flex felx-row justify-center items-center '>
                            <FacilitiesRent
                                bathrooms={data?.bathrooms}
                                parking={data?.parking}
                                rooms={data?.rooms}
                                capacity={data?.capacity}
                            />
                        </div>

                        {/* comments */}
                        <ReserveComments id={id} />

                    </div>

                    {/* reserve form and houses item */}

                    <div className='w-[30%] flex flex-col justify-center gap-5 items-center'>
                        <RentForm id={id} price={data?.price} discount={data?.discounted_price} />

                        <Appointments id={id} />

                    </div>
                </div>

            </div>

            {/* house swiper */}

            <div className=' w-full flex flex-row overflow-x-auto' dir='ltr'>
                {slides.slice(0, 3).map((item, index) => (
                    <Card value={item} key={index} />
                ))}
            </div>
        </div>
    )
}

export default RentDetail