"use client"

import AccountDropdown from "./AccountDropdown"
import DropSignUp from '@/app/(svg)/dropSignUp'
import DropLogIn from '@/app/(svg)/dropLogIn'
import { useRegisterModal } from "./(hooks)/useRegisterModal"
import { useLogInModal } from "./(hooks)/useLogInModal"
import { useAccountModal } from "./(hooks)/useAccountModal"
import { useCallback, useEffect, useRef } from "react"
import { useLogIn } from '@/app/(hooks)/useUserLogin'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from 'react';
import {useProfilePicture} from '@/app/(hooks)/useProfilePicture'
import Link from "next/link"
import ScissorsSVG from "./(svg)/scissorsSvg"
import SignOutSVG from "./(svg)/signOutSVG"
import ProfileSVG from "./(svg)/profileSVG"
import LoadingSpin from "./(components)/loadingSpin"

const DefaultIcon = () => {
    return(
        <svg className={`stroke-primary cursor-pointer w-12 aspect-square stroke-[3]`} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-bg transition duration-200 ease-in-out" d="M68 40C68 55.464 55.464 68 40 68C24.536 68 12 55.464 12 40C12 24.536 24.536 12 40 12C55.464 12 68 24.536 68 40Z" strokeLinecap="round" strokeLinejoin="round" />
            <path className="fill-bg" d="M58.3013 61.192C53.3935 65.4341 46.9966 68 40.0004 68C33.0041 68 26.6071 65.434 21.6992 61.1918C23.0685 58.9261 25.1923 57.1319 27.8006 56.1934C35.6862 53.3561 44.3142 53.3561 52.1998 56.1934C54.8082 57.1319 56.9321 58.9262 58.3013 61.192Z" strokeLinecap="round" strokeLinejoin="round" />
            <path className="fill-bg" d="M44.9581 46.1552C48.0026 44.6538 50.2028 41.8537 50.9413 38.5404L51.0113 38.2265C51.7558 34.8862 50.9692 31.388 48.8665 28.688L48.7564 28.5466C46.6536 25.8465 43.4227 24.2676 40.0004 24.2676C36.5781 24.2676 33.3472 25.8465 31.2445 28.5466L31.1344 28.688C29.0316 31.388 28.245 34.8862 28.9895 38.2265L29.0595 38.5404C29.798 41.8537 31.9982 44.6538 35.0427 46.1552C38.1682 47.6964 41.8327 47.6964 44.9581 46.1552Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const DefaultDropIcon = () => {
    return(
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-white" d="M68 40C68 55.464 55.464 68 40 68C24.536 68 12 55.464 12 40C12 24.536 24.536 12 40 12C55.464 12 68 24.536 68 40Z" strokeLinecap="round" strokeLinejoin="round" />
            <path className="fill-white" d="M58.3013 61.192C53.3935 65.4341 46.9966 68 40.0004 68C33.0041 68 26.6071 65.434 21.6992 61.1918C23.0685 58.9261 25.1923 57.1319 27.8006 56.1934C35.6862 53.3561 44.3142 53.3561 52.1998 56.1934C54.8082 57.1319 56.9321 58.9262 58.3013 61.192Z" strokeLinecap="round" strokeLinejoin="round" />
            <path className="fill-white" d="M44.9581 46.1552C48.0026 44.6538 50.2028 41.8537 50.9413 38.5404L51.0113 38.2265C51.7558 34.8862 50.9692 31.388 48.8665 28.688L48.7564 28.5466C46.6536 25.8465 43.4227 24.2676 40.0004 24.2676C36.5781 24.2676 33.3472 25.8465 31.2445 28.5466L31.1344 28.688C29.0316 31.388 28.245 34.8862 28.9895 38.2265L29.0595 38.5404C29.798 41.8537 31.9982 44.6538 35.0427 46.1552C38.1682 47.6964 41.8327 47.6964 44.9581 46.1552Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

const Account = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const { registerOpen, registerClose } = useRegisterModal()
    const { logInOpen, logInClose } = useLogInModal()
    const accountDropRef = useRef<HTMLButtonElement>(null)
    const { accountIsOpen, accountClose, accountOpen} = useAccountModal()
    const {logUserIn, isUserLoggedIn, loggingIn, setLoggingIn, logUserOut} = useLogIn()
    const [loggingOut, setLoggingOut] = useState<boolean>(false)


    // Dropdown bar toggler
    const handleAccountModal = useCallback((e:MouseEvent) => {
        if(accountIsOpen && !accountDropRef.current?.contains(e.target as Node)){
            accountClose()
        }
    },[accountIsOpen])

    // Toggles Modal on/off
    const toggleRegisterModal = () => {
        registerOpen()
        logInClose()
    }

    const toggleLogInModal = () => {
        logInOpen()
        registerClose()
    }

    const toggleAccountModal = () => {
        accountIsOpen ? accountClose() : accountOpen()
    }

    // Log in Barber/Customer Test Account
    const checkAppointments = async() => {
        try{
            const res = await fetch('/api/checkAppointments',{
                method:'PATCH'
                
            })
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await res.json()
            if(!json.error){
                // console.log(json)
                router.refresh()
            }else{
                console.log(json.error)
            }

        }catch(error){
            console.log(error)
        }
    }

    const logInBarber = async() => {
        setLoggingIn(true)
        const supabase = createClientComponentClient()
        const {error} = await supabase.auth.signInWithPassword({
            email:'wogobid150@namewok.com',
            password:'Password123!'
        })
        if(!error){
            setLoggingIn(false)
            logUserIn()
            logInClose()
            checkAppointments()
            router.refresh()
        }

    }

    const logInCustomer = async() => {
        setLoggingIn(true)
        const supabase = createClientComponentClient()
        const {error} = await supabase.auth.signInWithPassword({
            email:'xidod32779@bitofee.com',
            password:'Password123!'
        })
        if(!error){
            setLoggingIn(false)
            logUserIn()
            logInClose()
            checkAppointments()
            router.refresh()
        }

    }
    
    // Signing out account
    const handleLogout = async() => {
        setLoggingOut(true)
        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signOut()

        if(!error){
            logUserOut()
            router.refresh()
            router.push('/')
            router.refresh()
            setLoggingOut(false)
        }
        if(error){
            console.log(error)
        }
    }

    // Event listener that listens for click outside modal
    useEffect(() => {
        if (accountDropRef) {
            const listener = (e: MouseEvent) => {
                handleAccountModal(e);
            };
            window.addEventListener('click', listener);
            
            return () => {
                window.removeEventListener('click', listener);
            };
        }
    }, [accountDropRef, accountIsOpen]);


    // Sets username on navbar
    // Set profile url
    const [userName, setUserName] = useState<string>()
    const {profilePicture, setProfilePicture} = useProfilePicture()
    const [accountType, setAccountType] = useState<string>('customer')
    const [profileUrl, setProfileUrl] = useState<string>('')

    const getUser = async() => {
        const supabase = createClientComponentClient()
        const { data } = await supabase.auth.getSession()
        setUserName(`${data.session?.user.user_metadata.firstName} ${data.session?.user.user_metadata.lastName}`)

        const { data:userData, error: profileError} = await supabase.from('UserTable')
            .select('profilePicture,account_type')
            .eq('email',data.session?.user.email)
            .single()
        if(userData){
            setProfilePicture(String(userData.profilePicture))
            setAccountType(userData.account_type)
        }

        const { data:barberUrl, error: barberErr} = await supabase.from('BarberTable')
            .select('profile_url')
            .eq('user_id', data.session?.user.id)
            .single()
        if(barberUrl){
            setProfileUrl(barberUrl.profile_url)
        }
    }

    useEffect(()=>{
        if(isUserLoggedIn){
            getUser()
        }
        if(!isUserLoggedIn && userName !=''){
            setUserName('')
        }
    },[isUserLoggedIn]) 

    return(
        <section className="relative flex justify-end items-center">
            {userName  && !loggingOut && <h3 className="flex"><span className="mr-2 lg:block hidden ">Hello,</span><span className="text-medium mr-2 md:block hidden ">{userName}</span></h3>}
            {loggingOut && 
                <div className="flex gap-2">
                    <h3>Logging Out</h3>
                    <div className="w-4 aspect-square stroke-primary">
                        <LoadingSpin colour="primary"/>
                    </div>
                </div>
            }
            {loggingIn && 
                <div className="flex gap-2">
                    <h3>Logging In</h3>
                    <div className="w-4 aspect-square stroke-primary">
                        <LoadingSpin colour="primary"/>
                    </div>
                </div>
            }
            <button ref={accountDropRef} onClick={()=>toggleAccountModal()} >
                {
                    isUserLoggedIn && profilePicture && profilePicture !== 'null' ? 
                        <div className="shadow-xl w-9 h-9 rounded-full bg-light overflow-hidden hover:shadow-lg hover:scale-[0.95] transition-all duration-200 ">
                            <img className=" w-full aspect-square object-cover" src={profilePicture !==null ? profilePicture :''} alt="profile_picture image"></img>
                        </div>
                    :
                    <DefaultIcon/>
                }
            </button>
            {!isUserLoggedIn ?
            <section className={`${accountIsOpen ? 'flex' : 'hidden'} mt-2 absolute top-[100%] flex-col border-[1px] border-light rounded-xl overflow-hidden [&>*:first-child]:border-0 hover:drop-shadow-xl transition-all duration-200 ease-in-out bg-white`}>
                < AccountDropdown toggleFunctions={toggleRegisterModal}  dropList="Sign-up" dropSvg={< DropSignUp fill={"light"}/>}  />
                < AccountDropdown toggleFunctions={toggleLogInModal}  dropList="Log-in" dropSvg={< DropLogIn fill={"light"}/>}  />
                < AccountDropdown toggleFunctions={logInBarber}  dropList="Test Account" notes="Barber" notesStart={true} dropSvg={<div className="w-6 aspect-square rounded-full overflow-hidden"><img alt="" className=" object-cover scale-[2] translate-y-[20%]" src="/spencer.jpg"></img></div>}  />
                < AccountDropdown toggleFunctions={logInCustomer}  dropList="Test Account" notes="Customer" notesStart={true} dropSvg={<div className="w-6 aspect-square rounded-full overflow-hidden"><img alt="" className=" object-cover scale-[1.2]" src="/brian.jpg"></img></div>}  />

            </section>
            :
            <section className={`${accountIsOpen ? 'flex' : 'hidden'} mt-2 absolute top-[100%] flex-col border-[1px] border-light rounded-xl overflow-hidden [&>*:first-child]:border-0 hover:drop-shadow-xl transition-all duration-200 ease-in-out bg-white`}>
                {
                    accountType === 'customer' &&
                    <Link href={'/Appointments'}>
                        < AccountDropdown dropList="Appointments" dropSvg={<div className="fill-light-f w-8 aspect-square stroke-light-f stroke-[5] group-hover:stroke-primary-f transition-all duration-100"><ScissorsSVG/></div>}  />
                    </Link>
                }
                {
                    accountType === 'barber' &&
                    <>  
                        <Link href={`/barber/${profileUrl}`}>
                            < AccountDropdown dropList="Profile Page" dropSvg={<div className="fill-light-f w-8 aspect-square stroke-light-f stroke-[5] group-hover:stroke-primary-f transition-all duration-100"><DefaultDropIcon/></div>}  />
                        </Link>
                        <Link href={'/PastAppointments'}>
                            < AccountDropdown dropList="Appointments" notes="-as barber" dropSvg={<div className="fill-light-f w-8 aspect-square stroke-light-f stroke-[5] group-hover:stroke-primary-f transition-all duration-100"><ScissorsSVG/></div>}  />
                        </Link>
                        <Link href={'/Appointments'}>
                            < AccountDropdown dropList="Appointments" notes="-as customer" dropSvg={<div className="fill-light-f w-6 aspect-square group-hover:fill-primary-f transition-all duration-100"><ProfileSVG/></div>}  />
                        </Link>
                    </>
                }
                < AccountDropdown toggleFunctions={handleLogout} dropList="Log-out" dropSvg={<div className="fill-light-f w-6 aspect-square group-hover:fill-primary-f transition-all duration-100"><SignOutSVG/></div>}  />
            </section>
            }
        </section>
    )

}
export default Account

