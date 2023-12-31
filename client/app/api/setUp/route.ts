import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse  } from "next/server";
import { UserDetails } from "@/app/(auth)/setUp/setUpTypes";



export const dynamic = 'force-dynamic'

export async function POST(request:{json:()=>Promise<UserDetails>} | any){
    try {
        const formData = await request.formData()
        const userDetails =  JSON.parse(formData.get('userDetails'))
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

    
        const insertSupabase = async (userId: number) => {
            console.log(userDetails)
            console.log(userDetails.accountType)
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
                .upload(`public/${session.session?.access_token.slice(1,8)}-${file.name}`, file)

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
                appendImageToDb(data.publicUrl)

                return({response:data.publicUrl})
            }catch(error){
                return NextResponse.json({status: 500,statusText: error,response:'Error retrieving public url'});

            }
        }

        const appendImageToDb = async(url:string) => {

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
                const {data: selectData, error: selectError} = await supabase.from('UserTable')
                    .select('profilePicture')
                    .eq('email', session.session?.user.email)
                    .single()

                try{
                    const { data: updateData, error: updateError } = await supabase.from('UserTable')
                    .update({ profilePicture: url })
                    .eq('email', session.session?.user.email)
                    .select()
                
                    return({Success:'Image appended to array',data:updateData})
                }catch(error){
                    console.log(error)
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