import { headers } from 'next/headers'


export const checkAppointments = async() => {
    
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkAppointments`,{
            method:'PATCH',
            headers: headers()
        }

        )
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await res.json()
        if(!json.error){
            return json
        }else{
            console.log(json.error)
        }

    }catch(error){
        console.log(error)
    }
}