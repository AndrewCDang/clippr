"use client"
import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import { barberAppointmentTypes, UserItem, ReviewObject } from "../types/barberTypes"
import { reviewStarsSVG } from "../(svg)/starsSVG"

type AppointmentsTableTypes = {
    loaded:boolean;
    loading:boolean;
    prevAppointmentsArray:barberAppointmentTypes[] | null;
    minMonth:string;
    maxMonth:string;
    minYear:number;
    maxYear:number
}

function AppointmentsTable({loaded, loading, prevAppointmentsArray,minMonth,maxMonth,minYear,maxYear}:AppointmentsTableTypes) {

    const [toggle,setToggle] = useState<boolean>(false)

    useEffect(()=>{
        setToggle(state=>{
            return !state
        })

    },[minMonth,maxMonth,minYear,maxYear])


    const SkeletonRow = ()=> {
        return(
            Array(20).fill(0).map((_,i)=>{
                return(
                    <section key={i} className='grid grid-cols-7 min-w-[600px] font-bold h-8'>
                        <Skeleton containerClassName='pr-[20%] pl-[4px]'/>
                        <Skeleton containerClassName='pr-[20%] pl-[4px]'/>
                        <Skeleton containerClassName='pr-[20%] pl-[4px]'/>
                        <Skeleton containerClassName='pr-[20%] pl-[4px]'/>
                        <Skeleton containerClassName='pr-[20%] pl-[4px]'/>
                        <Skeleton containerClassName='pr-[20%] pl-[4px]'/>
                        <Skeleton containerClassName='pr-[20%] pl-[4px]'/>
                    </section>

                )
            })
        )
    }

    return (
        <section id='previousAppointments' className='rounded-lg overflow-x-scroll w-full shadow-md hScroll mt-4'>
            <section className='grid grid-cols-7 min-w-[600px] font-bold'>
                <h3 className='bg-light-2 p-2'>Customer</h3>
                <h3 className='bg-light-2 p-2'>Date</h3>
                <h3 className='bg-light-2 p-2'>Time</h3>
                <h3 className='bg-light-2 p-2'>Cut Name</h3>
                <h3 className='bg-light-2 p-2'>Price</h3>
                <h3 className='bg-light-2 p-2 '>Ref</h3>
                <h3 className='bg-light-2 p-2 '>Latest Rating</h3>
            </section>
            {prevAppointmentsArray && minMonth && loaded && !loading ? prevAppointmentsArray.map(appointment=>{
                const appointmentDate = new Date(appointment.cut_date)
                const cutDate = appointmentDate.getDate()
                const cutMonth = appointmentDate.getMonth()+1
                const cutYear = appointmentDate.getFullYear()

                return(
                    <section key={appointment.id} className='grid grid-cols-7 min-w-[600px] auto-cols-max'>
                    <h3 className=' p-2'>{(appointment.UserTable as UserItem).first_name} {(appointment.UserTable as UserItem).last_name}</h3>
                    <h3 className=' p-2'>{cutDate}/{cutMonth}/{cutYear}</h3>
                    <div className=' p-2'>
                        {appointment.cut_time.length === 2 ?
                            <h3 className={''}>{`${appointment.cut_time[0].split('-')[0]}-${appointment.cut_time[1].split('-')[1]} `}</h3>
                            :
                            <h3 className={''}>{appointment.cut_time[0]}</h3>
                        }
                    </div>
                    <h3 className=' p-2 whitespace-nowrap overflow-x-scroll'>{appointment.cut_name}</h3>
                    <h3 className={` p-2 flex overflow-x-scroll`}>
                        <span className={`mr-2 ${appointment.cancelled ?'line-through decoration-[rgba(255,86,120,0.8)]' : null} `}>£{appointment.cut_price}</span>                    
                        {
                            appointment.cancelled &&
                            <span className='text-red'>Cancelled</span>
                        }
                    </h3>
                    <h3 className=' p-2 text-sm whitespace-nowrap overflow-x-scroll'>{appointment.id.split('-')[0]}-{appointment.id.split('-')[1]}-{appointment.id.split('-')[2]}</h3>
                    <div className=' p-2 flex flex-wrap overflow-x-scroll'>
                        <div className='flex'>
                            {
                                (appointment.UserTable as ReviewObject).ReviewsTable[0] ? 
                                <>
                                    {reviewStarsSVG((appointment.UserTable as ReviewObject).ReviewsTable[0].stars)}
                                    <h3 className='ml-1  font-medium'>{(appointment.UserTable as ReviewObject).ReviewsTable[0].stars}<span className='text-light text-xs'>/5</span></h3>
                                </>
                                :
                                <h3>NA</h3>
                            }
                        </div>
                    </div>
                </section>
                )
            }):
            <SkeletonRow/>
            }
        </section>
        

    )
}

export default AppointmentsTable