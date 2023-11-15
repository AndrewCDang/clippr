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
import { useRouter } from "next/navigation"
import { useState } from 'react';

const Account = () => {
    const router = useRouter()
    const { registerOpen, registerClose } = useRegisterModal()
    const { logInOpen, logInClose } = useLogInModal()
    const { isUserLoggedIn, logUserOut } = useLogIn()
    const accountDropRef = useRef<SVGSVGElement>(null)
    const { accountIsOpen, accountClose, accountOpen} = useAccountModal()

    // Dropdown bar toggler
    const handleAccountModal = useCallback((e:MouseEvent) => {
        if(accountIsOpen && !accountDropRef.current?.contains(e.target as Node)){
            accountClose()
        }
    },[accountIsOpen])

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

    const handleLogout = async() => {
        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signOut()

        if(!error){
            router.push('/')
            logUserOut()
        }
        if(error){
            console.log(error)
        }
    }

    // Sets username on navbar
    const [userName, setUserName] = useState<string>()

    const getUser = async() => {
        const supabase = createClientComponentClient()
        const { data } = await supabase.auth.getSession()
        setUserName(`${data.session?.user.user_metadata.firstName} ${data.session?.user.user_metadata.lastName}`)
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
            {userName && <h3>{`Hello, ${userName}`}</h3>}
            <svg ref={accountDropRef} onClick={()=>toggleAccountModal()} className={`${accountIsOpen ? 'stroke-primary' : null} stroke-primary nav-svg-profile cursor-pointer`} width="48px" height="48px" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-white transition duration-200 ease-in-out" d="M68 40C68 55.464 55.464 68 40 68C24.536 68 12 55.464 12 40C12 24.536 24.536 12 40 12C55.464 12 68 24.536 68 40Z" strokeLinecap="round" strokeLinejoin="round" />
                <path className="fill-white" d="M58.3013 61.192C53.3935 65.4341 46.9966 68 40.0004 68C33.0041 68 26.6071 65.434 21.6992 61.1918C23.0685 58.9261 25.1923 57.1319 27.8006 56.1934C35.6862 53.3561 44.3142 53.3561 52.1998 56.1934C54.8082 57.1319 56.9321 58.9262 58.3013 61.192Z" strokeLinecap="round" strokeLinejoin="round" />
                <path className="fill-white" d="M44.9581 46.1552C48.0026 44.6538 50.2028 41.8537 50.9413 38.5404L51.0113 38.2265C51.7558 34.8862 50.9692 31.388 48.8665 28.688L48.7564 28.5466C46.6536 25.8465 43.4227 24.2676 40.0004 24.2676C36.5781 24.2676 33.3472 25.8465 31.2445 28.5466L31.1344 28.688C29.0316 31.388 28.245 34.8862 28.9895 38.2265L29.0595 38.5404C29.798 41.8537 31.9982 44.6538 35.0427 46.1552C38.1682 47.6964 41.8327 47.6964 44.9581 46.1552Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {!isUserLoggedIn ?
            <section className={`${accountIsOpen ? 'flex' : 'hidden'} absolute top-[100%] flex-col border border-[1px] border-light rounded-xl overflow-hidden [&>*:first-child]:border-0 hover:drop-shadow-xl transition duration-200 ease-in-out`}>
                < AccountDropdown toggleFunctions={toggleRegisterModal}  dropList="Sign-up" dropSvg={< DropSignUp fill={"light"}/>}  />
                < AccountDropdown toggleFunctions={toggleLogInModal}  dropList="Log-in" dropSvg={< DropLogIn fill={"light"}/>}  />
            </section>
            :
            <section className={`${accountIsOpen ? 'flex' : 'hidden'} absolute top-[100%] flex-col border border-[1px] border-light rounded-xl overflow-hidden [&>*:first-child]:border-0 hover:drop-shadow-xl transition duration-200 ease-in-out`}>
                < AccountDropdown  dropList="View Appointments" dropSvg={< DropLogIn fill={"light"}/>}  />
                < AccountDropdown  dropList="Manage Profile" dropSvg={< DropLogIn fill={"light"}/>}  />
                < AccountDropdown toggleFunctions={handleLogout} dropList="Log-out" dropSvg={< DropSignUp fill={"light"}/>}  />
            </section>
            }
        </section>
    )

}
export default Account

