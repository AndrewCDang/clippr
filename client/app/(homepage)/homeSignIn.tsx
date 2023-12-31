import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { HomeUserTypes, barberAppointmentTypes   } from "../types/barberTypes"
import Countdown from "./countdown"
import FrontArrowSVG from "../(svg)/frontArrowSVG"
import ScissorsLottie from "../(svg)/(lotties)/scissorsLottie"
import Link from "next/link"
import HomeDefault from "./homeDefault"

async function getSession(){
    const supabase = createRouteHandlerClient({cookies})
    const {data, error} = await supabase.auth.getSession()

    if(data){
        return data
    }
}

async function getUser(userId: string): Promise<HomeUserTypes | null> {
    const supabase = createRouteHandlerClient({cookies})

    const {data, error} = await supabase.from('UserTable')
    .select('*, AppointmentsTable(*, BarberTable(*,UserTable("profilePicture","first_name", "last_name")))')
    .eq('id', userId)
    .filter('AppointmentsTable.upcoming', 'eq', true)
    .single()

    if(data){
        return data
    } else{
        return null
    }
}

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
        return data
    } else{
        return null
    }
}

const HomeSignIn = async() => {
    const session = await getSession()
    const userId = session?.session?.user.id as string

    const user = await getUser(userId)
    const userAppointments = user?.AppointmentsTable
    console.log(userAppointments)

    let nextAppointment;
    let cutTime;
    let cutDate;

    let pastAppointments;

    if(userAppointments && userAppointments?.length==0){
        const test = await getPastAppointments(userId)
        pastAppointments = test
    }else{
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







    return(
        <section className="flex flex-col gap-2 w-full">
            {
                nextAppointment ?
                <main className="flex flex-col justify-center items-center mt-8 mb-16 relative w-full">
                    <h1 className="[font-size:_clamp(2em,2vw+0.5em,150px)] [line-height:1em] text-center">Your next <br/> appointment is in...</h1>
                    <Countdown cutTime={cutTime} cutDate={cutDate}/>
                    <h3 className="[font-size:_clamp(1em,1vw+0.5em,100px)] mx-auto border-[1px] border-light rounded-xl px-4 py-2">{cutDate.split('-').reverse().join('/')} - {cutTime}</h3>
                    <div className="group cursor-pointer z-20 [width:_clamp(360px,25vw+200px,1000px)] aspect-square rounded-xl mt-4 relative overflow-hidden hover:scale-[0.99] transition-scale duration-[800ms] ">
                        <img className="w-full aspect-square object-cover z-10" src={nextAppointment.BarberTable?.UserTable?.profilePicture}></img>
                        <div className="w-full absolute z-20 group-hover:translate-y-[-100%] top-100 translate-y-0 transition-all duration-300 p-4">
                            <div className="text-xl font-semibold">
                                <h3 className="text-white drop-shadow-xl">{nextAppointment.BarberTable?.user_address.addressline1}</h3>
                                <h3 className="text-white drop-shadow-xl">{nextAppointment.BarberTable?.user_address.addressline2}</h3>
                                <h3 className="text-white drop-shadow-xl">{nextAppointment.BarberTable?.user_address.addressline3}</h3>
                                <h3 className="text-white drop-shadow-xl">{nextAppointment.BarberTable?.user_address.city}</h3>
                                <h3 className="text-white drop-shadow-xl">{nextAppointment.BarberTable?.user_address.postcode}</h3>
                            </div>
                        </div>
                        <div className="aspecr-square w-full absolute z-30 group-hover:translate-y-[0%] top-[0%] -translate-y-[100%] transition-all duration-300 p-4">
                            <div className="text-3xl font-semibold">
                                <h3 className="text-white drop-shadow-xl">{nextAppointment.BarberTable?.UserTable?.first_name}</h3>
                                <h3 className="text-white drop-shadow-xl">{nextAppointment.BarberTable?.UserTable?.last_name}</h3>
                            </div>
                        </div>
                        <div className="w-min flex items-center absolute z-20 group-hover:translate-x-[0%] right-0 bottom-0 translate-x-[100%] transition-all duration-300 p-4">
                            <div className="text-xl font-medium underline text-white drop-shadow-xl whitespace-nowrap">
                                <h3 className="text-white drop-shadow-xl">View Appointment</h3>
                            </div>
                            <div className="w-12 aspect-square">
                                <FrontArrowSVG/>
                            </div>
                        </div>
                        <div className="w-full mix-blend-overlay group-hover:shadow-[inset_10em_0em_10em_rgba(50,50,50,1),inset_0em_10em_10em_rgba(200,200,200,0.7),inset_-10em_0em_10em_rgba(50,50,50,0.9),_inset_0em_-10em_10em_rgba(20,20,20,0.9)] shadow-[inset_0em_0em_0em_rgba(50,50,50,0.9)] transition-all duration-300 rounded-full scale-[150%] aspect-square absolute top-0"></div>
                        <div className="w-full mix-blend-darken group-hover:shadow-[inset_10em_-5em_10em_rgba(30,30,30,0.3)] shadow-[inset_0em_0em_0em_rgba(30,30,30,0)]  transition-all duration-300 rounded-full scale-[150%] aspect-square absolute top-0"></div>

                    </div>
                    <aside className="[width:_clamp(360px,25vw+200px,1000px)] ">
                        <a className="underline text-xl cursor-pointer">View Appointment</a>
                        <section className="flex gap-6 mt-4">
                            <a className="underline text-lg cursor-pointer text-light">View all/previous Appointments</a>
                        </section>
                    </aside>
                    <aside className="[width:_clamp(50px,8vw+50px,160px)]  absolute h-32 aspect-square top-[0%] right-0 opacity-20 rotateLoop">
                        <ScissorsLottie/>
                    </aside>
                    <aside className="[width:_clamp(40px,6vw+50px,140px)] absolute h-32 aspect-square top-[20%] left-0 opacity-[15%] rotateLoop">
                        <div className="rotate-90">
                            <ScissorsLottie/>
                        </div>
                    </aside>
                    <aside className="[width:_clamp(30px,4vw+20px,80px)] absolute h-32 aspect-square top-[0%] left-[25%] opacity-[15%] rotateLoop">
                        <div className="-rotate-30">
                            <ScissorsLottie/>
                        </div>
                    </aside>
                </main>
                :null
            }
            {
                !nextAppointment && !pastAppointments ?
                <HomeDefault/>
                :null
            }
            {
            pastAppointments ?
            <section className="flex flex-col items-center">
                <h1>{`Book again with ${pastAppointments[0].BarberTable?.UserTable?.first_name}?`}</h1>
                    <main className="flex flex-col justify-center items-center mt-8 mb-16 relative w-full">
                        <Link href={`/barber/${pastAppointments[0].BarberTable?.profile_url}`}>
                            <div className="group cursor-pointer z-20 [width:_clamp(360px,25vw+200px,1000px)] aspect-square rounded-xl mt-4 relative overflow-hidden hover:scale-[0.99] transition-scale duration-[800ms] ">
                                <img className="w-full aspect-square object-cover z-10" src={pastAppointments[0].BarberTable?.UserTable?.profilePicture}></img>
                                <div className="w-full absolute z-20 group-hover:translate-y-[-100%] top-100 translate-y-0 transition-all duration-300 p-4">
                                    <div className="text-xl font-semibold">
                                        <h3 className="text-white drop-shadow-xl">{pastAppointments[0].BarberTable?.user_address.addressline1}</h3>
                                        <h3 className="text-white drop-shadow-xl">{pastAppointments[0].BarberTable?.user_address.addressline2}</h3>
                                        <h3 className="text-white drop-shadow-xl">{pastAppointments[0].BarberTable?.user_address.addressline3}</h3>
                                        <h3 className="text-white drop-shadow-xl">{pastAppointments[0].BarberTable?.user_address.city}</h3>
                                        <h3 className="text-white drop-shadow-xl">{pastAppointments[0].BarberTable?.user_address.postcode}</h3>
                                    </div>
                                </div>
                                <div className="aspecr-square w-full absolute z-30 group-hover:translate-y-[0%] top-[0%] -translate-y-[100%] transition-all duration-300 p-4">
                                    <div className="text-3xl font-semibold">
                                        <h3 className="text-white drop-shadow-xl">{pastAppointments[0].BarberTable?.UserTable?.first_name}</h3>
                                        <h3 className="text-white drop-shadow-xl">{pastAppointments[0].BarberTable?.UserTable?.last_name}</h3>
                                    </div>
                                </div>
                                <div className="w-full mix-blend-overlay group-hover:shadow-[inset_10em_0em_10em_rgba(50,50,50,1),inset_0em_10em_10em_rgba(200,200,200,0.7),inset_-10em_0em_10em_rgba(50,50,50,0.9),_inset_0em_-10em_10em_rgba(20,20,20,0.9)] shadow-[inset_0em_0em_0em_rgba(50,50,50,0.9)] transition-all duration-300 rounded-full scale-[150%] aspect-square absolute top-0"></div>
                                <div className="w-full mix-blend-darken group-hover:shadow-[inset_10em_-5em_10em_rgba(30,30,30,0.3)] shadow-[inset_0em_0em_0em_rgba(30,30,30,0)]  transition-all duration-300 rounded-full scale-[150%] aspect-square absolute top-0"></div>
                                <div className="w-min flex items-center absolute z-20 group-hover:translate-x-[0%] right-0 bottom-0 translate-x-[100%] transition-all duration-300 p-4">
                                    <div className="text-xl font-medium underline text-white drop-shadow-xl whitespace-nowrap">
                                        <h3 className="text-white drop-shadow-xl">View Bookings</h3>
                                    </div>
                                    <div className="w-12 aspect-square">
                                        <FrontArrowSVG/>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="[width:_clamp(360px,25vw+200px,1000px)] mx-auto flex gap-8 mt-4">
                                <a className="underline text-xl cursor-pointer">Book again</a>
                                <a className="underline text-xl cursor-pointer">Review</a>
                        </div>
                        <aside className="[width:_clamp(50px,8vw+50px,160px)]  absolute h-32 aspect-square top-[0%] right-0 opacity-20 rotateLoop">
                            <ScissorsLottie/>
                        </aside>
                        <aside className="[width:_clamp(40px,6vw+50px,140px)] absolute h-32 aspect-square top-[20%] left-0 opacity-[15%] rotateLoop">
                            <div className="rotate-90">
                                <ScissorsLottie/>
                            </div>
                        </aside>
                        <aside className="[width:_clamp(30px,4vw+20px,80px)] absolute h-32 aspect-square top-[0%] left-[25%] opacity-[15%] rotateLoop">
                            <div className="-rotate-30">
                                <ScissorsLottie/>
                            </div>
                        </aside>
                    </main>
            </section>
            :null
            }
            {
                pastAppointments ?
                <section className="flex flex-col items-center">
                    <h1>Past Appointments</h1>
                    <section className="flex flex-col gap-2 mt-4">
                        {
                            pastAppointments.map(item=>{
                                return(
                                    <article className="w-full max-w-[600px] mx-auto group hover:bg-light-3 cursor-pointer" key={item.created_at.toString()}>
                                        <div className="flex w-full justify-between items-center border-[1px] border-light rounded-lg px-4 py-2 gap-4">
                                            <div className="flex flex-wrap">
                                                <h3 className="mr-2"><a className="font-bold">{item.cut_name}</a></h3>
                                                <h3 className="font-light">{item.BarberTable?.UserTable?.first_name} {item.BarberTable?.UserTable?.last_name}</h3>
                                            </div>

                                            <aside className="flex justify-content gap-3 items-center font-light text-light">
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
                                            </aside>
                                        </div>
                                    </article>
                                )
                            })
                        }
                    </section>

                    <section className="flex gap-6 mt-4">
                        <Link href={'/Appointments'} className="underline text-lg cursor-pointer text-light">View all/previous Appointments</Link>
                    </section>
                </section>
                :
                <h2>No Past Appointments...</h2>
            }
            {/* <div className="w-40 h-40 border border-primary rounded-xl flex justify-center items-center">
                <h3>Favourited Barbers</h3>
            </div>
            <div className="w-40 h-40 border border-primary rounded-xl flex justify-center items-center">
                <h3>View Appointments</h3>
            </div> */}
        </section>
    )
}
export default HomeSignIn