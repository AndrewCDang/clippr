import React from 'react'
import PastAppointments from './dateRange'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { barberAppointmentTypes} from '../types/barberTypes'
import PagBtns from './pagBtns'
import { checkBarbers } from '../api/checkBarberAppointments/checkBarbers'
import Skeleton from 'react-loading-skeleton'
import AppointmentsContainer from './appointmentsContainer'

export const revalidate  = 60;

type BarberWithAppointments = {
    AppointmentsTable:barberAppointmentTypes[]
}

type searchTypes = {
    minMonth:string;
    maxMonth:string;
    minYear:number;
    maxYear:number;
    page:number;
}

type PreviousAppointmentTypes = {
    searchParams:searchTypes
}

const getAppointments = async(userId:string,pagPage:number,lowDate:string,maxDate:string): Promise<BarberWithAppointments | { error: number; message: string }> => {
    const supabase = createRouteHandlerClient({cookies})

    const {data:barberId, error:barberError} = await supabase.from('BarberTable')
        .select('AppointmentsTable(*,UserTable(*,ReviewsTable(*)))')
        .eq('user_id',userId)
        .filter('AppointmentsTable.upcoming','eq',false)
        .filter('AppointmentsTable.cut_date', 'gte', lowDate)
        .filter('AppointmentsTable.cut_date', 'lte', maxDate)
        .order('cut_date', { foreignTable: 'AppointmentsTable', ascending:false})
        .range(pagPage*19, (pagPage*19)+19, { foreignTable: 'AppointmentsTable' })
        .single()
    
    if(!barberId){
        return {error:500,message:`${barberError}`}
    }
    return barberId
}

const getOldestAppointment = async(userId:string):Promise<{AppointmentsTable:{cut_date:string}[]}|{error:number, message:string}> => {
    const supabase = createRouteHandlerClient({cookies})

    const {data, error} = await supabase.from('BarberTable')
    .select('AppointmentsTable("cut_date")')
    .eq('user_id',userId)
    .order('cut_date', {foreignTable: 'AppointmentsTable', ascending:true})
    .range(0,0,{foreignTable:'AppointmentsTable'})
    .single()

    if(!data || error){
        return({error:500, message:'Could not fetch Data'})
    }
    return data
}

const earningsCurrentMonth = async(userId:string):Promise<{sum:number,count:number|null}|undefined>=>{
    const supabase = createRouteHandlerClient({cookies})
    const date = new Date()
    date.setDate(1)
    const startDate = date.toISOString()


    const {data, error} = await supabase.from('BarberTable')
        .select('AppointmentsTable(cut_price)')
        .eq('user_id',userId)
        .filter('AppointmentsTable.upcoming','eq',false)
        .filter('AppointmentsTable.cut_date','gte',startDate)
        .single()

    if(!data || error){
        return {sum:0,count:null}
    }

    if(data){
        const priceMap  = data.AppointmentsTable.map((item)=>{
            return item.cut_price
        })

        const sumThisMonth = priceMap.reduce((accum,curr)=>accum+curr,0)
        return {sum:sumThisMonth,count:priceMap.length}
    }

}

const getBarberId = async(userId:string)=>{
    const supabase = createRouteHandlerClient({cookies})

    const {data,error} = await supabase.from('BarberTable')
    .select('id')
    .eq('user_id',userId)

    if(data){
        return data
    }
}

const paginationCount = async(id:string,lowDate:string,maxDate:string):Promise<number> => {
    const supabase = createRouteHandlerClient({cookies})

    const {data:barberId, error:barberError, count} = await supabase.from('AppointmentsTable')
        .select('*', { count: 'exact' })
        .eq('barber_id',id)
        .eq('upcoming',false)
        .gte('cut_date', lowDate)
        .lte('cut_date', maxDate)
    
    if(count){
        return count
    }else{
        return 0
    }
}

async function PreviousAppointment({searchParams}:PreviousAppointmentTypes) {



    const months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec']

    // searchParams
    const currentDate = new Date()
    const minMonth = searchParams.minMonth 
    const maxMonth = searchParams.maxMonth
    const minYear = +searchParams.minYear 
    const maxYear = +searchParams.maxYear 
    const pagPage = searchParams.page || 0

    const minMonthIndex = months.indexOf(minMonth)
    const maxMonthIndex = months.indexOf(maxMonth)    

    const userId = (await createRouteHandlerClient({cookies}).auth.getSession()).data.session?.user.id as string

    const checkApp = await checkBarbers(userId)
    
    const currentMonthEarnings = await earningsCurrentMonth(userId)

    const lowerDate = new Date()
    if(minMonth && minYear){
        lowerDate.setFullYear(minYear)
        lowerDate.setMonth(minMonthIndex)
        lowerDate.setDate(1)
    }

    const upperDate = new Date()
    if(maxMonth && maxYear){
        upperDate.setFullYear(maxYear)
        upperDate.setMonth(maxMonthIndex+1)
        upperDate.setDate(0)
    }    

    const lowDateIso = lowerDate.toISOString()
    const maxDateIso = upperDate.toISOString()
    

    let previousAppointments = null
    if(minMonth && maxMonth && minYear && maxYear){
        previousAppointments = await getAppointments(userId,pagPage,lowDateIso,maxDateIso)
    }

    let prevAppointmentsArray = (previousAppointments as BarberWithAppointments)?.AppointmentsTable ?? null;


    const oldestAppointment = await getOldestAppointment(userId)

    let oldestDate = '2023'
    if((oldestAppointment as {AppointmentsTable:{cut_date:string}[]}).AppointmentsTable[0]){
        oldestDate = (oldestAppointment as {AppointmentsTable:{cut_date:string}[]}).AppointmentsTable[0].cut_date.split('-')[0]
    }

    const barberId = await getBarberId(userId) as {id:string}[] | undefined
    let pagCount = 0
    
    if(barberId){
        pagCount = await paginationCount(barberId[0].id,lowDateIso,maxDateIso)
    }

    const numPages = Math.ceil(pagCount/20)


    return (
    <section>
        <div className='mb-4'>
            <h2 className='text-light'>Earnings this current month.</h2>
            <div className='relative'>
                {
                    currentMonthEarnings ?
                    <>
                        <h1 className='text-green'>{months[currentDate.getMonth()]} {currentDate.getFullYear()} - £{currentMonthEarnings.sum}</h1>
                        <h4 className='text-light'>{currentMonthEarnings.count} Appointments</h4>
                    </>
                    :
                    <>
                    <Skeleton height={'2rem'} width={'16rem'}/>
                    <Skeleton height={'1rem'} width={'8rem'}/>
                    </>
                }
            </div>
        </div>
        <section className='flex gap-8'>
            <h2>Previous Appointments</h2>
        </section>
        <AppointmentsContainer pagPage={pagPage} oldestDate={oldestDate} prevAppointmentsArray={prevAppointmentsArray} minMonth={minMonth} maxMonth={maxMonth} minYear={minYear} maxYear={maxYear} numPages={numPages} />
    </section>
)
}

export default PreviousAppointment