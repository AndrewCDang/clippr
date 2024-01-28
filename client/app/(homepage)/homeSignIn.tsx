import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { HomeUserTypes} from "../types/barberTypes"
import CustomerSignIn from "./customerSignIn"
import BarberSignIn from "./barberSignIn"
import BarberCustomerSignIn from "./barberCustomerSignIn"

export const dynamic = 'force-dynamic'


async function getSession(){
    const supabase = createRouteHandlerClient({cookies})
    const {data, error} = await supabase.auth.getSession()

    if(data){
        return data
    }
}

async function getUser(userId: string): Promise<HomeUserTypes | null> {
    const supabase = createRouteHandlerClient({cookies})

    const {data, error} = await supabase.from('UserTable')
    .select('*, AppointmentsTable(*, BarberTable(*,UserTable("profilePicture","first_name", "last_name")))')
    .eq('id', userId)
    .filter('AppointmentsTable.upcoming', 'eq', true)
    .single()

    if(data){
        return data
    } else{
        return null
    }
}


const HomeSignIn = async() => {
    const session = await getSession()
    const userId = session?.session?.user.id as string

    const user = await getUser(userId)


    return(
        <section className="flex flex-col gap-2 w-full">
            {
                user && user.account_type === 'customer' && <CustomerSignIn user={user}/>
            }
            {
                user && user.account_type === 'barber' && <BarberCustomerSignIn BarberPage={<BarberSignIn user={user}/>}  CustomerPage={<CustomerSignIn user={user}/>}/>
            }
        </section>
    )
}
export default HomeSignIn