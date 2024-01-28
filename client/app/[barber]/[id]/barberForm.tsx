"use client"

import { useEffect, useState } from "react"
import BarberBooking from "./barberBooking"
import { Button } from "@/app/(components)/button"
import { barberFormTypes, BarberItem } from "@/app/types/barberTypes"
import { usePathname } from "next/navigation"
import { useRouter } from 'next/navigation'
import { useBookingDetails } from '@/app/(hooks)/useBookingDetails'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLogInModal } from "@/app/(hooks)/useLogInModal"


function BarberForm({barber}:{barber:BarberItem}) {
    const supabase = createClientComponentClient()
    const {logInOpen} = useLogInModal()
    const router = useRouter()
    const {setBookingPageDetails } = useBookingDetails()


    const [bookingDetails, setBookingDetails] = useState<barberFormTypes>({cutDetails:{cutName:null,cutPrice:null,cutDuration:0}, selectedDate:null, selectedTime:null })
    const [disabled, setDisabled] = useState<boolean>(false)
    const [ownPage, setOwnPage] = useState<boolean>(false)

    const clickHandler = async() => {
        const bookingPage = {barberDetails:barber, bookingDetails:bookingDetails}

        const isAuthenticated = await getSession()
        if(isAuthenticated){
            setBookingPageDetails(bookingPage)
            router.push(`/barber/${barber?.profile_url}/book`)
        }else{
            logInOpen()
        }
    }

    const getSession = async() => {
        const {data, error} = await supabase.auth.getSession()
        if(data.session){
            return(true)
        }else{
            return(false)
        }
    }

    useEffect(()=>{
        const cutCheck = bookingDetails.cutDetails.cutDuration !== null && bookingDetails.cutDetails.cutName !== null && bookingDetails.cutDetails.cutPrice !==0
        const dateCheck = bookingDetails.selectedDate !== null
        const timeCheck = bookingDetails.selectedTime !== null

        cutCheck && dateCheck && timeCheck ? setDisabled(true) : setDisabled(false)

    },[bookingDetails])

    const checkAccount = async() => {
        const supabase = createClientComponentClient()
        const userId =  (await supabase.auth.getUser()).data.user?.id

        if(!userId){
            return
        }
        if(userId === barber.user_id){
            setOwnPage(true)
        }
    }

    useEffect(()=>{
        checkAccount()
    },[])

    return (
        <section className=''>
            <BarberBooking barber={barber} setBookingDetails={setBookingDetails}/>
            {!ownPage && <Button disabled={disabled ? false : true} clicked={()=>clickHandler()} text='Proceed'/>}
        </section>      
    )
}

export default BarberForm