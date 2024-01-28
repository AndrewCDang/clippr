"use client"
import { useReviewModal } from "../(hooks)/useReviewModal"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { reviewStarsSVG } from "../(svg)/starsSVG"
import { Button } from "../(components)/button"
import XSvg from "../(svg)/XSvg"
import { starsEmptySVGLg, starsEmptySVG } from "../(svg)/starsSVG"
import { useRouter } from "next/navigation"
import { ReviewsTable, UserItem, ReviewObject, barberAppointmentTypes } from "../types/barberTypes"
import PreviousReview from "./previousReview"
import Modal from "../(modals)/modal"

const submitReview = async(customerId:string,barberId:string,review:string|undefined,stars:number) => {
    const supabase = createClientComponentClient()

    try{
        const {data, error} = await supabase.from('ReviewsTable')
        .insert({
            customer_id:customerId,
            barber_id:barberId,
            review:review,
            stars: stars,
        })
        .select('*')
        .single()

        if(data){
            console.log({message:'Successfuly Posted Review', data:data})
            return {success:200,data:data}
        }

    }catch(error){
        return {code:400,data:undefined, error:error}
    }


}

const updateReview = async(reviewId:string,review:string|undefined,stars:number) => {
    const supabase = createClientComponentClient();
    const dateToday = new Date()
    
    try {
        const { data, error } = await supabase.from('ReviewsTable')
            .update({
                review: review,
                stars: stars,
                created_at:`${dateToday.getFullYear()}=${dateToday.getMonth()+1}-${dateToday.getDate()}`,
            })
            .eq('id', reviewId)

    
        if (error) {
            console.error('Error updating review:', error);
            return { code: 400, error: error };
        } else {
            console.log({ message: 'Successfully Updated Review', data: data });
        }
    } catch (error) {
        console.error('Exception when updating review:', error);
        return { code: 400, error: error };
    }


}

const updateAppointmentDetails = async(appointmentId:string,reviewId:string) => {
    const supabase = createClientComponentClient()

    try{
        const {error} = await supabase.from('AppointmentsTable')
        .update({
            review_id:reviewId
        })
        .eq('id',appointmentId)

        if(!error){
            console.log('Data Updated')
        }

    }catch(error){
        console.log(error)

    }

}


