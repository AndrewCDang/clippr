"use client"

import { useBookingDetails } from '@/app/(hooks)/useBookingDetails';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useLayoutEffect, useState } from 'react';
import {BarberItem, barberFormTypes} from '@/app/types/barberTypes'
import { reviewStarsSVG } from '@/app/(svg)/starsSVG';
import { Button } from '@/app/(components)/button';
import { useRouter } from 'next/navigation'
import LoadingSpin from '@/app/(components)/loadingSpin';

const getbarberPage = async(id:string) => {
  const supabase = createClientComponentClient()

  const { data:barberData, error:barberError} = await supabase.from('BarberTable')
  .select('*, UserTable("*")')
  .eq('profile_url',id)
  .single()
  return barberData
}

const barberReviews = async(id:any) => {
  const supabase = createClientComponentClient()
  const {data, error} = await supabase.from('ReviewsTable')
  .select()
  .eq('barber_id',id)

  return(data)
}

type BookAppointmentTypes ={
  barberPage:BarberItem;
  userDetails:barberFormTypes
}

function Book({params}:any) {
  const router = useRouter()

  const {bookingDetails} = useBookingDetails()
  const [barberPage, setBarberPage ] = useState<BarberItem|null>(null)
  const [userDetails, setUserDetails] = useState<barberFormTypes|null>(null)
  const [pageError, setPageError] = useState<boolean>(true)
  const [reviews, setReviews] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [btnMessage, setBtnMessage] = useState<string>('Confirm | Book')

  const bookAppointment = async({barberPage,userDetails}:BookAppointmentTypes) =>{
    const supabase = createClientComponentClient()
  
    const getDate = ()=> {
      if(userDetails.selectedDate && userDetails.selectedDate.year !==null && userDetails.selectedDate.month !== null && userDetails.selectedDate.date !== null){
        const appointmentDate = new Date(userDetails.selectedDate.year,userDetails.selectedDate.month-1,userDetails.selectedDate.date)
        return appointmentDate
      }
    }
    const appointmentDate = getDate()
  
    const {data:sessionData, error:errorSession} = await supabase.auth.getSession()
    const authId = sessionData.session?.user.id
  
    if(sessionData){
      const {data, error} = await supabase.from('AppointmentsTable')
      .insert({
        user_id:sessionData.session?.user.id,
        barber_id:barberPage.id,
        cut_price:userDetails.cutDetails.cutPrice,
        cut_name:userDetails.cutDetails.cutName,
        cut_duration:userDetails.cutDetails.cutDuration,
        cut_date:appointmentDate,
        cut_time:userDetails.selectedTime,
        cut_start_time:userDetails.selectedTime?.[0].split('-')[0]
      })
      .select()
      .single()
  
      if(data){
        // console.log({status:200,success:'Appointment Added', appointment:sessionData})
        setLoading(false)
        setBtnMessage('Booking Confirmed')
        setTimeout(()=>{
          router.push('/')
        },1000)
      }else{
        console.log({error:error})
      }
    }
  }

  useEffect(()=>{
    const fetchData = async () => {
      const barberPageData = await getbarberPage(params.id);
      setBarberPage(state=>{

        checkPage(barberPageData)


        return(barberPageData)
      }
        )

      const barberReviewsItems = await barberReviews(barberPageData.id)
      setReviews(barberReviewsItems)
    };
    fetchData()
  },[])

  const checkPage = (barberPageData:BarberItem) => {
    if(barberPageData.id !== bookingDetails?.barberDetails.id ){
      console.log(barberPageData.id)
      console.log(bookingDetails)
      console.log(barberPageData.id)
      setPageError(true)
    }else{
      setUserDetails(bookingDetails.bookingDetails)
    }
  }

  const clickHandler = () => {
    if(barberPage && userDetails){
      setLoading(true)
      bookAppointment({barberPage:barberPage,userDetails:userDetails})
    }
  }

  const [redirecting, setRedirecting] = useState(false)

  useLayoutEffect(()=>{
    if(barberPage && userDetails ==null){
    setRedirecting(true)
    setTimeout(()=>{
        router.push(`/barber/${params.id}`)
      },1200)
    }
    },[userDetails, barberPage])

  const daysWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  return (

    <main className='mb-16 relative'>

      {
        barberPage && barberPage.UserTable && userDetails !==null ?
        <section>
            <section className='flex flex-col md:flex-row gap-4 pb-0 pt-4 mt-2 p-8 justify-center items-center'>
                <div className='md:mr-8 [width:_clamp(8rem,_calc(6rem_+_5vw),_12rem)] aspect-square rounded-full overflow-hidden shadow-xl z-10'>
                    <img className='w-full h-full aspect-square object-cover ' src={`${barberPage.UserTable?.profilePicture}`} alt='barber profile picture'></img>
                </div>
                <aside>
                <div className='pb-2 flex flex-wrap justify-between items-start'>
                  <div>
                    <h1 className="whitespace-nowrap">{`${barberPage.UserTable.first_name} ${barberPage.UserTable.last_name}`}</h1>
                    <div className='flex gap-1'>
                      <h2 className="text-secondary">{`${barberPage.barber_level.charAt(0).toUpperCase()}${barberPage.barber_level.slice(1)} barber`}</h2>
                    </div>
                    <div className='flex items-center'>
                      {reviewStarsSVG(barberPage.reviews_stars)}
                      
                      <h3 className='ml-1 font-medium'>{barberPage.reviews_stars && barberPage.reviews_stars.toFixed(2)}<span className='text-xs text-light'>{`(${reviews?.length} reviews)`}</span></h3>
                  </div>
                  </div>
                </div>
              </aside>
            </section>
            <section className='w-full mt-8'>
            <section className='grid grid-flow-row w-full grid-cols-1 max-w-[600px] mx-auto'>
                <article className='h-fit w-full border-t-[0.5px] border-light-2 mt-8 pt-2'>
                  <div className=''>
                    <h3>Appointment Location</h3>
                    {
                      barberPage.appointment_location == 'Home' ?
                      <>
                        <h2 className='font-medium text-lg'>Barber Home</h2>
                        <h5 className='text-lg text-light'>Appointment will take place at barber's house</h5>
                      </>
                      :null
                    }
                    {
                      barberPage.appointment_location == 'Studio' ?
                      <>
                        <h2 className='font-medium text-lg'>Barber Studio</h2>
                        <h5 className='text-lg text-light'>Appointment will take place at barber Studio</h5>
                      </>
                      :null
                    }
                    {
                      barberPage.appointment_location == 'Mobile' ?
                      <>
                        <h2 className='font-medium text-lg'>Mobile Barber</h2>
                        <h5 className='text-lg text-light'>Barber will travel to your home</h5>
                      </>
                      :null
                    }
                  </div>
                </article>
                <article className='h-fit w-full border-t-[0.5px] border-light-2 mt-8 flex justify-between pt-2'>
                  <div className=''>
                    <h3>Location</h3>
                    <h2 className='font-medium text-lg'>{barberPage.user_address.studio&&`${barberPage.user_address.studio[0].toUpperCase()}${barberPage.user_address.studio.slice(1)}`}</h2>
                    <h2 className='font-medium text-lg'>{`${barberPage.user_address.addressline1[0].toUpperCase()}${barberPage.user_address.addressline1.slice(1)}`}</h2>
                    <h2 className='font-medium text-lg'>{barberPage.user_address.addressline2&&`${barberPage.user_address.addressline2[0].toUpperCase()}${barberPage.user_address.addressline2.slice(1)}`}</h2>
                    <h2 className='font-medium text-lg'>{barberPage.user_address.addressline3&&`${barberPage.user_address.addressline3[0].toUpperCase()}${barberPage.user_address.addressline3.slice(1)}`}</h2>
                    <h2 className='font-medium text-lg'>{`${barberPage.user_address.city[0].toUpperCase()}${barberPage.user_address.city.slice(1)}`}</h2>
                    <h2 className='font-medium text-lg'>{barberPage.user_address.postcode.toUpperCase()}</h2>
                  </div>
                  <a className='underline text-light' target="_blank" href={`https://www.google.com/maps/place/${barberPage.user_address.addressline1.replaceAll(' ','+')},+${barberPage.user_address.city.replaceAll(' ', '+')}+${barberPage.user_address.postcode.replaceAll(' ','+')}/`}>Link to address</a>
                </article>
                <article className='h-fit w-full border-t-[0.5px] border-light-2 mt-8 pt-2'>
                  <div className=''>
                    <h3>Appointment Day</h3>
                    <h2 className='font-medium text-lg'>{userDetails.selectedDate?.date}/{userDetails.selectedDate?.month}/{userDetails.selectedDate?.year}</h2>
                    <h3 className='text-lg text-light'>{userDetails.selectedDate?.day && daysWeek[userDetails.selectedDate.day]}</h3>
                  </div>
                </article>
                <article className='h-fit w-full border-t-[0.5px] border-light-2 mt-8 pt-2'>
                  <div className=''>
                    <h3>Appointment Time</h3>
                    <h2 className='font-medium text-lg'>{userDetails.selectedTime?.length == 2 &&  `${userDetails.selectedTime[0].split('-')[0]}-${userDetails.selectedTime[1].split('-')[1]}`}{userDetails.selectedTime?.length == 1 && userDetails.selectedTime}{userDetails.selectedTime == null ? 'Time' : null}</h2>
                  </div>
                </article>
                <article className='h-fit w-full border-t-[0.5px] border-light-2 mt-8 pt-2'>
                  <div className=''>
                    <h3>Hair Cut</h3>
                    <h2 className='font-medium text-lg'>{userDetails.cutDetails.cutName}</h2>
                  </div>
                </article>
                <article className='h-fit w-full border-t-[0.5px] border-light-2 mt-8 pt-2'>
                  <div className=''>
                    <h3>Price</h3>
                    <h2 className='font-medium text-lg'>£{userDetails.cutDetails.cutPrice}</h2>
                  </div>
                </article>
                <article className='h-fit w-full border-t-[0.5px] border-light-2 mt-8 pt-2'>
                  <div className=''>
                    <h3>Duration</h3>
                    <h2 className='font-medium text-lg'>{userDetails.cutDetails.cutDuration} mins</h2>
                  </div>
                </article>
            </section>
            </section>
            <div className='mt-16'>
              <Button loading={loading} clicked={clickHandler} text={btnMessage}/>
            </div>
        </section>
        :null
      }
      {
          redirecting === true ? <div className='w-fit mx-auto mt-8'>
          <h1>No Booking Details Selected </h1>
          <div className='flex gap-2'>
            <h4>Redirecting to Barber Page</h4>
            <div className="w-4 aspect-square stroke-primary">
                <LoadingSpin colour="primary"/>
            </div>
          </div>
        </div> :null
      }
    </main>


)}

export default Book;
