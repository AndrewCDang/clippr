"use client"

import { useState, useRef, useEffect, useCallback, SetStateAction } from 'react'
import TimeSVG from '@/app/(svg)/timeSvg'
import CalendarSVG from '@/app/(svg)/calendarSvg'
import ScissorsSVG from '@/app/(svg)/scissorsSvg'
import { BarberItem } from '@/app/types/barberTypes'
import BtnSelection from '@/app/(components)/btnSelection'
import BarberBookingTime from './barberBookingTime'
import autoAnimate from '@formkit/auto-animate'
import { cutClickType, selectedDateType, barberFormTypes } from '@/app/types/barberTypes'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { barberAppointmentTypes } from '@/app/types/barberTypes'
import LoadingSpin from '@/app/(components)/loadingSpin'

interface BarberBookingsProps {
  barber: BarberItem;
  setBookingDetails:React.Dispatch<React.SetStateAction<barberFormTypes>>
}

const getExistingAppointments = async(barber:BarberItem):Promise<barberAppointmentTypes[]|undefined> => {
  const supabase = createClientComponentClient()

  const {data,error} = await supabase.from('AppointmentsTable')
  .select()
  .eq('barber_id',barber.id)
  .eq('upcoming', true)

  if(data){
    return(data)
  }

}

function BarberBooking({barber, setBookingDetails}:BarberBookingsProps) {

  // Get Barber Time booking details
  const [barberArray, setBarberArray ] = useState(Array.from({length:2*(21-9+1)}, (_,i)=> i%2===0 ? `${0.5*i+9}:00` : `${(0.5*(i-1)+9)}:30`))

  const [selectedBarberArray, setSelectedBarberArray] = useState<string[]>()
  const orderOfDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const schedule = barber.weekly_schedule
  const blockedArray = Object.entries(schedule).sort(([a], [b]) => orderOfDays.indexOf(a) - orderOfDays.indexOf(b))
  const weeklyBlock = Object.values(Object.fromEntries(blockedArray)).map(item=>item.includes('*') ? item : [])
    
  // Toggle Dropdown
  const [cutSelect, setCutSelect] = useState<boolean>(false)
  const [timeSelect, setTimeSelect] = useState<boolean>(false)

  // Appointment
  const [ selectedDate, setSelectedDate ] = useState<selectedDateType | null>(null)
  const [ selectedTime, setSelectedTime ] = useState<string[]| null>(null)


  const cutBtn = useRef<HTMLButtonElement>(null)
  const timeBtn = useRef<HTMLElement>(null)
  const timeScrollRef = useRef<HTMLDivElement>(null)

  // Animates change of items in ref container
  useEffect(() => {
    timeScrollRef.current && autoAnimate(timeScrollRef.current)
  }, [timeScrollRef])

  const [cutName, setCutName] = useState<string|null>()
  const [cutDetails, setCutDetails] = useState<cutClickType>({cutName:null,cutPrice:null,cutDuration:30})

  const cutClick = ({cutPrice,cutDuration,cutName}:cutClickType) => {
    setCutName(cutName)
    setCutDetails(prevState=>{
      if(prevState.cutDuration !== cutDuration && selectedDate?.day && cutDuration){
        setAvailableTimes(selectedDate.day,cutDuration)
        setSelectedTime(null)
        setTimeSelect(true)
      }
      return({cutName:cutName,cutPrice:cutPrice, cutDuration:cutDuration})
    })
  }

  const timeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTime(JSON.parse((e.target as HTMLButtonElement).value))
    setTimeSelect(false)
    setCutSelect(false)
  }

  const setAvailableTimes = async(day:number,cutDuration:number,date?:number,month?:number,year?:number) => {
    const blockedDate = Object.values(blockedArray[day][1]).flat() as string[]
    let selectedBarberDates:string[] = []
    if(!blockedDate.includes('*')){
      selectedBarberDates = barberArray.filter(item=>{
        const condition = blockedDate.some(element => element == item)
        if(!condition){
          return item
        }
      })
    }

    // Filters out already booked appointments
    const existingAppointments = await getExistingAppointments(barber)
    const appointmentsToday = existingAppointments?.filter(item => {return(item.cut_date == `${year}-${(month as number).toString().length === 1 ? `0${month}` : month}-${date}`)}).map(item=>{return(item.cut_time)}).flat().map(item=>{return(item.split('-')[0])})
    let availableBarberTimes = selectedBarberDates.filter(item=>{
      if(!appointmentsToday?.includes(item)){
        return item
      }
    })

    // Filters out appointments less than 2 hrs from current time
    const currentTime = new Date()
    const currentDate = currentTime.getDate()

    // Filters if date is today
    if(date === currentTime.getDate() && month === currentTime.getMonth()+1 && year === currentTime.getFullYear() ){
      let currentMinute = currentTime.getMinutes()
      let currentHour = currentTime.getHours()
  
      if(currentMinute<20){
        currentMinute = 0
      }
      else if(currentMinute<=40 && currentMinute >=20){
        currentMinute = 30
      }else if(currentMinute>40){
        currentHour += 1
        currentMinute = 0
      }
      const earliestTime = `${currentHour+2}:${currentMinute==0 ? '00' : currentMinute}`
      const earliestIndex = selectedBarberDates.indexOf(earliestTime)
      const availableTimesToday = selectedBarberDates.slice(earliestIndex)
      const filteredTimeToday = availableBarberTimes.filter(item=>{return(availableTimesToday.includes(item))})

      availableBarberTimes = filteredTimeToday
    }

    // Creating Array of per hourly times
    if(cutDuration>35){
      const hourlyDates = availableBarberTimes.filter((item,i)=>{
        const indexDiff = barberArray.indexOf(selectedBarberDates[i+1]) - barberArray.indexOf(selectedBarberDates[i])
        if(indexDiff === 1){
          return item
        }
      })
      setSelectedBarberArray(hourlyDates)
    }else{
      setSelectedBarberArray(availableBarberTimes)
    }

    if(timeScrollRef.current){
      timeScrollRef.current.scrollLeft = 0
    }
  }

  const dateHandler = ({ month, date, year, day }: selectedDateType) => {
    const condition = month && date  && year && day!==null
    if(condition || day === 0 && condition){
      setAvailableTimes(day,cutDetails.cutDuration,date,month,year)
      setSelectedTime(null)
      setSelectedDate({ month: month, date: date, year: year, day:day});
    }

};

