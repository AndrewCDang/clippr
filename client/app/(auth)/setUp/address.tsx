"use client"

import { useEffect } from "react";
import { useForm } from "react-hook-form";

type AddressProps={
    page:number;
    updateValidBarberPages:Function;
    appointmentLocation:string;
    updateAccountDetails:Function;
}

function Address({page, updateValidBarberPages,appointmentLocation, updateAccountDetails}:AddressProps) {
    type AddressInterface = {
        studio: string;
        addressline1: string;
        addressline2: string;
        addressline3: string;
        city: string;
        postcode: string;
    }

    const form = useForm<AddressInterface>({
        mode:"onChange"
    })

    const {register, formState, getValues, reset } = form;
    const { errors, isValid } = formState;

    const updateFormValues = () => {
        isValid ? (updateValidBarberPages(page,true)) : errors ? (updateValidBarberPages(page,false),console.log(errors)) : null
        isValid ? updateAccountDetails('userAddress',getValues()) : null
    }

    useEffect(()=>{
        if(appointmentLocation){
            updateValidBarberPages(page+1,false)
            reset()
        }

    },[appointmentLocation])

return (
    <form onKeyUp={()=>updateFormValues()} className="flex flex-col w-full gap-7 ">
        {appointmentLocation === 'Studio' ? <div className="flex flex-col place-self-center relative w-full max-w-[400px] mt-8">
            <input placeholder=" " className="peer/studio rounded-lg w-full px-2 py-2 border-light border" type="text" id="studio" {...register("studio",{
                pattern:{
                    value:/^[a-zA-Z0-9-\s]+$/,
                    message:"Invalid Address"
                },
                required:{
                    value:true,
                    message:'Enter name of Shop/Studio'
                }
            })}></input>
            <label className={`font-semibold user-select-none pointer-events-none text-sm absolute peer-focus/studio:translate-y-[-100%] peer-focus/studio:top-[0%] translate-y-[-100%] top-[0%] peer-placeholder-shown/studio:translate-y-[-50%] peer-placeholder-shown/studio:top-[50%]  transition-all duration-200 left-2 ${errors.studio?.message ? 'text-red' : 'text-light'}`} htmlFor="studio">{errors.studio?.message ? errors.studio?.message: 'Studio/Shop name*' }</label>
        </div>:null}
        <div className="flex flex-col place-self-center relative w-full max-w-[400px] mt-8">
            <input placeholder=" " className="peer/address1 rounded-lg w-full px-2 py-2 border-light border" type="text" id="address1" {...register("addressline1",{
                pattern:{
                    value:/^[a-zA-Z0-9-\s]+$/,
                    message:"Invalid Address"
                },
                required:{
                    value:true,
                    message:'Address line 1 is required'
                }
            })}></input>
            <label className={`font-semibold user-select-none pointer-events-none text-sm absolute peer-focus/address1:translate-y-[-100%] peer-focus/address1:top-[0%] translate-y-[-100%] top-[0%] peer-placeholder-shown/address1:translate-y-[-50%] peer-placeholder-shown/address1:top-[50%]  transition-all duration-200 left-2 ${errors.addressline1?.message ? 'text-red' : 'text-light'}`} htmlFor="address1">{errors.addressline1?.message ? errors.addressline1?.message: 'Address line 1*' }</label>
        </div>
        <div className="flex flex-col place-self-center relative w-full max-w-[400px]">
            <input placeholder=" " className="peer/address1 rounded-lg w-full px-2 py-2 border-light border" type="text" id="address2" {...register("addressline2",{
                pattern:{
                    value:/^[a-zA-Z0-9-\s]+$/,
                    message:"Invalid Address"
                }
            })}></input>
            <label className={`font-semibold user-select-none pointer-events-none text-sm absolute peer-focus/address1:translate-y-[-100%] peer-focus/address1:top-[0%] translate-y-[-100%] top-[0%] peer-placeholder-shown/address1:translate-y-[-50%] peer-placeholder-shown/address1:top-[50%]  transition-all duration-200 left-2 ${errors.addressline2?.message ? 'text-red' : 'text-light'}`} htmlFor="address1">{errors.addressline2?.message ? errors.addressline2?.message: 'Address line 2' }</label>
        </div>
        <div className="flex flex-col place-self-center relative w-full max-w-[400px]">
            <input placeholder=" " className="peer/address1 rounded-lg w-full px-2 py-2 border-light border" type="text" id="address3" {...register("addressline3",{
                pattern:{
                    value:/^[a-zA-Z0-9-\s]+$/,
                    message:"Invalid Address"
                }
            })}></input>
            <label className={`font-semibold user-select-none pointer-events-none text-sm absolute peer-focus/address1:translate-y-[-100%] peer-focus/address1:top-[0%] translate-y-[-100%] top-[0%] peer-placeholder-shown/address1:translate-y-[-50%] peer-placeholder-shown/address1:top-[50%]  transition-all duration-200 left-2 ${errors.addressline3?.message ? 'text-red' : 'text-light'}`} htmlFor="address1">{errors.addressline3?.message ? errors.addressline3?.message: 'Address line 3' }</label>
        </div>
        <div className="flex flex-col place-self-center relative w-full max-w-[400px] mt-8">
            <input placeholder=" " className="peer/address1 rounded-lg w-full px-2 py-2 border-light border" type="text" id="city" {...register("city",{
                pattern:{
                    value:/^[a-zA-Z0-9-\s]+$/,
                    message:"Invalid City"
                },
                required:{
                    value:true,
                    message:'City is required'
                }
            })}></input>
            <label className={`font-semibold user-select-none pointer-events-none text-sm absolute peer-focus/address1:translate-y-[-100%] peer-focus/address1:top-[0%] translate-y-[-100%] top-[0%] peer-placeholder-shown/address1:translate-y-[-50%] peer-placeholder-shown/address1:top-[50%]  transition-all duration-200 left-2 ${errors.city?.message ? 'text-red' : 'text-light'}`} htmlFor="address1">{errors.city?.message ? errors.city?.message: 'City*' }</label>
        </div>
        <div className="flex flex-col place-self-center relative w-full max-w-[400px]">
            <input placeholder=" " className="peer/address1 rounded-lg w-full px-2 py-2 border-light border" type="text" id="postcode" {...register("postcode",{
                pattern:{
                    value:/^[a-zA-Z0-9-\s]+$/,
                    message:"Invalid Address"
                },
                required:{
                    value:true,
                    message:'Post Code is required'
                }
            })}></input>
            <label className={`font-semibold user-select-none pointer-events-none text-sm absolute peer-focus/address1:translate-y-[-100%] peer-focus/address1:top-[0%] translate-y-[-100%] top-[0%] peer-placeholder-shown/address1:translate-y-[-50%] peer-placeholder-shown/address1:top-[50%]  transition-all duration-200 left-2 ${errors.postcode?.message ? 'text-red' : 'text-light'}`} htmlFor="address1">{errors.postcode?.message ? errors.postcode?.message: 'Post Code*' }</label>
        </div>
    </form>
)
}

export default Address