"use client"

import { Button } from "../(components)/button"
import { useReviewModal } from "../(hooks)/useReviewModal"
import { barberAppointmentTypes, ReviewObject} from "../types/barberTypes"

type ReviewBtnTypes = {
    appointment:barberAppointmentTypes
}

function ReviewBtn({appointment}:ReviewBtnTypes) {
    const {reviewOpen, setAppointment} = useReviewModal()

    const reviewHandler = (appointment:barberAppointmentTypes) => {
        setAppointment(appointment)
        setTimeout(()=>{
            reviewOpen()
        },0)

    }



    return (
        <Button clicked={()=>reviewHandler(appointment)} text={(appointment.UserTable as ReviewObject)?.ReviewsTable.some(item => {return item.barber_id === appointment.BarberTable?.id}) ? 'View/Edit Review' : 'Review'} variant={2} full={true}/>
    )
}

export default ReviewBtn