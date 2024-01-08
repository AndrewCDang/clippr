"use client"

import React, { useEffect } from 'react'
import { Button } from '../(components)/button'
import { useState } from 'react'
import RestartSVG from '../(svg)/restartSVG'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const confirmCancel = async(id:string) => {
    const supabase =  createClientComponentClient()
    console.log(id)

    const {error} = await supabase.from('AppointmentsTable')
        .update({
            'cancelled':true,
            'upcoming':false
        })
        .eq('id',id)
    
    if(error){
        console.log(error)
        return({status:400,message:error})
    }else{
        return({status:200,message:'Appointment successfully cancelled'})
        
    }

}

type CancelType = {
    id:any
    text?:string
}

function CancelAppointment({id,text}:CancelType) {

    const [cancelState, setCancelState] = useState<boolean>(false)
    const router = useRouter()

    const cancelHandler = async(id:string)=> {
        const request = await confirmCancel(id)
        console.log(request)
        if(request.status == 200){
            router.refresh()
        }

    }

    const uncancel = () => {
        setCancelState(false)
    }

    const cancelToggle = () => {
        setCancelState(true)
    }

    const cancelBtns = [
        <Button  clicked={uncancel} key="no" text="No" variant={2} full={true} />,
        <Button clicked={()=>cancelHandler(id)} key="yes" text="Yes" borderColor='border-red' textColor='text-red' variant={2} full={true}/>
    ];

    return (
        <div className='w-full '>
            <div className='w-full flex gap-1'>
                {
                    cancelState ?
                    <div  key={1} className='flex gap-1 w-full relative'>
                        {cancelBtns.map((item)=>{
                            return (item)
                        })}
                    <h3 className={`${cancelState ? 'opacity-1':'opacity-0 '} text-red bg-white px-2 py-1 rounded-md border-[0.5px] border-light transition-all duration-300 absolute left-[50%] bottom-[-0.5rem] shadow-sm translate-y-[100%] -translate-x-[50%]`}>Are you sure you want to cancel?</h3>
                    </div>
                    :
                    <div className='' key={2}>
                        <Button clicked={cancelToggle} text={text || 'Cancel Appointment'} borderColor='border-red' textColor='text-red' variant={2}/>
                    </div>
                }
            </div>
            
        </div>
    )
}

export default CancelAppointment