function ReviewModal() {
    const router = useRouter()
    const {reviewIsOpen, reviewClose, appointment} = useReviewModal()
    const [selectedStar, setSelectedStar] = useState<number|null>(null)
    const [errorState, setErrorState]  = useState<boolean>()
    const textRef = useRef<HTMLTextAreaElement>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [btnText, setBtnText] = useState<string>('Submit')

    const [previousReview, setPreviousReview] = useState<ReviewsTable|null>(null)

    const submitHandler = async() => {
        if(selectedStar && appointment){
            setLoading(true)
            const textReview = (textRef.current?.value )

            if(previousReview){
                const updatedReview = await updateReview(previousReview.id,textReview,selectedStar)
                if(!updatedReview?.error){
                    setBtnText('Review Submitted')
                    setLoading(false)
                    setTimeout(()=>{
                        reviewClose()
                        resetReview()
                    },1000)
                    setTimeout(()=>{
                        router.refresh()
                    },1300)
                }
            }else{
                const reviewData = await submitReview(appointment.user_id,appointment.barber_id,textReview,selectedStar)
                if(reviewData?.data){
                    updateAppointmentDetails(appointment.id,reviewData.data.id)
    
                    setBtnText('Review Submitted')
                    setLoading(false)
                    setTimeout(()=>{
                        reviewClose()
                        resetReview()
                    },1000)
                    setTimeout(()=>{
                        router.refresh()
                    },1300)
                }            
            }

        }else{
            setErrorState(true)
        }
    }

    const resetReview = () => {
        setBtnText('Submit')
        setSelectedStar(null)
    }
    

    useEffect(()=>{
        if(appointment){
            setSelectedStar(null)
            const prevReview = (appointment.UserTable as ReviewObject)?.ReviewsTable.find(item => {
                    if(item.barber_id === appointment.BarberTable?.id){
                        return item
                    }
                }
            )
            if(prevReview){
                setPreviousReview(prevReview)
                setBtnText('Update Review')
            }else{
                setPreviousReview(null)
            }

        }
        

    },[appointment])

    const ReviewItem = () => {

            const setStars = (index:number) => {
                setTimeout(()=>{
                    setSelectedStar(state=>{return(index+1)})
                },0)
            }

            const SelectedStars = () => {
                    return(
                        [...Array(5)].map((_,index)=>{
                            return(
                                <div onClick={()=>setStars(index)} key={index} className={`star group-hover:fill-light cursor-pointer ${selectedStar === (index+1) ? 'selected' : ''}`}>
                                    {starsEmptySVGLg}
                                </div>
                            )
                        })
                    )
            }

            if(appointment)
            return(
                <div className={`bg-white inset-0 m-auto p-4 rounded-xl relative shadow-xl`}>
                    <div className="flex items-center gap-4 pb-2 mb-2 border-b-[0.5px] border-light-f">
                        <div className="w-32">
                            <img alt="" className=' w-full  aspect-square object-cover rounded-lg' src={appointment.BarberTable?.UserTable?.profilePicture}></img>
                        </div>
                        <div className="flex h-fit justify-between w-fit gap-8">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <h1 className='text-primary-f'>{appointment.BarberTable?.UserTable?.first_name} {appointment.BarberTable?.UserTable?.last_name}</h1>
                                    <h2 className="text-primary-f">{appointment.BarberTable?.barber_level.slice(0,1).toUpperCase()}{appointment.BarberTable?.barber_level.slice(1)}</h2>
                                    <div className='flex items-center'>
                                        {appointment.BarberTable?.reviews_stars ? reviewStarsSVG(appointment.BarberTable?.reviews_stars) : 
                                            Array(5).fill(0).map((_,i)=>{
                                            return(
                                                starsEmptySVG
                                            )})
                                        }
                                        <h3 className='ml-1  font-medium text-secondary-f'>{appointment.BarberTable?.reviews_stars && appointment.BarberTable?.reviews_stars.toFixed(2)}<span className='text-xs text-light-f-f ml-1'>{`(${appointment.BarberTable && appointment?.BarberTable?.ReviewsTable?.length} reviews)`}</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            {
                previousReview ? 
                <PreviousReview review={previousReview} pp={(appointment.UserTable as UserItem).profilePicture}/>
                :null
            }

                    <div>
                        <h3 className="text-light-f text-sm">Assign Rating*</h3>
                        <div className="flex">
                            <div className="flex w-fit group items-center
                                [&>.star:hover]:fill-yellow [&>.star:has(~.star:hover)]:fill-yellow
                                [&>.selected]:fill-yellow [&>div:has(~.selected)]:fill-yellow
                                fill-light">
                                    <SelectedStars />
                            </div>
                            <div>
                                {
                                    selectedStar && <h3 className="text-light-f text-xs ml-2 "><span className="text-lg font-semibold">{selectedStar}</span>/5</h3>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 mt-6 relative">
                        <textarea ref={textRef}  placeholder=" " className="peer w-full border-[1px] p-2 border-light-f rounded-md shadow-md text-secondary-f" rows={4} cols={50}></textarea>
                        <label className="peer-focus:top-0 peer-focus:left-0 peer-focus:translate-y-[-100%] peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:translate-y-[0%]  top-0 left-0 translate-y-[-100%] text-light-f text-sm absolute pointer-events-none transition-all duration-200 ease-in-out">Write about your experience here.</label>
                    </div>
                    <div className={`grid ${errorState ? '[grid-template-rows:1fr]' : '[grid-template-rows:0fr]' } overflow-hidden transition-all duration-200`}>
                        <h3 className="text-red text-sm text-center mb-2 overflow-hidden">Assign Rating before submitting</h3>
                    </div>
                    <Button loading={loading} clicked={submitHandler} text={btnText} textColor="text-white" bg="bg-primary-f"/>
                    <button onClick={reviewClose} className="w-8 h-8 absolute top-2 right-2">
                        <XSvg/>
                    </button>
                </div>
            )

        }



    
        return (
            <>
                {
                    appointment ?
                        <Modal child={<ReviewItem/>} isModalOpen={reviewIsOpen} modalClose={reviewClose}/>
                    :null
                }
            </>
        )

}


export default ReviewModal