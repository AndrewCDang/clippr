"use client"
import { useEffect, useState } from 'react'
import DateRangePicker from './dateRangePicker'
import { useRouter } from 'next/navigation'


function DateRange() {
    const router = useRouter()

    // Min Month/Year States
    const [minMonthTog, setMinMonthTog] = useState<boolean>(false)
    const [selMinMonth, setSelMinMonth] = useState<string>('Jan')
    const [minYearTog, setMinYearTog] = useState<boolean>(false)
    const [selMinYear, setSelMinYear] = useState<number>(2024)

    // Max Month/Year States
    const [maxMonthTog, setMaxMonthTog] = useState<boolean>(false)
    const [selMaxMonth, setSelMaxMonth] = useState<string>('Jan')
    const [maxYearTog, setMaxYearTog] = useState<boolean>(false)
    const [selMaxYear, setSelMaxYear] = useState<number>(2024)

    // Update Link based on date picker
    useEffect(()=>{
        router.push(`/PastAppointments?minMonth=${selMinMonth}&minYear=${selMinYear}&maxMonth=${selMaxMonth}&maxYear=${selMaxYear}`)
    },[selMinMonth, selMinYear, selMaxMonth, selMaxYear])

    return (
    <section className='flex gap-8'>
        <div className='flex gap-1'>
            <DateRangePicker setMonthTog={setMinMonthTog} monthTog={minMonthTog} setSelMonth={setSelMinMonth} selMonth={selMinMonth} yearTog={minYearTog} setYearTog={setMinYearTog} setSelYear={setSelMinYear} selYear={selMinYear}/>
            <div>-</div>
            <DateRangePicker setMonthTog={setMaxMonthTog} monthTog={maxMonthTog} setSelMonth={setSelMaxMonth} selMonth={selMaxMonth} yearTog={maxYearTog} setYearTog={setMaxYearTog} setSelYear={setSelMaxYear} selYear={selMaxYear}/>
        </div>
    </section>
)
}

export default DateRange