"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {useLogIn} from "@/app/(hooks)/useUserLogin"
import HomeDefault from "./homeDefault"
import HomeSignIn from "./homeSignIn"


const HomeContent = () => {
    const { isUserLoggedIn} = useLogIn()

    return(
        <>
            {isUserLoggedIn ? <HomeSignIn/> : <HomeDefault/>}
        </>
    )


}

export default HomeContent