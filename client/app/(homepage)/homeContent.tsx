import HomeDefault from "./homeDefault"
import HomeSignIn from "./homeSignIn"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const HomeContent = async() => {
    const supabase = createRouteHandlerClient({cookies}).auth.getSession()
    const session = (await supabase).data.session?.access_token

    return(
        <>
        <h1>hello</h1>
            {session ? <HomeSignIn/> : <HomeDefault/>}
        </>
    )


}
export default HomeContent