"use client"

import { useForm } from "react-hook-form";
import { Button } from '@/app/(components)/button'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useLogIn } from '@/app/(hooks)/useUserLogin'
import { useLogInModal} from '@/app/(hooks)/useLogInModal'
import { useState } from "react";
import { useRouter } from "next/navigation";




export function AuthForm(){
    const router = useRouter()
    const supabase = createClientComponentClient()

    
    const {logUserIn, isUserLoggedIn} = useLogIn()
    const {logInClose} = useLogInModal()

    const [ submitLoading, setSubmitLoading ] = useState<boolean>(false)
    const [errLogin, setErrLogin] = useState<string>()


    const form = useForm<FormValues>({
        mode:"onChange"
    })
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;
    
    type FormValues = {
        userEmail: string;
        userPassword: string;
    }

    const checkAppointments = async() => {
        try{
            const res = await fetch('/api/checkAppointments')
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await res.json()
            if(!json.error){
                console.log(json)
            }else{
                console.log(json.error)
            }

        }catch(error){
            console.log(error)
        }
    }
    

    const onSubmit = async(data: FormValues) =>{

        setSubmitLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email:data.userEmail,
            password:data.userPassword
        })    
        setSubmitLoading(false)
        if(!error){
            logUserIn()
            logInClose()
            checkAppointments()
            router.refresh()
            reset()

            if(errLogin){
                setErrLogin('')
            }
        }
        else{
            setErrLogin(error.message)
        }
    }


    return(
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <label className="text-sm text-light" htmlFor="userEmail">email</label>
                <input className="rounded-lg px-2 py-1 border-light border " type="text" id="userEmail" {...register("userEmail", {
                    required:{
                        value:true,
                        message:"email is required"
                    }
                })}></input>
                <h5 className="text-red">{errors.userEmail?.message}</h5>
            </div>
            <div className="flex flex-col" >
                <label className="text-sm text-light" htmlFor="userPassword">password</label>
                <input className="rounded-lg px-2 py-1 border-light border" type="password" id="userPassword" {...register("userPassword",{
                    required:{
                        value:true,
                        message:"password is required"
                    }
                })}></input>
                {errors.userPassword?.message?.split(',').map((errorItem,index)=>{
                    return(
                        <h5 className="text-sm text-red">{errorItem}</h5>
                    )
                })}
            </div>
            {errLogin && <div className="text-sm text-red">{errLogin}</div>}
            <Button text='Log-in' loading={submitLoading} />
        </form>
    )
}

