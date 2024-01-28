import Countdown from "./countdown"
import FrontArrowSVG from "../(svg)/frontArrowSVG"
import ScissorsLottie from "../(svg)/(lotties)/scissorsLottie"
import HomeDefault from "./homeDefault"
import { barberAppointmentTypes, HomeUserTypes } from "../types/barberTypes"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import EmptyCalender from "../(svg)/emptyCalender"

export const dynamic = "force-dynamic"

async function getPastAppointments(userId: string): Promise<barberAppointmentTypes[] | null> {


    const supabase = createRouteHandlerClient({cookies})

    const {data, error} = await supabase.from('AppointmentsTable')
    .select('*,UserTable(*),BarberTable(*,UserTable(*))')
    .eq('user_id', userId)
    .filter('upcoming', 'eq', false)
    .order('cut_date', {ascending:false})
    .order('cut_start_time', {ascending:false})
    .limit(3)

    if(data){
        console.log(data)
        return data
    } else{
        console.log(error)
        return null
    }
}

const BarberBanner = ({cutTime,cutDate,appointment,appointmentUpcoming}:{cutTime?:string[],cutDate?:string,appointment:barberAppointmentTypes,appointmentUpcoming:boolean}) => {
    return(
        <main className="flex flex-col justify-center items-center  mb-16 relative w-full">
                {
                    appointmentUpcoming ? 
                    <>
                        <h1 className="[font-size:_clamp(2em,2vw+0.5em,150px)] [line-height:1em] text-center">Your next <br/> appointment is in...</h1>
                        <Countdown cutTime={cutTime} cutDate={cutDate}/>
                        {
                            cutDate && cutTime && <h3 className="[font-size:_clamp(1em,1vw+0.5em,100px)] mx-auto border-[1px] border-light rounded-xl px-4 py-2">{cutDate.split('-').reverse().join('/')} - {cutTime}</h3>
                        }
                    </>
                    : 
                    <>
                        <h1>{`Book again with ${appointment.BarberTable?.UserTable?.first_name}?`}</h1>
                    </>
                }
                <Link  href={!appointmentUpcoming ? `/barber/${appointment.BarberTable?.profile_url}`: '/Appointments'}>
                    <section className="group cursor-pointer z-0 [width:_clamp(300px,25vw+200px,520px)] aspect-square rounded-xl mt-4 relative overflow-hidden hover:scale-[0.99] transition-scale duration-[800ms] [box-shadow:0px_0px_24px_rgba(var(--main-col-primary),0.3)] ">
                        <img alt="" className="w-full aspect-square object-cover z-10" src={appointment.BarberTable?.UserTable?.profilePicture}></img>
                        <div className="w-full absolute z-20 group-hover:translate-y-[-100%] top-100 translate-y-0 transition-all duration-300 p-4">
                            <div className="text-xl font-semibold">
                                <h3 className="text-white drop-shadow-xl">{appointment.BarberTable?.user_address.addressline1}</h3>
                                <h3 className="text-white drop-shadow-xl">{appointment.BarberTable?.user_address.addressline2}</h3>
                                <h3 className="text-white drop-shadow-xl">{appointment.BarberTable?.user_address.addressline3}</h3>
                                <h3 className="text-white drop-shadow-xl">{appointment.BarberTable?.user_address.city}</h3>
                                <h3 className="text-white drop-shadow-xl">{appointment.BarberTable?.user_address.postcode}</h3>
                            </div>
                        </div>
                        <div className="aspecr-square w-full absolute z-30 group-hover:translate-y-[0%] top-[0%] -translate-y-[100%] transition-all duration-300 p-4">
                            <div className="text-3xl font-semibold">
                                <h3 className="text-white drop-shadow-xl">{appointment.BarberTable?.UserTable?.first_name}</h3>
                                <h3 className="text-white drop-shadow-xl">{appointment.BarberTable?.UserTable?.last_name}</h3>
                            </div>
                        </div>
                        <div className="w-min flex items-center absolute z-20 group-hover:translate-x-[0%] right-0 bottom-0 translate-x-[100%] transition-all duration-300 p-4">
                            <div className="text-xl font-medium underline text-decoration-white text-white drop-shadow-xl whitespace-nowrap">
                                {
                                    appointmentUpcoming ?
                                    <div className="text-white drop-shadow-xl">View Appointment</div>
                                    :
                                    <div className="text-white drop-shadow-xl">Book Again</div>
                                }
                            </div>
                            <div className="w-12 stroke-white aspect-square">
                                <FrontArrowSVG/>
                            </div>
                        </div>
                        <div className="w-full mix-blend-overlay group-hover:shadow-[inset_10em_0em_10em_rgba(50,50,50,1),inset_0em_10em_10em_rgba(200,200,200,0.7),inset_-10em_0em_10em_rgba(50,50,50,0.9),_inset_0em_-10em_10em_rgba(20,20,20,0.9)] shadow-[inset_0em_0em_0em_rgba(50,50,50,0.9)] transition-all duration-300 rounded-full scale-[150%] aspect-square absolute top-0"></div>
                        <div className="w-full mix-blend-darken group-hover:shadow-[inset_10em_-5em_10em_rgba(30,30,30,0.3)] shadow-[inset_0em_0em_0em_rgba(30,30,30,0)]  transition-all duration-300 rounded-full scale-[150%] aspect-square absolute top-0"></div>
                    </section>
                </Link>
                {
                    appointmentUpcoming ? 
                    <aside className="[width:_clamp(300px,25vw+200px,520px)] flex ">
                        <Link href={'/Appointments'} className="underline text-xl cursor-pointer mx-auto text-light mt-4">View Appointment</Link>
                    </aside>
                    :
                    <div className="[width:_clamp(300px,25vw+200px,520px)] mx-auto flex gap-8 mt-4">
                        <Link href={'/Appointments'} className="underline text-xl cursor-pointer">Book again</Link>
                        <Link href={'/Appointments'} className="underline text-xl cursor-pointer">Review</Link>
                    </div>
                }

                <aside className="[width:_clamp(50px,8vw+50px,160px)]  absolute h-32 aspect-square top-[10%] right-[5%] rotateLoop lottie-stroke select-none [z-index:-1]">
                    <ScissorsLottie/>
                </aside>
                <aside className="[width:_clamp(40px,6vw+50px,140px)] absolute h-32 aspect-square top-[20%] left-[10%] rotateLoop select-none [z-index:-1]">
                    <div className="rotate-90 lottie-stroke">
                        <ScissorsLottie/>
                    </div>
                </aside>
                <aside className="[width:_clamp(30px,4vw+20px,80px)] absolute h-32 aspect-square top-[0%] left-[25%] rotateLoop select-none [z-index:-1]">
                    <div className="-rotate-30 lottie-stroke">
                        <ScissorsLottie/>
                    </div>
                </aside>
            </main>
    )
}


