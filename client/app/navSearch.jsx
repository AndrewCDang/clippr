"use client"

import Link from 'next/link'
import NavMonth from './navMonth'
import { useState, useEffect, useCallback, useRef } from 'react'

export default function NavSearch(){
    const [ displayMenu, setDisplayMenu ] = useState(false)
    const navRef = useRef()
    const menuRef = useRef()
    const searchRef = useRef()

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

    return(
        <section className='relative'>
        <section ref={navRef} style={{transition: 'all 0.2s ease-in-out', opacity: !displayMenu ? 1 : 0, transform: displayMenu ? 'translateY(4rem) scale(1.5)' : 'translateY(0px) scale(1)'}} className='nav-search' onClick={()=>setDisplayMenu(!displayMenu)}>
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
        <section ref={menuRef} style={{display: displayMenu ? 'block' : 'none', zIndex: 10000 }} className='nav-menu-toggle border-primary rounded-2xl p-4 bg-white absolute left-[-50%] m-2 flex flex-col'>
          <span className='nav-active-container flex flex-row gap-4 justify-evenly mb-4'>
            <h3>Location</h3>
            <h3 className='nav-active'>Day</h3>
            <h3>Time</h3>
            <Link href="/discover">
              <svg ref={searchRef} version="1.1" className='nav-svg-profile' width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 408.1 408" xmlSpace="preserve">
                <path d="M402,372L298,268c51-65,46-160-14-219C253,18,211,0,166,0S80,17,49,49C17,80,0,122,0,166s17,86,49,118c31,31,73,49,118,49
                  c37,0,73-12,102-35l104,104c4,4,9,6,15,6c6,0,11-2,15-6C410,394,410,380,402,372z M78,254c-23-23-36-55-36-88s13-64,36-88
                  c24-23,55-36,88-36s64,13,88,36c48,49,48,127,0,176c-23,23-55,36-88,36C133,291,102,278,78,254z"/>
              </svg>
            </Link>
          </span>
          <form>
          {/* <fieldset>
            <input type='text' placeholder='Location'></input>
          </fieldset> */}
          < NavMonth />
          </form>
        </section>
      </section>
    )
}