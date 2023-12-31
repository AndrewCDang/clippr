"use client"

import LoadingSpin from "@/app/(components)/loadingSpin"
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useLogIn } from '@/app/(hooks)/useUserLogin'
import { useEffect } from "react";


export default function Verify(){
    const router = useRouter()
    const supabase = createClientComponentClient()
    const {logUserIn, isUserLoggedIn} = useLogIn()


    useEffect(() => {
        const getSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (data) {
                    console.log(data);
                    insertDb();
                    logUserIn();
                    redirectHome();
                } else {
                    console.error(error);
                }
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        getSession();
    }, [])

    const insertDb = async() => {
        const { data:{session} } = await supabase.auth.getSession()
            const res = await fetch('/api/newAccount',{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(session?.user)
            })
            const json = await res.json()
            if(json.error){
                console.log(json.error)
            }else{
                console.log(json)
            }
            
    }

    const redirectHome = () => {
            router.push('/setUp')
    }


    return(
        <main className="text-center">
            <h2>Thanks for verifying!</h2>
            <LoadingSpin width={64} colour="#162b34"></LoadingSpin>
        </main>
    )
}