"use client"

import { useForm } from "react-hook-form";
import { Button } from '@/app/(components)/button'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useRef, KeyboardEvent } from "react";
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
        dobDay: number;
        dobMonth: number;
        dobYear: Number;
        password: string;
        confirmPassword: string;
        countryCode?: Number;
        mobileNumber?:Number;
    }
    const supabase = createClientComponentClient()

    const onSubmit = async(data: FormValues) =>{
        setSubmitLoading(true)
        const { error } = await supabase.auth.signUp({
            email:data.email,
            password:data.password,
            options:{
                emailRedirectTo:`${location.origin}/api/auth/callback`,
                data: {
                    firstName: data.firstName[0].toUpperCase()+data.firstName.slice(1),
                    lastName: data.lastName[0].toUpperCase()+data.lastName.slice(1),
                    countryCode: data.countryCode,
                    mobileNumber: data.mobileNumber,
                    dob:`${data.dobDay}/${data.dobMonth}/${data.dobYear}`,
                    email:data.email,
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

    const monthRef = useRef(null)

    const monthCheck = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log((e.target as HTMLInputElement).value); // Access input value, for example
    };

    const date = new Date()


    return(
        <form className="flex flex-col gap-4 overflow-y-scroll w-full" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="flex flex-col">
                <label className="text-sm text-light" htmlFor="firstName">First name*</label>
                <input className="rounded-lg px-2 py-1 border-light border w-full " type="text" id="firstName" {...register("firstName", {
                    pattern:{
                        value:/^[a-zA-Z-]+$/,
                        message:"invalid first-name"
                    },
                    required:{
                        value:true,
                        message:"first-name is required"
                    }
                })}></input>
                <h5 className="text-red">{errors.firstName?.message}</h5>
            </fieldset>
            <fieldset className="flex flex-col">
                <label className="text-sm text-light" htmlFor="lastName">Last name*</label>
                <input className="rounded-lg px-2 py-1 border-light border w-full " type="text" id="lastName" {...register("lastName", {
                    pattern:{
                        value:/^[a-zA-Z-]+$/,
                        message:"invalid first-name"
                    },
                    required:{
                        value:true,
                        message:"first-name is required"
                    }
                })}></input>
                <h5 className="text-red">{errors.lastName?.message}</h5>
            </fieldset>
            <fieldset className="flex flex-col">
                <label className="text-sm text-light" htmlFor="email">Email*</label>
                <input className="rounded-lg px-2 py-1 border-light border w-full " type="text" id="email" {...register("email", {
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
            </fieldset>
            <fieldset className=" gap-2 relative content-center items-center mt-6">
                <label className="absolute text-sm text-light top-[0%] translate-y-[-100%] whitespace-nowrap">Date of Birth*</label>
                <section className="flex">
                    <div className="flex w-12 flex-col relative">
                        <input placeholder="DD" className="rounded-lg px-2 py-1 border-light border w-full" type="text" id="dobDay" {...register("dobDay", {
                            pattern:{
                                value:/^[0-9]{2}$/,
                                message:"invalid date format - format to DD"
                            },
                            required:{
                                value:true,
                                message:"date (DD) is required"
                            }
                        })}></input>
                    </div>
                    <div className="text-xl text-light">/</div>
                    <div className="flex  w-12 flex-col relative">
                        <input onKeyUp={(e)=>monthCheck(e)} placeholder="MM" className="rounded-lg px-2 py-1 border-light border w-full " type="text" id="dobMonth" {...register("dobMonth", {
                            pattern:{
                                value:/^[0-9]{2}$/,
                                message:"invalid month format - MM"
                            },
                            required:{
                                value:true,
                                message:"month (MM) is required"
                            }
                        })}></input>
                    </div>
                    <div className="text-xl text-light">/</div>
                    <div className="flex w-16 flex-col relative">
                        <input placeholder="YYYY" className="rounded-lg px-2 py-1 border-light border w-full " type="text" id="dobYear" {...register("dobYear", {
                            pattern:{
                                value:/^[0-9]{4}$/,
                                message:"invalid year format - YYYY"
                            },
                            required:{
                                value:true,
                                message:"year (YYYY) is required"
                            },

                        })}></input>
                    </div>
                </section>
                <div>
                    <h5 className="text-red user-select-none pointer-events-none whitespace-nowrap">{errors.dobDay?.message}</h5>
                    <h5 className="text-red user-select-none pointer-events-none whitespace-nowrap">{errors.dobMonth?.message}</h5>
                    <h5 className="text-red user-select-none pointer-events-none whitespace-nowrap">{errors.dobYear?.message}</h5>
                </div>
            </fieldset>
            <fieldset className="flex gap-2 mt-6 ">
                <div className="flex flex-col relative justify-end w-fit">
                    <label className="absolute text-sm text-light" htmlFor="countryCode">&nbsp;</label>
                    <label className="absolute text-lg text-light left-2 top-[50%] translate-y-[calc(-50%)]">+</label>
                    <label className="absolute text-sm text-light top-[0%] translate-y-[-100%] whitespace-nowrap">Mobile Number</label>
                    <input className="rounded-lg px-2 py-1 border-light border w-16 pl-6" type="number" id="countryCode" {...register("countryCode", {
                        pattern:{
                            value:/^[0-9]{0,4}$/,
                            message:"invalid cc"
                        },
                    })}></input>
                    <h5 className="text-red absolute user-select-none pointer-events-none whitespace-nowrap top-[100%] ">{errors.countryCode?.message}</h5>
                </div>
                <div className="relative flex flex-1 flex-col">
                    <input className="rounded-lg px-2 py-1 border-light border w-full" type="number" id="mobileNumber" {...register("mobileNumber", {
                        pattern:{
                            value:/^[0-9]{10,15}$/,
                            message:"enter valid mobile number"
                        }
                    })}></input>
                    <h5 className="text-red absolute user-select-none pointer-events-none whitespace-nowrap top-[100%] ">{errors.mobileNumber?.message}</h5>
                </div>
            </fieldset>
            
            <fieldset className="flex flex-col" >
                <label className="text-sm text-light" htmlFor="password">Password*</label>
                <input className="rounded-lg px-2 py-1 border-light border w-full" type="password" id="password" {...register("password",{
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
                        <li key={index} className="text-sm text-red">{errorItem}</li>
                    )
                })}
            </fieldset>
            
            <fieldset className="flex flex-col" >
                <label className="text-sm text-light" htmlFor="confirmPassword">Confirm Password*</label>
                <input className="rounded-lg px-2 py-1 border-light border w-full" type="password" id="confirmPassword" {...register("confirmPassword",{
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
                        <li key={index} className="text-sm text-red">{errorItem}</li>
                    )
                })}
            </fieldset>
            <Button text='Sign-up' loading={submitLoading} />
        </form>
    )
}

