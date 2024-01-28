import React from 'react'
import { HomeUserTypes,barberAppointmentTypes, UserItem } from '../types/barberTypes'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { Button } from '../(components)/button'
import Countdown from './countdown'
import BarberInteractBtn from './barberInteractBtn'
import {checkBarbers} from '@/app/api/checkBarberAppointments/checkBarbers'
import EmptySeat from '../(svg)/emptySeat'
import './barberSeat.css'

async function getPastAppointments(userId: string): Promise<barberAppointmentTypes[] | null> {
    console.log(userId)

    const supabase = createRouteHandlerClient({cookies})

    const {data, error} = await supabase.from('AppointmentsTable')
    .select('*,UserTable(*),BarberTable(*,UserTable(*))')
    .eq('barber_id', userId)
    .filter('upcoming', 'eq', true)
    .order('cut_date', {ascending:true})
    .order('cut_start_time', {ascending:true})
    // .limit(3)

    if(data){
        console.log(data)
        return data
    } else{
        console.log(error)
        return null
    }
}

async function getBarberId(userId: string): Promise< any> {

    const supabase = createRouteHandlerClient({cookies})

    const {data, error} = await supabase.from('BarberTable')
    .select('id')
    .eq('user_id', userId)
    .single()
    // .limit(3)

    if(data){
        console.log(data)
        return data
    } else{
        console.log(error)
        return null
    }
}

type BarberSignTypes = {
    user: HomeUserTypes
}


