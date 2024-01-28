"use client"
import {useState, useEffect, useCallback, useRef } from 'react'
import NavSearchModal from './navSearchModal'
import NavSearchBar from './navSearchBar'
import { useSearchModal } from '../(hooks)/useSearchModal'

export default function NavSearch(){
    const {searchClose, searchIsOpen, searchOpen, externalClick, setExternalFalse} = useSearchModal()
    const navRef = useRef<HTMLElement | null>(null)
    const menuRef = useRef<HTMLElement | null>(null)
    const locationOptionsRef = useRef<HTMLDivElement | null>(null)
    const searchRef = useRef<HTMLButtonElement>(null);

    const [ navPage, setNavPage ] = useState<number>(0)
    const [ navHeight, setNavHeight ] = useState<number>(0)
    const monthRef = useRef<HTMLDivElement | null>(null)
    const locationRef = useRef<HTMLDivElement | null>(null)
    const timeRef= useRef<HTMLDivElement | null >(null)
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

    const menuToggle = () => {
      if (searchIsOpen && !externalClick) {
        searchClose();
        setNavPage(0);
      }
      if(externalClick){
        setExternalFalse()
      }
    }

    const menuHandler = (e:MouseEvent) => {
      if (
        !navRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node) &&
        !locationOptionsRef.current?.contains(e.target as Node) &&
        (searchRef.current && !searchRef.current.contains(e.target as Node))
      ) {
        menuToggle();
      }
    }
  
    useEffect(()=>{
        window.addEventListener('click', menuHandler)

        return () =>{
            window.removeEventListener('click', menuHandler)
        }
    },[searchIsOpen, externalClick])

    const [modalToggle, setModalToggle] = useState<boolean>(false)
    useEffect(()=>{
      if(modalToggle){
        menuToggle()
        setModalToggle(false)
      }
    },[modalToggle])


    return(
      <section className='mx-auto width-fit z-50 text-[0.8rem] md:text-[1rem]'>
        <NavSearchBar navRef={navRef} navHeightToggle={navHeightToggle}/>
        <NavSearchModal menuRef={menuRef} setModalToggle={setModalToggle} setNavPage={setNavPage} navHeightToggle={navHeightToggle} navPage={navPage} searchRef={searchRef} navHeight={navHeight} personaliseRef={personaliseRef} locationRef={locationRef} locationOptionsRef={locationOptionsRef}/>
      </section>
    )
}

