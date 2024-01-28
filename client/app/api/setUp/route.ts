import { User, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse  } from "next/server";
import { UserDetails } from "@/app/(auth)/setUp/setUpTypes";
import { AddressInterface } from "@/app/(auth)/setUp/setUpTypes";

export const dynamic = 'force-dynamic'

function findLatLng(obj:any, results = { lat: null, lng: null }) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
        findLatLng(obj[key],results);
        } else if (key === 'lat' || key === 'lng') {
        results[key] = obj[key];
        }
    }
    return results;
}

const getLatLng = async(userAddress:AddressInterface) => {
    const {addressline1,city,postcode} = userAddress

    try {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressline1}%${city}&${postcode}&key=${process.env.NEXT_PUBLIC_google_Maps_Api_Key}`)

        if(!res){
            console.log({status:500,message:'No response'})
        }

        const response = await res.json()
        const latLng = findLatLng(response)

        console.log(latLng)

        return(latLng)

    } catch (error) {
        console.log(error)
        return({lat:null,lng:null})
    }

}

export async function POST(request:{json:()=>Promise<UserDetails>} | any){
    try {
        const formData = await request.formData()
        const userDetails : UserDetails =  JSON.parse(formData.get('userDetails'))  as UserDetails
        const images = formData.getAll('imageUploads') as File[];
        const profilePicture = formData.getAll('profilePicture')

        // Get User Id
        const supabase = createRouteHandlerClient({ cookies});
        const { data: session } = await supabase.auth.getSession();

        const { data: userData, error} = await supabase
        .from('UserTable')
        .select()
        .eq('email', session.session?.user.email)
        .single();

        // Mark Set-up as true, set account type
        const { data: userTable, error: userError } = await supabase.from('UserTable').update(
            [{
                set_up:true,
                account_type:userDetails.accountType
            }]
        )
        .eq('email', session.session?.user.email)
        .select()
        .single()

        // get geolocation of provided address
        const geoLocation = await getLatLng(userDetails.userAddress) 

    
        const insertSupabase = async (userId: number) => {
            console.log(userDetails)
            console.log(userDetails.accountType)
            console.log(session)
            if (userDetails.accountType === 'barber') {
            const { data, error } = await supabase.from('BarberTable').insert([
                {
                email: session.session?.user.email,
                user_id: session.session?.user.id,
                city: userDetails.userAddress.city,
                user_address: userDetails.userAddress,
                barber_level: userDetails.barberLevel,
                ethnic_type: userDetails.ethnicType,
                service: userDetails.hairServices,
                appointment_location: userDetails.appointmentLocation,
                profile_url:`${userData.first_name}-${userData.last_name}-${userData.id.slice(0,8)}`,
                lat:geoLocation.lat,
                lng:geoLocation.lng
                },
            ])
            .select()
            .single()
            console.log(data)
            console.log(error)
            return { data, error };
            }else if(userDetails.accountType === 'customer') {
                const { data, error } = await supabase.from('CustomerTable').insert([
                    {
                    user_id: userId,
                    city: userDetails.userAddress.city,
                    user_address: userDetails.userAddress,
                    ethnic_type: userDetails.ethnicType,
                    },
                ])
                .select()
                .single()
                return { data, error };
            }


        };

        const uploadImages = async() => {
            // try {
            //     const results = [];
                
            //     console.log(images)
            //     for (const item of images) {
            //         console.log(item);
            //         const result = await uploadSupabase(item);
            //         results.push(result);
            //     }
            
            //     return { success: true, results };
            //         } catch (error) {
            //     return { success: false, error };
            // }
            try {
                const uploadPromises = images.map(item => uploadSupabase(item));
                const results = await Promise.all(uploadPromises);
        
                return { success: true, results };
            } catch (error) {
                return { success: false, error };
            }
        }

        const uploadSupabase = async(file:File) => {
            const {data,error} = await supabase
                .storage    
                .from('photos')
                .upload(`public/${session.session?.user.id.slice(1,8)}-${file.name}`, file)

            if (error) {
                console.error("Error uploading file:", error);
                return NextResponse.json({status: 500,Error:"Error uploading file:",statusText: error});

            } else {
                console.log("File uploaded successfully:", data);
                retrievePublicUrl(data.path)
            }

            return { data, error };
        }

        const uploadProfilePicture = async() => {
            const {data,error} = await supabase
                .storage    
                .from('photos')
                .upload(`profile/${session.session?.access_token.slice(1,8)}-${profilePicture[0].name}`, profilePicture[0])

                if (error) {
                    console.error("Error uploading file:", error);
                    return({Error:"Error uploading file:", error})
                } else {
                    console.log("File uploaded successfully:", data);
                    const img = retrievePublicUrl(data.path)
                    return(img)
            }

        }

        const retrievePublicUrl = async(path:string) => {
            try{
                const {data} = supabase 
                .storage
                .from('photos')
                .getPublicUrl(path)
                console.log(data.publicUrl)
                const setProfilePic  = await appendImageToDb(data.publicUrl)
                console.log(setProfilePic)

                return({response:data.publicUrl})
            }catch(error){
                return NextResponse.json({status: 500,statusText: error,response:'Error retrieving public url'});

            }
        }

        const appendImageToDb = async(url:string) => {
            console.log('appending start')

            if(!url.includes('/profile/')){
                const {data: selectData, error: selectError} = await supabase.from('BarberTable')
                    .select('images')
                    .eq('email', session.session?.user.email)
                    .single()

                try{
                    if(selectData && Array.isArray(selectData.images)){
                        const { data: updateData, error: updateError } = await supabase.from('BarberTable')
                        .update({ images: [...selectData.images, url] })
                        .eq('email', session.session?.user.email);
                        console.log(updateData)
                        return({Success:'Image appended to array',data:updateData})
                    }else{
                        const { data: updateData, error: updateError } = await supabase.from('BarberTable')
                        .update({ images: [url] })
                        .eq('email', session.session?.user.email);
                        console.log(updateData)
                        return({Success:'Image appended to array',data:updateData})
                    }

                }catch(error){
                    console.log(error)
                    return NextResponse.json({status: 500,statusText: error});
                }
            }else{
                try{
                    const { data: updateData, error: updateError } = await supabase.from('UserTable')
                    .update({ profilePicture: url })
                    .eq('email', session.session?.user.email)
                    .select()
                
                    return({status:200, success:'Profile picture updated',data:updateData})
                }catch(error){
                    console.log({error:error,message:'profile picture not updated'})
                    return NextResponse.json({status: 500,statusText: error});
                }
            }
        }
    
        let insertAccount
        let insertImage;
        let profilePic;
        if (userData) {
            insertAccount = await insertSupabase(userData.id);
            insertImage = await uploadImages()
            profilePic = await uploadProfilePicture()

        }
        return NextResponse.json({insertAccount,insertImage, profilePic});
        } catch (error) {
        return NextResponse.json({status: 500,statusText: error});
    }
}