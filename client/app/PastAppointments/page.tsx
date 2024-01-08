import React from 'react'
import DateRange from './dateRange'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { barberAppointmentTypes, UserItem } from '../types/barberTypes'


type BarberWithAppointments = {
    AppointmentsTable:barberAppointmentTypes[]
}
const getAppointments = async(userId:string): Promise<BarberWithAppointments | { error: number; message: string }> => {
    const supabase = createRouteHandlerClient({cookies})

    const date = new Date(2024, 0, 5).toISOString()

    const {data:barberId, error:barberError} = await supabase.from('BarberTable')
        .select('AppointmentsTable(*,UserTable(*))')
        .eq('user_id',userId)
        .filter('AppointmentsTable.upcoming','eq',false)
        .filter('AppointmentsTable.cut_date', 'gt', date)
        .single()
        
    
    if(!barberId){
        return {error:500,message:'No id found'}
    }
    return barberId
}

type searchTypes = {
    minMonth:string;
    maxMonth:string;
    minYear:number;
    maxYear:number
}

type PreviousAppointmentTypes = {
    searchParams:searchTypes
}

async function PreviousAppointment({searchParams}:PreviousAppointmentTypes) {
    const userId = (await createRouteHandlerClient({cookies}).auth.getSession()).data.session?.user.id as string

    const previousAppointments = await getAppointments(userId)
    const prevAppointmentsArray = (previousAppointments as BarberWithAppointments).AppointmentsTable

    const minMonth = searchParams.minMonth
    console.log(minMonth)

    return (
    <section>
        <div className='mb-4'>
            <h2 className='text-light'>Earnings this current month.</h2>
            <div className='relative'>
                <h1 className='text-green'>Jan 2024 - $610</h1>
                <h4 className='text-light'>29 Appointments</h4>
            </div>
        </div>
        <div className='mb-8'>
            <h2 className='text-light'>Earnings past 30 days.</h2>
            <div>
                <h1 className='text-green'>$3210</h1>
                <h4 className='text-light'>230 Appointments</h4>
            </div>
        </div>
        <section className='flex gap-8'>
            <h2>Previous Appointments</h2>
        </section>
        <DateRange/>
        <section className='rounded-lg overflow-x-scroll w-full shadow-md hScroll mt-4'>
            <section className='grid grid-cols-7 min-w-[600px] font-bold'>
                <h3 className='bg-light-2 p-2'>Customer</h3>
                <h3 className='bg-light-2 p-2'>Date</h3>
                <h3 className='bg-light-2 p-2'>Time</h3>
                <h3 className='bg-light-2 p-2'>Cut Name</h3>
                <h3 className='bg-light-2 p-2'>Price</h3>
                <h3 className='bg-light-2 p-2 '>Ref</h3>
                <h3 className='bg-light-2 p-2 '>Review</h3>
            </section>
            {prevAppointmentsArray && prevAppointmentsArray.map(appointment=>{
                const appointmentDate = new Date(appointment.cut_date)
                const cutDate = appointmentDate.getDate()
                const cutMonth = appointmentDate.getMonth()+1
                const cutYear = appointmentDate.getFullYear()

                return(
                    <section className='grid grid-cols-7 min-w-[600px]'>
                    <h3 className=' p-2'>{(appointment.UserTable as UserItem).first_name} {(appointment.UserTable as UserItem).last_name}</h3>
                    <h3 className=' p-2'>{cutDate}/{cutMonth}/{cutYear}</h3>
                    <h3 className=' p-2'>{appointment.cut_time}</h3>
                    <h3 className=' p-2'>{appointment.cut_name}</h3>
                    <h3 className=' p-2'>£{appointment.cut_price}</h3>
                    <h3 className=' p-2 '></h3>
                    <h3 className=' p-2 '>Review</h3>
                </section>
                )
            })}
        </section>
    </section>
  )
}

export default PreviousAppointment