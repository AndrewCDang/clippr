import React from 'react'
import { BarberItem, HomeUserTypes,barberAppointmentTypes, UserItem } from '../types/barberTypes'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { Button } from '../(components)/button'
import Countdown from './countdown'
import CancelAppointment from '../Appointments/cancelAppointment'
import BarberInteractBtn from './barberInteractBtn'

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
    const test = user

    const barberId = await getBarberId(user.id)

    const appointments = await getPastAppointments(barberId.id)

    const nextAppointment = appointments?.[0]
    const nextCutTime = (nextAppointment?.cut_time)
    const nextCutDay = (nextAppointment?.cut_date)

    let furtherAppointments;
    if(appointments && appointments?.length>1){
        furtherAppointments = appointments
    }



    return (
    <section>
        { nextAppointment && <h1 className='text-center'>Your next appointment</h1> }
        <div className='mx-auto w-fit'>
            {nextAppointment&& <Countdown cutTime={nextCutTime} cutDate={nextCutDay}/>}
        </div>
        {
            nextAppointment &&
                    <section key={nextAppointment.id} className='m-4 p-4 w-fit shadow-xl border-[0.5px] border-light rounded-lg mx-auto'>
                    <div className="flex flex-col mb-2 w-fit">
                        <h1 className=''>{(nextAppointment.UserTable as UserItem).first_name} {(nextAppointment.UserTable as UserItem).last_name}</h1>
                    </div>
                    <section className='flex gap-4 '>
                        <div className="flex justify-between w-fit gap-8">
                            <div className="flex  w-fit gap-4">
                                <div>
                                    <div className="w-fit">
                                        <img className=' [width:_clamp(96px,15vw+20px,120px)] aspect-square object-cover rounded-lg' src={(nextAppointment.UserTable as UserItem).profilePicture}></img>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 w-fit gap-4 pb-1">
                                    <div className="flex-1">
                                        <h2 className="text-light font-light">Next Appointment</h2>
                                        {
                                            nextAppointment.cut_time.length === 2 ?
                                            <h2 className={`text-secondary font-semibold`}>{nextAppointment.cut_date.toString().split('-').reverse().join('/')}</h2>
                                            :
                                            <h2 className={`text-secondary font-semibold`}>{nextAppointment.cut_date.toString().split('-').reverse().join('/')}</h2>
                                        }
                                    </div>
                                    <div>
                                        <h2 className="text-light font-light">Time</h2>
                                        {nextAppointment.cut_time.length === 2 ?
                                            <h2 className={`text-secondary font-semibold`}>{`${nextAppointment.cut_time[0].split('-')[0]}-${nextAppointment.cut_time[1].split('-')[1]} `}</h2>
                                            :
                                            <h2 className={`text-secondary font-semibold`}>{nextAppointment.cut_time[0]}</h2>
                                        }
                                    </div>
                                    <div>
                                        <h2 className="text-light font-light">Cut</h2>
                                        <h2 className={`text-secondary font-semibold`}>{nextAppointment.cut_name}</h2>
                                    </div>
                                    <div>
                                        <h2 className="text-light font-light">Price</h2>
                                        <h2 className={`text-secondary font-semibold`}>£{nextAppointment.cut_price}</h2>
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
        <h2 className='mt-8 mb-4 text-center'>Further Upcoming appointments</h2>
        {furtherAppointments && furtherAppointments.length ===0 && <h2 className='mb-4 text-center text-light text-md font-normal'>(No further upcoming appointments scheduled)</h2>}
        <section className='rounded-lg overflow-x-scroll w-full shadow-md hScroll'>
            <section className='grid grid-cols-6 min-w-[600px] font-bold'>
                <h3 className='bg-light-2 p-2'>Customer</h3>
                <h3 className='bg-light-2 p-2'>Date</h3>
                <h3 className='bg-light-2 p-2'>Time</h3>
                <h3 className='bg-light-2 p-2'>Cut Name</h3>
                <h3 className='bg-light-2 p-2'>Price</h3>
                <h3 className='bg-light-2 p-2 '>Interact</h3>

            </section>
            {
                furtherAppointments && furtherAppointments.length>0 ? 
                furtherAppointments.map(item=>{
                    const daysWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                    const appointmentDate = new Date(item.cut_date)
                    return(
                        <section className='grid grid-cols-6 min-w-[600px] my-2'>
                            <h3 className='p-2'>{(item.UserTable as UserItem).first_name} {(item.UserTable as UserItem).last_name}</h3>
                            <h3 className='p-2'>{daysWeek[appointmentDate.getDay()]} - {appointmentDate.getDate()}/{appointmentDate.getMonth()+1}/{appointmentDate.getFullYear()}</h3>
                            {item.cut_time.length === 2 ?
                                <h3 className={`p-2`}>{`${item.cut_time[0].split('-')[0]}-${item.cut_time[1].split('-')[1]} `}</h3>
                                :
                                <h3 className={`p-2`}>{item.cut_time[0]}</h3>
                            }
                            <h3 className='p-2'>{item.cut_name}</h3>
                            <h3 className='p-2'>£{item.cut_price}</h3>
                            <div className='flex w-full pr-2 gap-2 flex-wrap'>
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