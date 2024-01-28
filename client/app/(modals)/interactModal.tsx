"use client"
import { useInteractModal } from "../(hooks)/useInteractModal"
import { useEffect, useRef, useState } from "react"
import { Button } from "../(components)/button"
import XSvg from "../(svg)/XSvg"
import { useRouter } from "next/navigation"
import { ReviewsTable, UserItem } from "../types/barberTypes"
import ChatSVG from "../(svg)/chatSVG"
import CancelAppointment from "../Appointments/cancelAppointment"


function InteractModal() {
    const {interactIsOpen, interactClose, appointment} = useInteractModal()
    const interactRef = useRef<HTMLElement>(null)
    const cancelRef = useRef<HTMLDivElement>(null)


    const [displayNone, setDisplayNone] = useState<boolean>(true)
    const [opacityOn, setOpacityOn]= useState<boolean>(true)



    const transitionHandler = () => {
        if(!interactIsOpen){
            setTimeout(()=>{
                setDisplayNone(true)
            },100)
        }
    }
    
    useEffect(()=>{
        if(interactIsOpen){
            setDisplayNone((false))
            setTimeout(()=>{
                setOpacityOn(true)
            },100)
        }else{
            setOpacityOn(false)
        }
    },[interactIsOpen])

    const clickClose = (e:MouseEvent) => {
        if(interactRef.current && !interactRef.current.contains(e.target as HTMLElement) && (e.target as HTMLElement).innerText !== 'Cancel Appointment' && (e.target as HTMLElement).innerText !== 'No') {
            interactClose()
        }
        if(e.target && (e.target as HTMLElement).innerText ==='Yes'){
            interactClose()
        }
    }


    useEffect(()=>{
        if(interactRef.current){
            window.addEventListener('click', clickClose)

            return() => {
                window.removeEventListener('click', clickClose)
            }
        }

    },[interactRef.current])


    if(displayNone) return null



    if(appointment){
        const daysWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        const appointmentDate = new Date(appointment.cut_date)

        return (
            <aside onTransitionEnd={transitionHandler} className={`${opacityOn ? 'opacity-1 ':'opacity-0'} transition-opacity duration-300 fixed bg-opacity-50 top-0 left-0 z-50 w-full bg-secondary-f h-full justify-center`}>
                <section ref={interactRef} className={`absolute top-[50%] left-[50%] translate-x-[-50%] ${opacityOn ? 'translate-y-[-50%] ':'translate-y-[0%]'} transition-transform duration-300 ease-in-out`}>
                    <div className={`bg-white inset-0 m-auto p-4 rounded-xl relative shadow-xl`}>
                        <div className="flex items-center gap-4 pb-2 mb-2 border-b-[0.5px] border-light">
                            <div className="w-32">
                                <img alt="" className=' w-full  aspect-square object-cover rounded-lg' src={(appointment.UserTable as UserItem).profilePicture}></img>
                            </div>
                            <div className="flex h-fit justify-between w-fit gap-8">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <h1 className='text-primary-f'>{(appointment.UserTable as UserItem).first_name} {(appointment.UserTable as UserItem).last_name}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className='flex flex-col my-2'>
                            <h5 className="ml-0 w-fit text-light-f">Ref: #{appointment.id.split('-')[0]}-{appointment.id.split('-')[1]}-{appointment.id.split('-')[2]}</h5>
                            <div className="grid grid-cols-3">
                                <h3 className="p-2 text-secondary-f">date</h3>
                                <h3 className='p-2 font-semibold col-span-2 text-secondary-f'>{daysWeek[appointmentDate.getDay()]} - {appointmentDate.getDate()}/{appointmentDate.getMonth()+1}/{appointmentDate.getFullYear()}</h3>
                            </div>
                            <div className="grid grid-cols-3">
                                <h3 className="p-2 text-secondary-f">time</h3>
                            {appointment.cut_time.length === 2 ?
                                <h3 className={`p-2 font-semibold col-span-2 text-secondary-f`}>{`${appointment.cut_time[0].split('-')[0]}-${appointment.cut_time[1].split('-')[1]} `}</h3>
                                :
                                <h3 className={`p-2 font-semibold col-span-2 text-secondary-f`}>{appointment.cut_time[0]}</h3>
                            }
                            </div>
                            <div className="grid grid-cols-3">
                                <h3 className="p-2 text-secondary-f">cut</h3>
                                <h3 className='p-2 font-semibold col-span-2 text-secondary-f'>{appointment.cut_name}</h3>
                            </div>
                            <div className="grid grid-cols-3">
                                <h3 className="p-2 text-secondary-f">price</h3>
                                <h3 className='p-2 font-semibold grid-cols-3 text-secondary-f'>£{appointment.cut_price}</h3>
                            </div>
                        </section>
                        <div className="flex gap-2">
                            <Button  svg={<div className="scale-x-[-1] stroke-white fill-white"><ChatSVG/></div>} variant={1} text={'Message'} bg="bg-primary-f" textColor="text-white"/>
                            <div ref={cancelRef}>
                                <CancelAppointment id={appointment.id}/>
                            </div>
                        </div>
                        <button onClick={interactClose} className="w-8 h-8 absolute top-2 right-2">
                            <XSvg/>
                        </button>
                    </div>
                </section>


            </aside>
        )
    }else{
        return null
    }
}


export default InteractModal