async function BarberSignIn({user}:BarberSignTypes) {
    const checkApp = await checkBarbers(user.id)

    const barberId = await getBarberId(user.id)

    const appointments = await getPastAppointments(barberId.id)

    const nextAppointment = appointments?.[0]
    const nextCutTime = (nextAppointment?.cut_time)
    const nextCutDay = (nextAppointment?.cut_date)



    return (
    <section className='flex flex-col items-center'>
        { nextAppointment && <h1 className='text-center'>Your next appointment</h1> }
        <div className='mx-auto w-fit'>
            {nextAppointment&& <Countdown cutTime={nextCutTime} cutDate={nextCutDay}/>}
        </div>
        {
            nextAppointment &&
                <section key={nextAppointment.id} className='m-4 p-4 w-fit [box-shadow:0px_0px_16px_rgba(var(--main-col-primary),0.3)] border-[0.5px] border-light rounded-lg bg-white'>
                    <div className="flex flex-col mb-2 w-fit">
                        <h1 className='text-primary-f'>{(nextAppointment.UserTable as UserItem).first_name} {(nextAppointment.UserTable as UserItem).last_name}</h1>
                    </div>
                    <section className='flex gap-4 '>
                        <div className="flex justify-between w-fit gap-8">
                            <div className="flex  w-fit gap-4">
                                <div>
                                    <div className="w-fit">
                                        <img className=' [width:_clamp(96px,15vw+20px,120px)] aspect-square object-cover rounded-lg' src={(nextAppointment.UserTable as UserItem).profilePicture}></img>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 w-fit gap-4 pb-1 [font-size:0.8rem_!important] md:[font-size:1rem_!important]">
                                    <div className="flex-1">
                                        <h2 className="text-light-f font-light">Next Appointment</h2>
                                        {
                                            nextAppointment.cut_time.length === 2 ?
                                            <h2 className={`text-secondary-f font-semibold`}>{nextAppointment.cut_date.toString().split('-').reverse().join('/')}</h2>
                                            :
                                            <h2 className={`text-secondary-f font-semibold`}>{nextAppointment.cut_date.toString().split('-').reverse().join('/')}</h2>
                                        }
                                    </div>
                                    <div>
                                        <h2 className="text-light font-light">Time</h2>
                                        {nextAppointment.cut_time.length === 2 ?
                                            <h2 className={`text-secondary-f font-semibold`}>{`${nextAppointment.cut_time[0].split('-')[0]}-${nextAppointment.cut_time[1].split('-')[1]} `}</h2>
                                            :
                                            <h2 className={`text-secondary-f font-semibold`}>{nextAppointment.cut_time[0]}</h2>
                                        }
                                    </div>
                                    <div>
                                        <h2 className="text-light font-light">Cut</h2>
                                        <h2 className={`text-secondary-f font-semibold`}>{nextAppointment.cut_name}</h2>
                                    </div>
                                    <div>
                                        <h2 className="text-light font-light">Price</h2>
                                        <h2 className={`text-secondary-f font-semibold`}>£{nextAppointment.cut_price}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className='flex gap-2 justify-end align-end mt-4'>
                        <div className='w-fit'>
                            <BarberInteractBtn item={nextAppointment}/>
                        </div>
                    </div>
                </section>
        }
        {appointments && appointments.length ===0 ? 
        <div className='w-full my-8'>
            <div className='[width:_clamp(64px,_calc(50%_+_40px),_240px)] mx-auto relative '>
                <EmptySeat/>
                <div className='flex gap-2 absolute top-[5%] left-[5%]'>
                    {Array(3).fill(0).map((_,i)=>{
                        return(
                            <div key={i} style={{animationDelay:`${100*(i+1)}ms`}} className={`bg-light-2 w-4 aspect-square rounded-full barberSeat`}></div>
                        )
                    })}
                </div>

            </div>
            <h2 className='mb-4 text-center text-light text-md font-normal mt-4'>No upcoming appointments currently scheduled</h2>
        </div>
        : <h2 className='mt-8 mb-4 text-center'>All Upcoming appointments</h2>
        }

        <section className='rounded-lg overflow-x-scroll w-full shadow-md hScroll'>
            <section className='grid grid-cols-6 min-w-[600px] font-bold'>
                <h3 className='text-primary bg-light-2 p-2'>Customer</h3>
                <h3 className='text-primary bg-light-2 p-2'>Date</h3>
                <h3 className='text-primary bg-light-2 p-2'>Time</h3>
                <h3 className='text-primary bg-light-2 p-2'>Cut Name</h3>
                <h3 className='text-primary bg-light-2 p-2'>Price</h3>
                <h3 className='text-primary bg-light-2 p-2 '>Interact</h3>
            </section>
            {
                appointments && appointments.length>0 ? 
                appointments.map((item,i)=>{
                    const daysWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                    const appointmentDate = new Date(item.cut_date)
                    return(
                        <section key={i} className='grid grid-cols-6 min-w-[600px] py-2 bg-white/5'>
                            <h3 className='p-2'>{(item.UserTable as UserItem).first_name} {(item.UserTable as UserItem).last_name}</h3>
                            <h3 className='p-2'>{daysWeek[appointmentDate.getDay()]} - {appointmentDate.getDate()}/{appointmentDate.getMonth()+1}/{appointmentDate.getFullYear()}</h3>
                            {item.cut_time.length === 2 ?
                                <h3 className={`p-2`}>{`${item.cut_time[0].split('-')[0]}-${item.cut_time[1].split('-')[1]} `}</h3>
                                :
                                <h3 className={`p-2`}>{item.cut_time[0]}</h3>
                            }
                            <h3 className='p-2'>{item.cut_name}</h3>
                            <h3 className='p-2'>£{item.cut_price}</h3>
                            <div className='flex w-full pr-2 gap-2 flex-wrap h-fit self-center'>
                                <BarberInteractBtn item={item}/>
                            </div>
                        </section>
                    )
                })
                :
                <section className='grid grid-cols-6 min-w-[600px] '>
                    <h3 className=' p-2'>...</h3>
                    <h3 className=' p-2'>...</h3>
                    <h3 className=' p-2'>...</h3>
                    <h3 className=' p-2'>...</h3>
                    <h3 className=' p-2'>...</h3>
                </section>
            }
        </section>

        <div className='my-4'>
            <Link href={'/PastAppointments'}>
                <Button text='View Previous Appointments' variant={2}/>
            </Link>
        </div>
    </section>
    )
}

export default BarberSignIn