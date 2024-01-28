import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"

// Checks if appointment has passed
const setPassed = async(item:any) => {
    const supabase = createRouteHandlerClient({ cookies })
    const {data, error} = await supabase.from('AppointmentsTable')
        .update(({
            upcoming: false,
        }))
        .eq('id',item.id)
        .select()
        .single()
    if(data){
        return data
    }
}

const updateAllPastAppointments = async(appointments:any[]) => {
    try{
        const updatePromises = appointments.map(item=>{return setPassed(item)})
        const results = await Promise.all(updatePromises)
        return results;

    }catch(error){
        console.error('Error updating appointments', error);
        throw error;
    }
}

export async function checkBarbers(userId:string){
    const supabase = createRouteHandlerClient({cookies})
    const {data,error} = await supabase.from('BarberTable')
    .select('AppointmentsTable(*)')
    .eq('user_id',userId)
    .filter('AppointmentsTable.upcoming', 'eq' ,true)
    .single()


    if(!data || error){
        return {status:500, error:error}
    }

    const newDate = new Date()

    // Series of checks done determining if appointment date/time has passed
    const pastAppointments = data.AppointmentsTable.filter((item)=>{
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
        }
    })

    const results = await updateAllPastAppointments(pastAppointments)

    if(data){
        return ({status:200, pastAppointments:results})
    }

}
