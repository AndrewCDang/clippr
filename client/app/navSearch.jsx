"use client"

import Link from 'next/link'
import NavMonth from './navMonth'
import NavTime from './navTime'
import NavLocation from './navLocation'
import NavPersonalise from './navPersonalise'
import { useState, useEffect, useCallback, useRef, useContext } from 'react'
import { useAppContext } from './Context/store'

export default function NavSearch(){
  const { state, dispatch } = useAppContext()


    const [ displayMenu, setDisplayMenu ] = useState(false)
    const [ focusLocation, setFocusLocation ] = useState(false)
    const navRef = useRef()
    const menuRef = useRef()
    const searchRef = useRef()

    const [ location, setLocation ] =useState('')
    const [ date, setDate ] = useState('')
    const [ time, setTime ] = useState('')
    const [ range, setRange ] = useState(0.5)

    const menuToggle = useCallback(() => {
        if(displayMenu){
            setDisplayMenu(false)
        }
    },[displayMenu])

    const menuHandler = (e) =>{
        if(!navRef.current.contains(e.target) && !menuRef.current.contains(e.target) || searchRef.current.contains(e.target)){
            menuToggle()
        }
    }

    useEffect(()=>{
        window.addEventListener('click', menuHandler)

        return () =>{
            window.removeEventListener('click', menuHandler)
        }
    },[displayMenu])

    const [ navPage, setNavPage ] = useState(0)
    const monthRef = useRef()
    const locationRef = useRef()
    const timeRef= useRef()
    const [ navHeight, setNavHeight ] = useState(0)
    const personaliseRef = useRef()

    const navHeightToggle = useCallback((action) => {
        switch (action) {
          case 'personalise':
            setNavHeight(personaliseRef.current.offsetHeight)
            break;
          case 'day':
            setNavHeight(monthRef.current.offsetHeight)
            break;
          case 'location':
            setNavHeight(locationRef.current.offsetHeight)
            break;
          case 'time':
            setNavHeight(timeRef.current.offsetHeight)
           break;
          default:
            break;
        }
    },[monthRef, timeRef])

    useEffect(()=>{
      navHeightToggle('personalise')
    },[personaliseRef.current])

    const formatUri = (uri) => {
      const formatted = uri.replace(/ /g, '-')
      return formatted
    }

    // Personalise states
    const [ personalise, setPersonalise ] = useState()
    const [ethnicity, setEthnicity] = useState([])
    const [experience, setExperience] = useState([])
    const [barberLocation, setBarberLocation] = useState([])

    // Location States
    const [searchLocation, setSearchLocation] = useState()

    // Date States
    const [ bookingDate, setBookingDate ] = useState([])

    //Time States
    const [ bookingTime, setBookingTime ] = useState({time:{hr:null,min:null}, range:0.5})

    const updatePreferences = () => {
      const updatedData = {personalise:{ethnicity:ethnicity, experience:experience, barberLocation:barberLocation}, booking: {bookingLocation:searchLocation,bookingDate:bookingDate,bookingTime:bookingTime}}
      dispatch({type:'navData', payload:updatedData})
    }

    const interactRef = useRef()

    return(
        <section className='relative mx-auto width-fit'>
        <section  ref={navRef} style={{transition: 'all 0.2s ease-in-out', opacity: !displayMenu ? 1 : 0, transform: displayMenu ? 'translateY(4rem) scale(1.5)' : 'translateY(0px) scale(1)'}} className='nav-search width-fit mx-auto' onClick={()=>{setDisplayMenu(!displayMenu)}} onTransitionEnd={()=>{setFocusLocation(true)}}>
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
            <h3 onClick={()=>{setNavPage(0);navHeightToggle('personalise');interactRef.current.scrollTop=0}} className={`${navPage === 0 ? 'nav-active' : null} cursor-pointer`}>Personalise</h3>
            <h3 onClick={()=>{setNavPage(1);navHeightToggle('location');interactRef.current.scrollTop=0}} className={`${navPage === 1 ? 'nav-active' : null} cursor-pointer`}>Location</h3>
            <h3 onClick={()=>{setNavPage(2);navHeightToggle('day');interactRef.current.scrollTop=0}} className={`${navPage === 2 ? 'nav-active' : null} cursor-pointer`}>Day</h3>
            <h3 onClick={()=>{setNavPage(3);navHeightToggle('time');interactRef.current.scrollTop=0}} className={`${navPage === 3 ? 'nav-active' : null} cursor-pointer`}>Time</h3>
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
          <section ref={interactRef} style={{overflowY: navPage == 0 ? 'scroll': null , height:`${navHeight}px`, maxHeight:'680px', transition:'0.2s ease-in-out'}} className='nav-menu flex flex-row relative overflow-hidden '>
            <div ref={personaliseRef} style={{left:`${0 - (navPage)*100}%`, width:'100%', transition: 'all 0.2s ease-in-out', margin: '0 auto'}} className="absolute m" >
              <NavPersonalise ethnicity={ethnicity} setEthnicity={setEthnicity} experience={experience} setExperience={setExperience} barberLocation={barberLocation} setBarberLocation={setBarberLocation} focusLocation={focusLocation} setFocusLocation={setFocusLocation} />
            </div>
           <div ref={locationRef} style={{left:`${100 - (navPage)*100}%`, width:'100%', transition: 'all 0.2s ease-in-out', margin: '0 auto'}} className="absolute m">
              < NavLocation setSearchLocation={setSearchLocation} formatUri={formatUri} setLocation={setLocation} />
            </div>
            <div ref={monthRef} style={{left:`${200 - (navPage)*100}%`, transition: 'all 0.2s ease-in-out'}} className='absolute w-[100%]'> 
              < NavMonth bookingDate={bookingDate} setBookingDate={setBookingDate} setDate={setDate} navHeightToggle={navHeightToggle} />
            </div>
            <div  ref={timeRef} style={{left:`${300 - (navPage)*100}%`, width:'100%', transition: 'all 0.2s ease-in-out', margin: '0 auto'}} className="absolute m">
              < NavTime bookingTime={bookingTime} setBookingTime={setBookingTime}  setTime={setTime} setRange={setRange} />
            </div>
          </section>
        </section>
      </section>
    )
}