import React from 'react'
import { cookies, headers } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { barberAppointmentTypes } from '../types/barberTypes'
import { notFound } from 'next/navigation'
import AppointmentCarousel from './appointmentCarousel'
import PreviousAppointments from './previousAppointments'
import RefreshPage from './refreshPage'

export const dynamic = 'force-dynamic'

const checkAppointments = async() => {

    const supabase = createRouteHandlerClient({cookies})
    const session = await supabase.auth.getSession()
    
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkAppointments`,{
            method:'PATCH',
            headers: headers()
        }

        )
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await res.json()
        if(!json.error){
            return json
        }else{
            console.log(json.error)
        }

    }catch(error){
        console.log(error)
    }
}

const getNextAppointment = async(id:string): Promise<barberAppointmentTypes[] | undefined> => {
    const supabase = createRouteHandlerClient({cookies})

    try{
        const {data, error }= await supabase.from('AppointmentsTable')
            .select('*, BarberTable(*,UserTable(*),ReviewsTable(*))')
            .eq('user_id', id)
            .eq('upcoming',true)
            .order('cut_date', {ascending:false})
            .order('cut_start_time', {ascending:true})
            .limit(1)

        if(data){
            return data
        }

    }catch(error){
        console.log(error)
    }
}

const getUpcomingAppointments = async(id:string): Promise<barberAppointmentTypes[] | undefined> => {
    const supabase = createRouteHandlerClient({cookies})

    try{
        const {data, error }= await supabase.from('AppointmentsTable')
            .select('*, BarberTable(*,UserTable(*),ReviewsTable(*))')
            .eq('user_id', id)
            .eq('upcoming',true)
            .order('cut_date', {ascending:true})
            .order('cut_start_time', {ascending:true})

        if(data){
            return data
        }

    }catch(error){
        console.log(error)
    }
}

const getUserId = async() => {
    const supabase = createRouteHandlerClient({cookies})
    const userId = (await supabase.auth.getSession()).data.session?.user.id
    if(userId){
        return userId
    }
}

async function Appointments({searchParams}:{searchParams:{page:number}}) {
    const pagPage = searchParams.page

    const userId = await getUserId()
    if(!userId){
        notFound()
    }

    // Checks and updates if appointment has passed
    const check = await checkAppointments() as any
    const appointmentPassed = check.pastAppointments>0 as boolean
    
    // Next Appointment
    const appointments = await getNextAppointment(userId)
    const firstAppointment = appointments?.[0]
    const firstDate = firstAppointment?.cut_date.toString().split('-').reverse().join('/')

    // Upcoming Appointments
    const upcomingAppointments = await getUpcomingAppointments(userId)
    

return (
    <main className='w-full'>
        <h1 className='mx-auto w-fit'>Upcoming Appointments</h1>
        <AppointmentCarousel appointments={upcomingAppointments}/>
        <h1 id='previousAppointments-title' className='mx-auto w-fit mt-16'>Previous Appointments</h1>
        <PreviousAppointments userId={userId} pagPage={pagPage}/>
        <RefreshPage condition={appointmentPassed}/>
    </main>

    )
}

export default Appointments