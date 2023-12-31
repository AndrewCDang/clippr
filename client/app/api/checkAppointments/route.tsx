import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server";
import { barberAppointmentTypes } from "@/app/types/barberTypes";

export async function PATCH(req: NextRequest, {params}:{params:any}){
    const supabase = createRouteHandlerClient({ cookies })
    const session = await supabase.auth.getSession()
    const userId = session.data.session?.user.id

    const {data,error} = await supabase.from('AppointmentsTable')
    .select()
    .eq('user_id',userId)
    .eq('upcoming', true)

    console.log(data?.length)

    const newDate = new Date()

    if(!data){
        return NextResponse.json({status:500,data:error})
    }
    else if(data.length==0){
        return NextResponse.json({status:200,data:null, message:'No appointments'})
    }

    // Checks if appointment has passed
    const setPassed = async(item:any) => {
        const {data, error} = await supabase.from('AppointmentsTable')
            .update(({
                upcoming: false,
            }))
            .eq('id',item.id)
            .select()
            .single()
        if(data){
            console.log(data)
            return data
        }
    }

    const updateAllPastAppointments = async(appointments:any[]) => {
        try{
            const updatePromises = appointments.map(item=>{return setPassed(item)})
            const results = await Promise.all(updatePromises)
            console.log(results)
            return results;

        }catch(error){
            console.error('Error updating appointments', error);
            throw error;
        }
    }

    let upcomingAppointments: barberAppointmentTypes[] = []

    const pastAppointments = data.filter((item)=>{
        const pastYear = +item.cut_date.split('-')[0] < newDate.getFullYear()
        const sameYear = +item.cut_date.split('-')[0] === newDate.getFullYear()
        const pastMonth = +item.cut_date.split('-')[1] < newDate.getMonth()+1
        const sameMonth = +item.cut_date.split('-')[1] === newDate.getMonth()+1
        const pastDay = +item.cut_date.split('-')[2] < newDate.getDate()
        const sameDay = +item.cut_date.split('-')[2] === newDate.getDate()
        const pastHour = +item.cut_time[0].split('-')[0].split(':')[0] < newDate.getHours()
        const sameHour = +item.cut_time[0].split('-')[0].split(':')[0] === newDate.getHours()
        const pastMin = +item.cut_time[0].split('-')[0].split(':')[1] < newDate.getMinutes()

        if(pastYear || pastMonth && sameYear || pastDay && sameMonth && sameYear ||pastHour && sameDay && sameMonth && sameYear || pastMin && sameHour && sameDay && sameMonth && sameYear){
            return(item)
        }else{
            upcomingAppointments.push(item)
        }
    })

    console.log(pastAppointments)

    const results = await updateAllPastAppointments(pastAppointments)

    if(data){
        return NextResponse.json({status:200,appointments:upcomingAppointments, pastAppointments:results})
    }else{
        return NextResponse.json({error:error})
    }


}

// https://jonmeyers.io/blog/forwarding-cookies-from-server-components-to-route-handlers-with-next-js-app-router