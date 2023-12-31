import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PATCH(req: Request){
    const request = await req.json()

    const barberId = request.barberId
    if(!barberId){
        return NextResponse.json({status:400, message:'Barber Id not found'})
    
    }

    const supabase = createRouteHandlerClient({cookies})

    const {data, error} = await supabase.from('ReviewsTable')
    .select('*')
    .eq('barber_id',barberId)

    if(!data){
        return NextResponse.json({status:400, message:"Couldn't get Barber Data"})
    }

    console.log(data)
    const arrayRatings = data.map(data=> {return data.stars} )

    console.log(arrayRatings)
    const sum = arrayRatings.reduce((accumulator,currentValue)=>accumulator+currentValue,0)
    const average = sum/arrayRatings.length

    console.log(average)

    const { data:updateData, error: errorUpdate} = await supabase.from('BarberTable')
    .update({
        'reviews_stars': average
    })
    .eq('id',barberId)
    .select()

    console.log(updateData)

    if(errorUpdate){
        return NextResponse.json({status:400, message:"Error updating new average barber rating"})
    }

    return NextResponse.json({status:200, message:'Barber Rating successfully updated'})
}