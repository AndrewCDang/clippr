import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(request:any) {
    const userDetails = await request.json()
    const supabase = createRouteHandlerClient({cookies})
    const session = await supabase.auth.getSession()
    const userId = session.data.session?.user.id
    console.log(userId)


    const {data,error} = await supabase.from('UserTable')
        .insert({
            id:userId,
            first_name:userDetails.user_metadata.firstName,
            last_name:userDetails.user_metadata.lastName,
            email: userDetails.email,
            dob: userDetails.user_metadata.dob,
            country_code: userDetails.user_metadata.countryCode || null,
            mobile_number: userDetails.user_metadata.mobileNumber || null,
        })
        .select()
        .single()
    
    if(data){
        console.log(data)
    }else{
        console.log(error)
    }

    return NextResponse.json({data,error})
}

