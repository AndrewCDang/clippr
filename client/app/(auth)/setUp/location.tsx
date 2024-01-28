"use client"
import { useState, Dispatch, SetStateAction } from "react"
import BtnSelection from "@/app/(components)/btnSelection"

type LocationProps={
    page:number;
    updateValidBarberPages:Function;
    setAppointmentLocation:Dispatch<SetStateAction<string>>;
    updateAccountDetails:Function;
}

export default function Location({page,updateValidBarberPages,setAppointmentLocation, updateAccountDetails}:LocationProps){
    
    const btnClick = (tag:string) => {
        updateValidBarberPages(page,true)
        setAppointmentLocation(tag)
        updateAccountDetails('appointmentLocation',tag)
    }
    

    return(
    <section className="grid auto-cols-auto gap-8 justify-center mx-auto my-auto">
        <BtnSelection type={'radio'} name={'radioLocation'} id={'radio_shop'}  tag={'Barber Shop'} notes={['Appointment at Barber Shop']}  click={btnClick}/>
        <BtnSelection type={'radio'} name={'radioLocation'} id={'radio_home'} tag={'Barber Home'} notes={['Appointment at barber house']} click={btnClick}/>
        <BtnSelection type={'radio'} name={'radioLocation'} id={'radio_mobile'} tag={'Customer Home'} notes={['Appointment at customer house']} click={btnClick}/>
    </section>
    )
}

