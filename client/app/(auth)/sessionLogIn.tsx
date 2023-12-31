"use client"

import { Session } from '@supabase/supabase-js'
import { useLogIn } from '../(hooks)/useUserLogin'
import { useEffect } from 'react'

interface SessionLogInProps{
    data:Session | null
}

export default function SessionLogIn(data:SessionLogInProps){
    const {logUserIn, isUserLoggedIn} = useLogIn()

    useEffect(()=>{
        if(data.data?.user && !isUserLoggedIn){
            logUserIn()
            console.log('logged in')
            console.log(data.data?.user)
        }
    },[])


    return null;
}