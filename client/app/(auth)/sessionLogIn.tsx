"use client"

import { Session } from '@supabase/supabase-js'
import { useLogIn } from '../(hooks)/useUserLogin'

interface SessionLogInProps{
    data:Session | null
}

export default function SessionLogIn(data:SessionLogInProps){
    const {logUserIn, isUserLoggedIn} = useLogIn()
    if(data.data?.user && !isUserLoggedIn){
        logUserIn()
        console.log('logged in')
        console.log(data.data?.user.user_metadata)
    }

    return null;
}