type CustomerSignInTypes = {
    user:HomeUserTypes;
}

async function CustomerSignIn({user}: CustomerSignInTypes) {

    const userAppointments = user?.AppointmentsTable
    const userId = user.id

    let nextAppointment;
    let cutTime;
    let cutDate;

    let pastAppointments =  await getPastAppointments(userId);

    console.log(!!userAppointments)

    if(userAppointments && userAppointments.length>0){
        const orderedAppointmentDay = userAppointments?.sort((a,b)=>{
            const dateA = new Date(a.cut_date)
            const dateB = new Date(b.cut_date)
            return dateA.getTime() - dateB.getTime()
        })
    
        const orderedAppointmentTime = orderedAppointmentDay?.sort((a,b)=>{
            const timeA = new Date(a.cut_time as any)
            const timeB = new Date(b.cut_time as any)
            return timeA.getTime() - timeB.getTime()
        })
    
        nextAppointment  = orderedAppointmentTime?.[0]
        cutTime = nextAppointment?.cut_time
        cutDate = nextAppointment?.cut_date as any
    }    

    return (
        <div>
        {
            pastAppointments && pastAppointments.length === 0 && !nextAppointment &&
            <div>
                <div className='w-24 aspect-square fill-light mx-auto mt-4'> 
                    <EmptyCalender/>
                </div>
                <h2 className='text-light w-fit mx-auto'>You have no upcoming appointments...</h2>
            </div>
        }
        {
            !nextAppointment && !pastAppointments ?
            <HomeDefault/>
            :null
        }
        {
            nextAppointment ?
            <BarberBanner cutTime={cutTime as string[]} cutDate={cutDate} appointment={nextAppointment} appointmentUpcoming={true}  />
            :null
        }
        {
        !nextAppointment && pastAppointments && pastAppointments[0] ?
        <section className="flex flex-col items-center">
            <BarberBanner appointment={pastAppointments[0]} appointmentUpcoming={false}/>
        </section>
        :
        null
        }
        {
            pastAppointments && pastAppointments.length > 0 ?
            <section className="flex flex-col items-center">
                <h1>Past Appointments</h1>
                <section className="flex flex-col gap-2 mt-4">
                    {
                        pastAppointments.map((item,i)=>{

                            return(
                                <Link href={'/Appointments'}>
                                    <div key={i}  className="w-full max-w-[600px] mx-auto group hover:bg-light-3 cursor-pointer bg-white/5  border-[1px] border-light rounded-lg overflow-hidden  transition-colors duration-100">
                                        <div className="flex w-full justify-between items-center px-4 py-2 gap-4">
                                            <div className="flex flex-wrap">
                                                <h3 className="mr-2 font-bold">{item.cut_name}</h3>
                                                <h3 className="font-light">{item.BarberTable?.UserTable?.first_name} {item.BarberTable?.UserTable?.last_name}</h3>
                                            </div>
                                            <div className="flex justify-content gap-3 items-center font-light text-light">
                                                <div>
                                                    <h3>{item.cut_date.toString().split('-').reverse().join('/')}</h3>
                                                    {
                                                        item.cut_time.length === 2 ?
                                                        <h3 className="text-light">{`${item.cut_time[0].split('-')[0]}-${item.cut_time[1].split('-')[1]} `}</h3>
                                                        :
                                                        <h3 className="text-light">{item.cut_time[0]}</h3>
                                                    }
                                                </div>
                                                <div className="w-12 aspect-square group-hover:translate-x-2 transition-all duration-200 ease-in-out">
                                                    <FrontArrowSVG stroke="stroke-primary"/>
                                                </div>                            
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                }
                </section>
                

                <section className="flex gap-6 mt-4 mb-4">
                    <Link href={'/Appointments'} className="underline text-lg cursor-pointer text-light">View all/previous Appointments</Link>
                </section>
            </section>
            :
            null
        }
    </div>  
    )
}

export default CustomerSignIn