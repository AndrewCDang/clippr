"use client"
import { useEffect, useState } from 'react'
import DateRangePicker from './dateRangePicker'
import { useRouter } from 'next/navigation'
import AppointmentsTable from './appointmentsTable'
import { barberAppointmentTypes } from '../types/barberTypes'

type PastAppointmentsTypes = {
    loading:boolean
    pagPage:number;
    prevAppointmentsArray: barberAppointmentTypes[] | null;
    oldestDate:string | null
}

function PastAppointments({pagPage, loading, prevAppointmentsArray, oldestDate}:PastAppointmentsTypes) {
    const router = useRouter()
    const months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec']

    const date = new Date()

    // Min Month/Year States
    const [minMonthTog, setMinMonthTog] = useState<boolean>(false)
    const [selMinMonth, setSelMinMonth] = useState<string>(months[date.getMonth()])
    const [minYearTog, setMinYearTog] = useState<boolean>(false)
    const [selMinYear, setSelMinYear] = useState<number>(date.getFullYear()-1)

    // Max Month/Year States
    const [maxMonthTog, setMaxMonthTog] = useState<boolean>(false)
    const [selMaxMonth, setSelMaxMonth] = useState<string>(months[date.getMonth()])
    const [maxYearTog, setMaxYearTog] = useState<boolean>(false)
    const [selMaxYear, setSelMaxYear] = useState<number>(date.getFullYear())

    // Update Link based on date picker
    useEffect(()=>{
        router.push(`/PastAppointments?minMonth=${selMinMonth}&minYear=${selMinYear}&maxMonth=${selMaxMonth}&maxYear=${selMaxYear}`)
    },[selMinMonth, selMinYear, selMaxMonth, selMaxYear])

    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(()=>{
        if(prevAppointmentsArray){
            setLoaded(false)
        }
    },[selMinMonth, selMaxMonth, selMinYear, selMaxYear])

    useEffect(()=>{
        setLoaded(true)
    },[prevAppointmentsArray])

    return (
    <>
    <section className='flex gap-8'>
        <div className='flex gap-1'>
            <DateRangePicker oldestDate={oldestDate} setMonthTog={setMinMonthTog} monthTog={minMonthTog} setSelMonth={setSelMinMonth} selMonth={selMinMonth} yearTog={minYearTog} setYearTog={setMinYearTog} setSelYear={setSelMinYear} selYear={selMinYear}/>
            <div>-</div>
            <DateRangePicker oldestDate={oldestDate} setMonthTog={setMaxMonthTog} monthTog={maxMonthTog} setSelMonth={setSelMaxMonth} selMonth={selMaxMonth} yearTog={maxYearTog} setYearTog={setMaxYearTog} setSelYear={setSelMaxYear} selYear={selMaxYear}/>
        </div>
    </section>
    <AppointmentsTable loaded={loaded} loading={loading} prevAppointmentsArray={prevAppointmentsArray} minMonth={selMinMonth} maxMonth={selMaxMonth} minYear={selMinYear} maxYear={selMaxYear}/>
    </>
)
}

export default PastAppointments