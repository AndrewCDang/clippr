"use client"

import { Button } from "../(components)/button"
import { barberAppointmentTypes } from "../types/barberTypes"
import { useInteractModal } from "../(hooks)/useInteractModal"

type BarberInteractTypes = {
    item:barberAppointmentTypes
}

function BarberInteractBtn({item}:BarberInteractTypes) {
    const {interactOpen, setAppointment} = useInteractModal()

    const interactHandler = (item:barberAppointmentTypes) => {
        console.log(item.id)
        setAppointment(item)
        setTimeout(()=>{
            interactOpen()
        },0)
    }

    return (
        <Button clicked={()=>interactHandler(item)} text='Contact' variant={1} full={true} bg="bg-primary-f" textColor="text-white"/>
    )
}

export default BarberInteractBtn