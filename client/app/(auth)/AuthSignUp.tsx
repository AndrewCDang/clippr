"use client"

import { useForm } from "react-hook-form";
import { Button } from '@/app/(components)/button'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {useRegisterModal } from '@/app/(hooks)/useRegisterModal'


export function AuthFormSignUp(){

    const router = useRouter()
    const form = useForm<FormValues>({
        mode:"onChange"
    })
    const { register, handleSubmit, formState, reset, getValues, control } = form;
    const { errors } = formState;

    const [ submitLoading, setSubmitLoading ] = useState<boolean>(false);
    const {registerClose} = useRegisterModal()


    type FormValues = {
        firstName:string;
        lastName:string;
        email: string;
        dobYear: Number;
        password: string;
        confirmPassword: string;
        countryCode: Number;
        mobileNumber:Number;
    }

    const onSubmit = async(data: FormValues) =>{
        const supabase = createClientComponentClient()
        setSubmitLoading(true)
        const { error } = await supabase.auth.signUp({
            email:data.email,
            password:data.password,
            options:{
                emailRedirectTo:`${location.origin}/api/auth/callback`,
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName
                }
            }

        })
        setSubmitLoading(false)
        if (error){
            console.log(error.message)
        }
        if(!error){
            router.push('/verify')
            registerClose()
            reset()
        }
    }
    return(
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <label className="text-sm text-light" htmlFor="firstName">First name</label>
                <input className="rounded-lg px-2 py-1 border-light border " type="text" id="firstName" {...register("firstName", {
                    pattern:{
                        value:/^[a-zA-Z]+$/,
                        message:"invalid first-name"
                    },
                    required:{
                        value:true,
                        message:"first-name is required"
                    }
                })}></input>
                <h5 className="text-red">{errors.firstName?.message}</h5>
            </div>
            <div className="flex flex-col">
                <label className="text-sm text-light" htmlFor="lastName">Last name</label>
                <input className="rounded-lg px-2 py-1 border-light border " type="text" id="lastName" {...register("lastName", {
                    pattern:{
                        value:/^[a-zA-Z]+$/,
                        message:"invalid first-name"
                    },
                    required:{
                        value:true,
                        message:"first-name is required"
                    }
                })}></input>
                <h5 className="text-red">{errors.lastName?.message}</h5>
            </div>
            <div className="flex flex-col">
                <label className="text-sm text-light" htmlFor="email">Email</label>
                <input className="rounded-lg px-2 py-1 border-light border " type="text" id="email" {...register("email", {
                    pattern:{
                        value:/^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message:"invalid email"
                    },
                    required:{
                        value:true,
                        message:"email is required"
                    }
                })}></input>
                <h5 className="text-red">{errors.email?.message}</h5>
            </div>
            <div className="flex flex-col">
                <label className="text-sm text-light" htmlFor="dobYear">Date of Birth (DD/MM/YYYY)</label>
                <input min="0" max="100"className="rounded-lg px-2 py-1 border-light border " type="text" id="dobYear" {...register("dobYear", {
                    pattern:{
                        value:/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
                        message:"invalid date format - format to DD/MM/YYYY"
                    },
                    required:{
                        value:true,
                        message:"date is required"
                    }
                })}></input>
                <h5 className="text-red">{errors.dobYear?.message}</h5>
            </div>
            <div className="flex flex-col">
                <label className="text-sm text-light" htmlFor="countryCode">Country Code</label>
                <input min="0" max="100"className="rounded-lg px-2 py-1 border-light border " type="text" id="countryCode" {...register("countryCode", {
                    pattern:{
                        value:/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
                        message:"invalid date format - format to DD/MM/YYYY"
                    },
                    required:{
                        value:true,
                        message:"date is required"
                    }
                })}></input>
                <h5 className="text-red">{errors.dobYear?.message}</h5>
            </div>
            
            <div className="flex flex-col" >
                <label className="text-sm text-light" htmlFor="password">Password</label>
                <input className="rounded-lg px-2 py-1 border-light border" type="password" id="password" {...register("password",{
                    validate: (fieldValue) => {
                        const errors = [];
                        if (fieldValue.length < 10) {
                            errors.push("Password should be at least 10 characters long.");
                        }
                        
                        if (!/[A-Z]/.test(fieldValue)) {
                            errors.push("Password should contain at least one uppercase letter.");
                        }
                        
                        if (!/[a-z]/.test(fieldValue)) {
                            errors.push("Password should contain at least one lowercase letter.");
                        }
                    
                        if (!/\d/.test(fieldValue)) {
                            errors.push("Password should contain at least one number.");
                        }
                    
                        if (!/[!@#$%^&*(),.?":{}|<>]/.test(fieldValue)) {
                            errors.push("Password should contain at least one special character.");
                        }
                
                    return errors.length === 0 || errors.join(',');
                    }
                
                })}></input>
                {errors.password?.message?.split(',').map((errorItem,index)=>{
                    return(
                        <li className="text-sm text-red">{errorItem}</li>
                    )
                })}
            </div>
            
            <div className="flex flex-col" >
                <label className="text-sm text-light" htmlFor="confirmPassword">Confirm Password</label>
                <input className="rounded-lg px-2 py-1 border-light border" type="password" id="confirmPassword" {...register("confirmPassword",{
                    validate: (fieldValue) => {
                        const errors = [];
                        const prevPassword = getValues("password")
                        if (fieldValue !== prevPassword) {
                            errors.push(`Passwords do not match`);
                        }
                
                    return errors.length === 0 || errors.join(',');
                    }
                
                })}></input>
                {errors.confirmPassword?.message?.split(',').map((errorItem,index)=>{
                    return(
                        <li className="text-sm text-red">{errorItem}</li>
                    )
                })}
            </div>
            <Button text='Sign-up' loading={submitLoading} />
        </form>
    )
}

