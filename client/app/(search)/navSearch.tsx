"use client"

import Link from 'next/link'
import NavMonth from './navMonth'
import NavTime from './navTime'
import NavLocation from './navLocation'
import NavPersonalise from './navPersonalise'
import {useState, useEffect, useCallback, useRef, useContext } from 'react'
import { BookingTime } from '../types/barberTypes'
import LoadGoogleMaps from '../loadGoogle'
import { useGoogleLoaded } from '../(hooks)/googleLoaded'


export default function NavSearch(){
  const {googleLoaded} = useGoogleLoaded()

    const [ displayMenu, setDisplayMenu ] = useState(false)
    const [ location, setLocation ] =useState('')
    const navRef = useRef<HTMLElement | null>(null)
    const menuRef = useRef<HTMLElement | null>(null)
    const searchRef = useRef<SVGSVGElement | null>(null);
    const locationOptionsRef = useRef<HTMLDivElement | null>(null)


    const menuToggle = useCallback(() => {
        if(displayMenu){
            setDisplayMenu(false)
            setNavPage(0)
        }
    },[displayMenu])

    const menuHandler = (e: MouseEvent) =>{
        if(!navRef.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node) && !locationOptionsRef.current?.contains(e.target as Node) || searchRef.current?.contains(e.target as Node)){
            menuToggle()
        }
    }

    useEffect(()=>{
        window.addEventListener('click', menuHandler)

        return () =>{
            window.removeEventListener('click', menuHandler)
        }
    },[displayMenu])

    const [ navPage, setNavPage ] = useState<number>(0)
    const monthRef = useRef<HTMLDivElement | null>(null)
    const locationRef = useRef<HTMLDivElement | null>(null)
    const timeRef= useRef<HTMLDivElement | null >(null)
    const [ navHeight, setNavHeight ] = useState(0)
    const personaliseRef = useRef<HTMLDivElement | null>(null)

    const navHeightToggle = useCallback((action : string) => {
        switch (action) {
          case 'personalise':
            setNavHeight(personaliseRef.current?.offsetHeight || 0)
            break;
          case 'day':
            setNavHeight(monthRef.current?.offsetHeight  || 0)
            break;
          case 'location':
            setNavHeight(locationRef.current?.offsetHeight || 0)
            break;
          case 'time':
            setNavHeight(timeRef.current?.offsetHeight || 0)
            break;
          default:
            break;
        }
    },[personaliseRef, monthRef, timeRef])

    const formatUri = (uri : string) => {
      const formatted = uri.replace(/ /g, '-')
      return formatted
    }

    // Personalise states
    const [ethnicity, setEthnicity] = useState<string[]>([])
    const [experience, setExperience] = useState<string[]>([])
    const [barberLocation, setBarberLocation] = useState<string[]>([])

    // Location States
    const [searchLocation, setSearchLocation] = useState('')

    // Date States
    const [ bookingDate, setBookingDate ] = useState<string[]>([])

    //Time States
    const [ timeAllDay, setTimeAllDay ] = useState<string>('yes')
    const [ bookingTime, setBookingTime ] = useState<BookingTime>({allDay:timeAllDay,time:{hr:null,min:null}, range:0.5})

    const updatePreferences = () => {
      const updatedData = {personalise:{ethnicity:ethnicity, experience:experience, barberLocation:barberLocation}, booking: {bookingLocation:searchLocation,bookingDate:bookingDate,bookingTime:bookingTime}}
      // dispatch({type:'navData', payload:updatedData})
    }

    const interactRef = useRef<HTMLElement | null>(null)

    const inputRef = useRef<HTMLInputElement | null >(null)
    useEffect(()=>{
        const enterHandler = (e:KeyboardEvent) => {
            if (e.key === 'Enter') {
                inputRef.current?.blur()
            }
        }
  
        window.addEventListener('keydown', (e)=>{
            enterHandler(e)
        })
  
        return () => {
            window.removeEventListener('keydown', (e)=>{
                enterHandler(e)
            })
        }
  },[])
    

    return(
        <section className='relative mx-auto width-fit z-50'>
        <section  ref={navRef} style={{transition: 'all 0.2s ease-in-out', opacity: !displayMenu ? 1 : 0, transform: displayMenu ? 'translateY(4rem) scale(1.5)' : 'translateY(0px) scale(1)'}} className='nav-search width-fit mx-auto hover:drop-shadow-xl' onClick={()=>{setDisplayMenu(!displayMenu);setTimeout(()=>{navHeightToggle('personalise')},0)}}>
          <div>
            Personalise
          </div>
          <div>
            Location
          </div>
          <div>
            Time
          </div>
          <svg version="1.1" className='nav-svg-profile' width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 408.1 408" xmlSpace="preserve">
            <path d="M402,372L298,268c51-65,46-160-14-219C253,18,211,0,166,0S80,17,49,49C17,80,0,122,0,166s17,86,49,118c31,31,73,49,118,49
              c37,0,73-12,102-35l104,104c4,4,9,6,15,6c6,0,11-2,15-6C410,394,410,380,402,372z M78,254c-23-23-36-55-36-88s13-64,36-88
              c24-23,55-36,88-36s64,13,88,36c48,49,48,127,0,176c-23,23-55,36-88,36C133,291,102,278,78,254z"/>
          </svg>
        </section>
        <section ref={menuRef} style={{display: displayMenu ? 'block' : 'none', zIndex: 10000 }} className='left-1/2 -translate-x-1/2 overflow-hidden nav-menu-toggle border-primary rounded-2xl p-4 bg-white absolute flex flex-col'>
          <span className='nav-active-container flex flex-row gap-4 justify-evenly mb-4'>
            <h3 onClick={()=>{setNavPage(0);navHeightToggle('personalise');interactRef.current ? interactRef.current.scrollTop = 0 : null}} className={`${navPage === 0 ? 'nav-active' : null} cursor-pointer`}>Personalise</h3>
            <h3 onClick={()=>{setNavPage(1);navHeightToggle('location');interactRef.current ? interactRef.current.scrollTop = 0 : null;setTimeout(()=>{inputRef.current?.focus()},300)}} className={`${navPage === 1 ? 'nav-active' : null} cursor-pointer`}>Location</h3>
            <h3 onClick={()=>{setNavPage(2);navHeightToggle('day');interactRef.current ? interactRef.current.scrollTop = 0 : null}} className={`${navPage === 2 ? 'nav-active' : null} cursor-pointer`}>Day</h3>
            <h3 onClick={()=>{setNavPage(3);navHeightToggle('time');interactRef.current ? interactRef.current.scrollTop = 0 : null}} className={`${navPage === 3 ? 'nav-active' : null} cursor-pointer`}>Time</h3>
            <div onClick={()=>updatePreferences()}>
              <Link href={`/discover/location/${location ? location : 'London'}`}>
                <svg ref={searchRef} version="1.1" className='nav-svg-profile' width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 408.1 408" xmlSpace="preserve">
                  <path d="M402,372L298,268c51-65,46-160-14-219C253,18,211,0,166,0S80,17,49,49C17,80,0,122,0,166s17,86,49,118c31,31,73,49,118,49
                    c37,0,73-12,102-35l104,104c4,4,9,6,15,6c6,0,11-2,15-6C410,394,410,380,402,372z M78,254c-23-23-36-55-36-88s13-64,36-88
                    c24-23,55-36,88-36s64,13,88,36c48,49,48,127,0,176c-23,23-55,36-88,36C133,291,102,278,78,254z"/>
                </svg>
              </Link>
            </div>
          </span>
          <section ref={interactRef} style={{overflowY: navPage === 0 ? 'scroll': 'hidden' , height:`${navHeight}px`, maxHeight:'680px', transition:'0.2s ease-in-out'}} className='nav-menu flex flex-row relative overflow-hidden '>
            <div  ref={personaliseRef} style={{left:`${0 - (navPage)*100}%`, width:'100%', transition: 'all 0.2s ease-in-out ', margin: '0 auto', opacity: navPage === 0 ? 1 :0 }} className="absolute m" >
              <NavPersonalise ethnicity={ethnicity} setEthnicity={setEthnicity} experience={experience} setExperience={setExperience} barberLocation={barberLocation} setBarberLocation={setBarberLocation}/>
            </div>
            <div ref={locationRef} style={{left:`${100 - (navPage)*100}%`, width:'100%', transition: 'all 0.2s ease-in-out', margin: '0 auto', opacity: navPage === 1 ? 1 :0 }} className="absolute m">
              < NavLocation locationOptionsRef={locationOptionsRef} interactRef={interactRef} navPage={navPage} setSearchLocation={setSearchLocation} searchLocation={searchLocation} setLocation={setLocation} inputRef={inputRef}/>
            </div>
            <div ref={monthRef} style={{left:`${200 - (navPage)*100}%`, transition: 'all 0.2s ease-in-out', opacity: navPage === 2 ? 1 :0 }} className='absolute w-[100%]'> 
              < NavMonth bookingDate={bookingDate} setBookingDate={setBookingDate} navHeightToggle={navHeightToggle} />
            </div>
            <div  ref={timeRef} style={{left:`${300 - (navPage)*100}%`, width:'100%', transition: 'all 0.2s ease-in-out', margin: '0 auto', opacity: navPage === 3 ? 1 :0 }} className="absolute m">
              < NavTime timeAllDay={timeAllDay} setTimeAllDay={setTimeAllDay}  bookingTime={bookingTime} setBookingTime={setBookingTime} navHeightToggle={navHeightToggle}/>
            </div>
          </section>
        </section>
      </section>
    )
}