useEffect(()=>{
  if(cutDetails && cutDetails.cutName !== null && cutDetails.cutPrice !== null && cutDetails.cutDuration !== null){
    setBookingDetails({cutDetails:cutDetails, selectedDate:selectedDate, selectedTime:selectedTime })
  }
},[cutDetails, selectedDate, selectedTime])


  return (
    <aside className='w-full flex flex-col justify-center gap-4 p-4'>
      <section className='w-full h-fit relative border-light border-[0.5px] rounded-xl font-semibold overflow-hidden'>
        <button ref={cutBtn} onClick={()=>setCutSelect(!cutSelect)}  className='flex items-center gap-2 justify-center p-4 w-full hover:bg-light-3 transition-all duration-200 flex-nowrap whitespace-nowrap rounded-xl'>
          <div className='w-8 aspect-square stroke-[4] stroke-secondary fill-none'>
            <ScissorsSVG/>
          </div>
          <div className='flex flex-col'>
            <h3>{cutName||"Select Cut"}</h3>
            {
              cutDetails.cutName !==null ?<h5 className='font-light text-xs'>{`£${cutDetails.cutPrice} | ${cutDetails.cutDuration}mins`}</h5>:null
            }
          </div>
        </button>
        <section style={{gridTemplateRows:cutSelect ? '1fr' : '0fr',display:'grid', opacity: cutSelect ? 1 : 0, transition:'all 300ms ease-in', overflow:'hidden', transitionDelay:cutSelect?'0ms':'300ms'}} className='overflow-hidden'>
          <form className='overflow-hidden'>
            {
              barber.service.map((item)=>{
                return(
                  <div className='text-sm' key={item.cutName}>
                    <BtnSelection click={()=>cutClick({cutName:item.cutName,cutPrice:item.cutPrice,cutDuration:item.cutDuration})} flex={'row'} weight={0.5} colour='light-2' size='small' name={'barberPageCuts'} tag={item.cutName} type={'radio'} notes={[`£${item.cutPrice} | ${item.cutDuration}mins`]}/>
                  </div>
                )
              })
            }
          </form>
        </section>
        <section>
        </section>
      </section>
      <section className={`flex flex-col rounded-xl ${timeSelect ? 'border-[0.5px] border-light overflow-hidden' : 'border-bg '} transition-all duration-200`}>
        <section ref={timeBtn} className='grid grid-cols-2 gap-1'>
          <section className={`flex-shrink-0 relative border-light border-[0.5px] rounded-lg font-semibold hover:bg-light-3 transition-all duration-200 p-4 ${timeSelect ? 'border-t-0 border-l-0' : ' '}`}>
            <button onClick={()=>setTimeSelect(!timeSelect)} className={`flex h-full items-center gap-2 justify-center w-full flex-nowrap whitespace-nowrap`}>
              <div className='w-[2rem] flex-shrink-0 aspect-square'>
                <CalendarSVG/>
              </div>
              <h2 className='text-sm'>{selectedDate !== null ? `${selectedDate.date}/${selectedDate.month}/${selectedDate.year}`:'Date'}</h2>
            </button>
          </section>
          <section className={`flex-1 flex-shrink-0 relative border-light border-[0.5px] rounded-lg font-semibold hover:bg-light-3 transition-all duration-200 p-4 ${timeSelect ? 'border-t-0 border-r-0' : ' '}`}>
            <button onClick={()=>setTimeSelect(!timeSelect)} className={`flex items-center gap-2 justify-center w-full flex-nowrap whitespace-nowrap`}>
              <div className=' w-[2rem] flex-shrink-0 aspect-square'>
                <TimeSVG/>
              </div>
              <h2 className='text-sm'>{selectedTime?.length == 2 &&  `${selectedTime[0].split('-')[0]}-${selectedTime[1].split('-')[1]}`}{selectedTime?.length == 1 && selectedTime}{selectedTime == null ? 'Time' : null}</h2>
            </button>
          </section>
        </section>
        <section style={{gridTemplateRows:timeSelect ? '1fr' : '0fr',display:'grid', opacity: timeSelect ? 1 : 0, transition:'all 300ms ease-in', overflow:'hidden', transitionDelay:timeSelect?'0ms':'300ms'}} className='overflow-hidden mt-4'>
          <section className='overflow-hidden'>
            <BarberBookingTime weeklyBlock={weeklyBlock} selectedDate={selectedDate} dateHandler={dateHandler}/>
            <div  className='mt-4 border-t-[0.5px] border-light-2'  style={{gridTemplateRows:selectedDate ? '1fr' : '0fr',display:'grid', opacity: selectedDate ? 1 : 0, transition:'all 300ms ease-in', overflow:'hidden', transitionDelay:selectedDate?'0ms':'300ms'}}>
              <div  className='overflow-hidden'>
                <h2 className='text-center mt-4'>Available Times</h2>
                <div ref={timeScrollRef} className='z-30 my-4 gap-2 flex overflow-x-scroll hScroll px-1 snap-x scroll scroll-smooth'>
                  {
                    selectedBarberArray && selectedDate !== null ?
                    selectedBarberArray.map((item,i)=>{
                      const barberIndex = barberArray.indexOf(item)
                      if(i<selectedBarberArray.length-2){
                        if(cutDetails.cutDuration!==null && cutDetails.cutDuration > 35){
                          return(
                            <button key={i} onClick={(e)=>timeHandler(e)} value={JSON.stringify([`${item}-${barberArray[barberIndex+1]}`,`${barberArray[barberIndex+1]}-${barberArray[barberIndex+2]}`])} 
                            className={`${selectedTime?.[1] == `${barberArray[barberIndex+1]}-${barberArray[barberIndex+2]}` && selectedTime?.[0] == `${item}-${barberArray[barberIndex+1]}` ? 'bg-primary text-bg' : 'hover:bg-light-3'} border-light border snap-start rounded-xl h-12 mb-2 py-2 px-4 whitespace-nowrap transition-all duration-200`}>{`${item}-${barberArray[barberIndex+2]}`}</button>
                          )
                        }else if(cutDetails.cutDuration !== null && cutDetails.cutDuration <=35){
                          return(
                            <button key={i} onClick={(e)=>timeHandler(e)} value={JSON.stringify([`${item}-${barberArray[barberIndex+1]}`])} 
                            className={`${selectedTime?.[0] == `${item}-${barberArray[barberIndex+1]}` ? 'bg-primary text-bg' : 'hover:bg-light-3'} border-light border snap-start rounded-xl h-12 mb-2 py-2 px-4 whitespace-nowrap transition-all duration-200`}>{`${item}-${barberArray[barberIndex+1]}`}</button>
                          )
                        }
                      }
                    })
                    :
                    <div className='w-fit mx-auto flex gap-2'>
                      <span>Loading</span>
                      <div className="w-4 aspect-square stroke-primary">
                          <LoadingSpin colour="primary"/>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>

    </aside>
  )
}

export default BarberBooking