"use client"
import React from 'react'
import Breadcrumb from './Breadcrumb'
import Link from 'next/link'
import { slides } from '../Landing/suggestion/Suggestion'

import PayMentCard from '@/app/FastReserve/[id]/Payment/PayMentCard'
import PaymentWizard from '@/app/FastReserve/[id]/Payment/formwizard/PaymentWizard'
import { useHouseById } from '@/core/api/housesDetail/housesQuery/HousesQuery'

const PayMentsForm = ({ id }) => {

    const { data, isLoading, error } = useHouseById(id)

    return (
        <div className='w-full flex flex-col justify-center items-center ' dir='rtl'>

            <Breadcrumb />

            {/* middle holder div */}
            <div className='w-full flex flex-row max-sm:flex-col justify-center items-center gap-10 p-10 max-sm:p-5 '>

                {/* form wizard */}
                <form className='w-[70%] max-sm:w-full flex flex-col justify-center items-center gap-5 ' action="">
                    <PaymentWizard bookingData={data} />
                </form>

                {/* card */}
                <div className='w-[30%] max-sm:w-full p-10 max-sm:p-5'>
                    <PayMentCard value={data} />
                </div>

            </div>
        </div>
    )
}

export default PayMentsForm