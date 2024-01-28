"use client"
import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import { barberAppointmentTypes } from '../types/barberTypes'
// import { headers } from 'next/headers'
import Link from 'next/link'
import { reviewStarsSVG } from '../(svg)/starsSVG'
import { Button } from '../(components)/button'
import CancelAppointment from './cancelAppointment'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import EmptyCalender from '../(svg)/emptyCalender'

interface appoinmentCarouselProps {
    appointments: barberAppointmentTypes[] | undefined;
}

// const checkAppointments = async() => {

//     const supabase = createClientComponentClient()

//     const session = await supabase.auth.getSession()
//     const userId = session.data.session?.user.id as string
    
//     try{
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkAppointments`,{
//             method:'PATCH',
//             headers: headers()
//         }

//         )
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const json = await res.json()
//         if(!json.error){
//             console.log(json)
//             return json
//         }else{
//             console.log(json.error)
//         }

//     }catch(error){
//         console.log(error)
//     }
// }

function AppoinmentCarousel({appointments}:appoinmentCarouselProps) {
    const [appoinmentsArray, setappoinmentsArray]= useState(appointments)

    // Dom Ref
    const wrapperRef = useRef<HTMLDivElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)
    const corouselItemRef = useRef<(HTMLDivElement|null)[]>([])

    // Variables
    const currentPosition = useRef<number>(0)
    const clickedPosition = useRef<number>(0)
    const mouseIsDown = useRef<boolean>(false)

    type CustomScrollBehavior = 'auto' | 'smooth';
    const [scrollToggle, setScrollToggle] = useState<CustomScrollBehavior>('smooth');
    const [snapToggle, setSnapToggle] = useState('x mandatory')

    // Radio
    const [currentAppointment, setCurrentAppointment] = useState<number>()

    useEffect(() => {
        if (appointments && appointments.length > 0) {
            setCurrentAppointment(0);
        }
    }, [appointments]);


    // Functions
    const mouseDown = (e:MouseEvent) => {
        if(carouselRef.current){
            currentPosition.current = carouselRef.current.scrollLeft
            clickedPosition.current = e.pageX
            mouseIsDown.current = true
            setScrollToggle('auto')
            setSnapToggle('none')
        }
    }

    const mouseOver = (e:MouseEvent) => {
        if (carouselRef.current && mouseIsDown.current) {
            carouselRef.current.scrollLeft = currentPosition.current - (e.pageX - clickedPosition.current)
        }
    }

    const mouseUp = (e:MouseEvent) => {
            setScrollToggle('smooth')
            setSnapToggle('x mandatory')
            mouseIsDown.current = false;
    }
    
    const scrollView = () => {
        if(carouselRef.current && corouselItemRef.current[0]){
            const scrollItemWidth = corouselItemRef.current[0].offsetWidth
            const currentPage = +(carouselRef.current.scrollLeft/scrollItemWidth).toFixed(0)
            setCurrentAppointment((prevState)=>{
                if(currentPage !== prevState){
                    return(currentPage)
                }
                return prevState
            }
            )

        }
    }

    const snapTo = (index:number) => {
        if(carouselRef.current && corouselItemRef.current[0]){
            const scrollWidth = corouselItemRef.current[0].offsetWidth
            carouselRef.current.scrollLeft = index * scrollWidth
        }
    }

    useLayoutEffect(()=>{
            carouselRef.current?.addEventListener("mousemove", mouseOver)
            carouselRef.current?.addEventListener("mousedown", mouseDown)
            carouselRef.current?.addEventListener("scroll", scrollView)
            carouselRef.current?.addEventListener("mouseup", mouseUp)

            return() =>{
                carouselRef.current?.removeEventListener("mousemove", mouseOver)
                carouselRef.current?.removeEventListener("mousedown", mouseDown)
                carouselRef.current?.removeEventListener("scroll", scrollView)
                carouselRef.current?.removeEventListener("mouseup", mouseUp)
            }
    },[carouselRef])



    return (
        <main>
            {
                appointments ? 
                <div className='relative' ref={wrapperRef}>
                        {
                            appointments.length>0 ?
                            <div className='text-2xl mt-4 font-semibold w-fit mx-auto'>{`${!isNaN(currentAppointment as number) ? currentAppointment as number +1 : 1}`}<span className='text-light text-sm'>{`/${appointments.length}`}</span></div>
                            :
                            <>  
                                <div className='w-24 aspect-square fill-light mx-auto mt-4'> 
                                    <EmptyCalender/>
                                </div>
                                <h2 className='text-light w-fit mx-auto'>You have no upcoming appointments...</h2>
                            </>
                        }
                        <div className='absolute bg-gradient-to-r from-bg w-[calc(2rem+5vw)] h-full'></div>
                            <div className='absolute bg-gradient-to-r from-transparent to-bg w-[calc(2rem+5vw)] h-full right-0'></div>
                            <section ref={carouselRef} style={{scrollBehavior: scrollToggle, scrollSnapType:snapToggle}} className='overflow-x-scroll carousel' >
                                <div className='grid grid-flow-col auto-cols-[calc(100%)]  gap-4 '>
                                    {
                                    appointments.map((appointment:barberAppointmentTypes, i:number)=>{
                                        return(
                                        <div key={appointment.id} style={{scrollSnapAlign:'center'}}  ref={el => corouselItemRef.current[i] = el} className='overflow-hidden pb-6 mx-4 mb-4 w-full'>
                                            <section key={appointment.id} className='m-4 p-4 w-fit max-w-[80%] shadow-xl border-[0.5px] border-light rounded-lg mx-auto bg-white/10'>
                                                <div className="grid gap-2 md:gap-4 grid-cols-2 md:flex md:flex-row  pb-2 text-[0.8rem] md:text-xl">
                                                    <div className="flex-1">
                                                        <h2 className="text-light font-light">Cut Date</h2>
                                                        {
                                                            appointment.cut_time.length === 2 ?
                                                            <h2 className="text-secondary font-semibold">{appointment.cut_date.toString().split('-').reverse().join('/')}</h2>
                                                            :
                                                            <h2 className="text-secondary font-semibold">{appointment.cut_date.toString().split('-').reverse().join('/')}</h2>
                                                        }

                                                    </div>
                                                    <div>
                                                        <h2 className="text-light font-light">Time</h2>
                                                        {appointment.cut_time.length === 2 ?
                                                            <h2 className="text-secondary font-semibold">{`${appointment.cut_time[0].split('-')[0]}-${appointment.cut_time[1].split('-')[1]} `}</h2>
                                                            :
                                                            <h2 className="text-secondary font-semibold">{appointment.cut_time[0]}</h2>
                                                        }
                                                    </div>
                                                    <div>
                                                        <h2 className="text-light font-light">Cut</h2>
                                                        <h2 className="text-secondary font-semibold">{appointment.cut_name}</h2>
                                                    </div>
                                                    <div>
                                                        <h2 className="text-light font-light">Price</h2>
                                                        <h2 className="text-secondary font-semibold">£{appointment.cut_price}</h2>
                                                    </div>
                                                </div>
                                                <div className="w-fit flex self-start md:self-end pb-2 mb-4 border-b-[0.5px] border-light">
                                                        <h4  className="ml-0 w-fit text-light text-[0.8rem] leading-[0.8rem] md:leading-[1rem] md:text-[1rem]">Ref: #{appointment.id.split('-')[0]}-{appointment.id.split('-')[1]}-{appointment.id.split('-')[2]}</h4>
                                                </div >
                                                <section className='grid grid-cols-2  md:grid-cols-3 gap-2 md:gap-4 '>
                                                    <div className=" w-full ">
                                                        <img className='aspect-square object-cover rounded-lg' src={appointment.BarberTable?.UserTable?.profilePicture}></img>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row justify-between w-fit gap-8 text-[0.8rem] leading-[0.8rem] md:leading-[1rem] md:text-[1rem]">
                                                        <div className="flex flex-col gap-2 md:gap-4">
                                                            <div className="flex flex-col whitespace-nowrap">
                                                                <h1 className='text-wrap [font-size:_clamp(1rem,calc(0.5rem_+_2vw),2rem)] [line-height:_clamp(1rem,calc(0.5rem_+_2vw),2rem)]'>{appointment.BarberTable?.UserTable?.first_name} {appointment.BarberTable?.UserTable?.last_name}</h1>
                                                                <h2 className='font-medium'>{appointment.BarberTable?.barber_level.slice(0,1).toUpperCase()}{appointment.BarberTable?.barber_level.slice(1)}</h2>
                                                                <div className='flex items-center flex-wrap text-xs'>
                                                                    {reviewStarsSVG(appointment.BarberTable?.reviews_stars)}
                                                                    <h3 className='ml-1  font-medium text-xs'>{appointment.BarberTable?.reviews_stars && appointment.BarberTable?.reviews_stars.toFixed(2)}<span className='text-xs text-light ml-1'>{`(${appointment.BarberTable && appointment?.BarberTable?.ReviewsTable?.length} reviews)`}</span></h3>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col h-full w-fit justify-end">
                                                                <div className='w-fit text-[0.7rem] md:text-[1rem]'>
                                                                    <Link target="_blank" href={`https://www.google.com/maps/place/${appointment.BarberTable?.user_address.addressline1.replaceAll(' ','+')},+${appointment.BarberTable?.user_address.city.replaceAll(' ', '+')}+${appointment.BarberTable?.user_address.postcode.replaceAll(' ','+')}/`}>
                                                                        {
                                                                            appointment.BarberTable?.user_address.studio ?
                                                                            <h3 className='text-light font-semibold'>{`${appointment.BarberTable?.user_address.studio}`}</h3>    
                                                                            :null
                                                                        }
                                                                        <h3 className='text-light underline'>{`${appointment.BarberTable?.user_address.addressline1}`}</h3>    
                                                                        <h3 className='text-light underline'>{`${appointment.BarberTable?.user_address.city}`}</h3>    
                                                                        <h3 className='text-light underline'>{`${appointment.BarberTable?.user_address.postcode.toUpperCase()}`}</h3>    
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className='flex flex-col gap-2 justify-end align-end col-span-2 md:col-span-1 mt-4'>
                                                            <div className='whitespace-nowrap '>
                                                                <Link href={`/barber/${appointment.BarberTable?.profile_url}`}>
                                                                    <Button text='Barber Page' full={true}/>
                                                                </Link>
                                                            </div>
                                                            <div className='whitespace-nowrap '>
                                                                <Button text='Payment Details' variant={2} full={true}/>
                                                            </div>
                                                            <div className='whitespace-nowrap '>
                                                                <CancelAppointment id={appointment.id}/>
                                                            </div>
                                                        </div>
                                                </section>
                                            </section>
                                        </div>
                                        )
                                    })
                                    }
                                </div>
                            </section>
                            <section className='absolute bottom-0 right-[50%] flex gap-4 translate-x-[50%]'>
                                    {
                                        appointments.map((item,i)=>{
                                            return(
                                            <div key={item.id}  className='w-8 aspect-square p-2 border-light-2 border-[1px] relative rounded-full'>
                                                <input checked={i === currentAppointment } type='radio' name='upcomingAppointments' onClick={()=>snapTo(i)}  className='radioCustom absolute inset-0 m-auto'></input>
                                            </div>
                                            )
                                        })
                                    }
                            </section>
                </div>
                : null

            }
        </main>
    )
    
}

export default AppoinmentCarousel