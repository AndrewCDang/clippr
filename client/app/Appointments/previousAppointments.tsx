import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { barberAppointmentTypes } from "../types/barberTypes"
import Link from "next/link"
import PagBtns from "./pagBtns"
import { Button } from "../(components)/button"
import { reviewStarsSVG } from "../(svg)/starsSVG"
import ReviewBtn from "../(components)/reviewBtn"


const getPastAppointments = async(userId:string,page:number):Promise<barberAppointmentTypes[]|undefined> => {
    const supabase = createRouteHandlerClient({cookies})
    try{
        const {data, error }= await supabase.from('AppointmentsTable')
            .select('*, BarberTable(*,UserTable(*),ReviewsTable(*)), UserTable(*,ReviewsTable(*))')
            .eq('user_id', userId)
            .eq('upcoming',false)
            .order('cut_date', {ascending:false})
            .order('cut_start_time', {ascending:true})
            .range(page*5,page*5+4)


        if(data){
            return data
        }

    }catch(error){
        console.log(error)
    }

}

const getCount = async(userId:string):Promise<any> => {
    const supabase = createRouteHandlerClient({cookies})
    try{
        const {data, error, count }= await supabase.from('AppointmentsTable')
            .select('*', { count: 'exact'})
            .eq('user_id', userId)
            .eq('upcoming',false)
            .order('cut_date', {ascending:false})

        if(count){
            return count
        }

    }catch(error){
        console.log(error)
    }

}

interface PreviousAppointmentsProps {
    userId: string;
    pagPage: number;
}


async function PreviousAppointments({ userId, pagPage }: PreviousAppointmentsProps) {

    const count = await getCount(userId)
    const numPages = Math.ceil((count/5))

    const prevAppointments = await getPastAppointments(userId,pagPage||0)

    return (
        <section className="flex flex-col items-center mb-8">
            {
                prevAppointments ?
                    prevAppointments.map(appointment=>{
                        return(
                            <section key={appointment.id} className='m-4 p-4 w-fit shadow-xl border-[0.5px] border-light rounded-lg mx-auto'>
                                <div className="flex gap-4 pb-1">
                                    <div className="flex-1">
                                        <h2 className="text-light font-light">Past Appointment</h2>
                                        {
                                            appointment.cut_time.length === 2 ?
                                            <h2 className={`text-secondary font-semibold ${appointment.cancelled ?'line-through decoration-[rgba(255,86,120,0.8)]' : null} `}>{appointment.cut_date.toString().split('-').reverse().join('/')}</h2>
                                            :
                                            <h2 className={`text-secondary font-semibold ${appointment.cancelled ?'line-through decoration-[rgba(255,86,120,0.8)]' : null} `}>{appointment.cut_date.toString().split('-').reverse().join('/')}</h2>
                                        }

                                    </div>
                                    <div>
                                        <h2 className="text-light font-light">Time</h2>
                                        {appointment.cut_time.length === 2 ?
                                            <h2 className={`text-secondary font-semibold ${appointment.cancelled ?'line-through decoration-[rgba(255,86,120,0.8)]' : null} `}>{`${appointment.cut_time[0].split('-')[0]}-${appointment.cut_time[1].split('-')[1]} `}</h2>
                                            :
                                            <h2 className={`text-secondary font-semibold ${appointment.cancelled ?'line-through decoration-[rgba(255,86,120,0.8)]' : null} `}>{appointment.cut_time[0]}</h2>
                                        }
                                    </div>
                                    <div>
                                        <h2 className="text-light font-light">Cut</h2>
                                        <h2 className={`text-secondary font-semibold ${appointment.cancelled ?'line-through decoration-[rgba(255,86,120,0.8)]' : null} `}>{appointment.cut_name}</h2>
                                    </div>
                                    <div>
                                        <h2 className="text-light font-light">Price</h2>
                                        <h2 className={`text-secondary font-semibold ${appointment.cancelled ?'line-through decoration-[rgba(255,86,120,0.8)]' : null} `}>£{appointment.cut_price}</h2>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between pb-2 mb-4 border-b-[0.5px] border-light items-center">
                                    <h3 className={`text-red font-bold ${appointment.cancelled? 'border-[0.5px] border-red p-2':null}`}>{appointment.cancelled ? 'CANCELLED' :null}</h3>
                                    <h5 className="ml-0 w-fit text-light">Ref: #{appointment.id.split('-')[0]}-{appointment.id.split('-')[1]}-{appointment.id.split('-')[2]}</h5>
                                </div >
                                <section className='flex gap-4 '>
                                    <div className="w-[200px]">
                                        <img className=' w-[200px] aspect-square object-cover rounded-lg' src={appointment.BarberTable?.UserTable?.profilePicture}></img>
                                    </div>
                                    <div className="flex justify-between w-fit gap-8">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col">
                                                <h1 className=''>{appointment.BarberTable?.UserTable?.first_name} {appointment.BarberTable?.UserTable?.last_name}</h1>
                                                <h2>{appointment.BarberTable?.barber_level.slice(0,1).toUpperCase()}{appointment.BarberTable?.barber_level.slice(1)}</h2>
                                                <div className='flex items-center'>
                                                    {reviewStarsSVG(appointment.BarberTable?.reviews_stars)}
                                                    <h3 className='ml-1  font-medium'>{appointment.BarberTable?.reviews_stars && appointment.BarberTable?.reviews_stars.toFixed(2)}<span className='text-xs text-light ml-1'>{`(${appointment.BarberTable && appointment?.BarberTable?.ReviewsTable?.length} reviews)`}</span></h3>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-between h-full">
                                                <div className='w-fit'>
                                                    <Link target="_blank" href={`https://www.google.com/maps/place/${appointment.BarberTable?.user_address.addressline1.replaceAll(' ','+')},+${appointment.BarberTable?.user_address.city.replaceAll(' ', '+')}+${appointment.BarberTable?.user_address.postcode.replaceAll(' ','+')}/`}>
                                                        <h3 className='text-light font-semibold '>{`${appointment.BarberTable?.user_address.studio}`}</h3>    
                                                        <h3 className='text-light underline'>{`${appointment.BarberTable?.user_address.addressline1}`}</h3>    
                                                        <h3 className='text-light underline'>{`${appointment.BarberTable?.user_address.city}`}</h3>    
                                                        <h3 className='text-light underline'>{`${appointment.BarberTable?.user_address.postcode.toUpperCase()}`}</h3>    
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 justify-end align-end'>
                                            <div className='whitespace-nowrap '>
                                                <Link href={`/barber/${appointment.BarberTable?.profile_url}`}>
                                                    <Button text='Barber Page' full={true}/>
                                                </Link>
                                            </div>
                                            {
                                                appointment.cancelled ? null :
                                                <div className='whitespace-nowrap '>
                                                    <ReviewBtn appointment={appointment}/>
                                                </div>
                                            }
                                            <div className='whitespace-nowrap '>
                                                <Button text={appointment.cancelled ? 'Refund Details':'Payment Details'} variant={2} full={true}/>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </section>
                        )
                    })
                :null
            }
            <PagBtns numPages={numPages} pagPage={pagPage}/>
        </section>
    )
}

export default PreviousAppointments