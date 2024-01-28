"use client"
import PastAppointments from "./dateRange"
import PagBtns from "./pagBtns"
import { barberAppointmentTypes } from "../types/barberTypes"
import { useEffect, useState } from "react"

type AppointmentContainerTypes = {
    prevAppointmentsArray: barberAppointmentTypes[] | null;
    oldestDate:string | null
    numPages:number;
    pagPage:number;
    minMonth:string;
    maxMonth:string;
    minYear:number;
    maxYear:number;
}

function AppointmentsContainer({pagPage, oldestDate, prevAppointmentsArray, minMonth,maxMonth,minYear,maxYear,numPages}:AppointmentContainerTypes) {

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(loading){
            setLoading(false)
        }
    },[prevAppointmentsArray])

    return (
    <>
        <PastAppointments loading={loading} pagPage={pagPage} oldestDate={oldestDate} prevAppointmentsArray={prevAppointmentsArray}/>
        <div className='mt-4  mb-8 mx-auto w-fit max-w-[200px] overflow-x-auto'>
            <PagBtns setLoading={setLoading} minMonth={minMonth} maxMonth={maxMonth} minYear={minYear} maxYear={maxYear} numPages={numPages} pagPage={pagPage}/>
        </div>
    </>
)
}

export default AppointmentsContainer