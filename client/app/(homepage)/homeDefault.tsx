"use client"

import LandingAnimation from "./landingAnimation"
import { useRef, useState } from "react"
import { useSearchModal } from "../(hooks)/useSearchModal"


const HomeDefault = () => {
    const {searchOpen, setExternalTrue} = useSearchModal()
    const pageRef = useRef<HTMLElement>(null)
    const [showLanding, setShowLanding] =useState<boolean>(false)
    const [showBarbers, setShowBarbers] = useState<boolean>(false)
    const [showPlaces, setShowPlaces] = useState<boolean>(false)
    const [showDeals, setShowDeals] = useState<boolean>(false)

    const FindBtn = () => {
        return(
            <button onClick={()=>(setExternalTrue(),searchOpen())} className="self-end text-2xl font-semibold border-[2px] px-4 py-2 rounded-lg border-primary shadow-md mt-16 hover:scale-[0.98] transition-transform duration-100 ease-in-out">Find barbers</button>
        )
    }

    return(
        <section className="w-full">
            <section ref={pageRef} className="relative w-full h-[3000px] grid md:grid-cols-3 grid-cols-1 ">
                <div className=" md:relative absolute w-full h-full md:translate-y-[0px] translate-y-[-2rem]">
                    <LandingAnimation pageRef={pageRef} setShowBarbers={setShowBarbers} setShowLanding={setShowLanding} setShowPlaces={setShowPlaces} setShowDeals={setShowDeals} showBarbers={showBarbers} showLanding={showLanding} showDeals={showDeals} showPlaces={showPlaces}/>
                </div>
                <section className="relative h-full w-full col-span-2">
                    <section className="absolute w-full h-full left-0 top-0">
                        <div className="relative w-full h-full">
                            <section className={`sticky inset-0 w-fit h-fit flex flex-col ${showLanding ? 'md:top-[50%] top-[calc(60%_+_4rem)] left-0 translate-y-[-50%]': 'top-[0] translate-y-[-150%]'} ml-0 [transition:top_300ms,_transform_300ms]`}>
                                <h1 className="text-4xl [filter:drop-shadow(0px_0px_6px_rgba(256,256,256,0.8))]">Find your Perfect barber.</h1> 
                                <h2 className="md:text-light text-secondary">tailored to your unique style and ethnic hair type</h2>
                                <h2 className="md:text-light text-secondary md:mt-0 mt-1">hassle-free online bookings</h2>
                                <div className="self-end ">
                                    <FindBtn/>
                                </div>
                            </section>
                            <section className={`sticky inset-0 py-8 w-full h-fit ${showBarbers && !showLanding ? 'md:top-[50%] top-[65%] translate-y-[-50%]': 'top-[50%] translate-y-[-50%] right-0 translate-x-[calc(100%_+_12.5vw_+_2rem)]'} [margin:auto] [transition:top_300ms,_transform_300ms]`}>
                                <h1 className="text-4xl [filter:drop-shadow(0px_0px_6px_rgba(256,256,256,0.8))]">Highlighting the barber behind the barber shop.</h1>
                                <h2 className='md:text-light text-secondary'>read reviews about your personal barber, not just the shop.</h2>
                            </section>
                            <section className={`sticky inset-0 py-8  w-full h-fit ${showPlaces && !showBarbers && !showDeals ? 'md:top-[50%] top-[65%] translate-y-[-50%]': 'top-[50%] translate-y-[-50%] translate-x-[calc(100%_+_12.5vw_+_2rem)]'} [margin:auto] [transition:top_300ms,_transform_300ms]`}>
                                <h1 className="text-4xl [filter:drop-shadow(0px_0px_6px_rgba(256,256,256,0.8))]">Explore venues.</h1>
                                <h2 className="md:text-light text-secondary">book appointments at shops, barber homes, or your house.</h2>
                            </section>
                            <section className={`sticky inset-0 pb-32 py-8  w-fit h-fit flex flex-col ${showDeals ? 'md:top-[50%] top-[65%] translate-y-[-50%]': 'top-[100%] translate-y-[100%]'} ml-0 [transition:top_300ms,_transform_300ms]`}>
                                <h1 className="text-4xl [filter:drop-shadow(0px_0px_6px_rgba(256,256,256,0.8))]">Find awesome deals</h1>
                                <h2 className="md:text-light text-secondary">enjoy savings on weekly deals or monthly subscription plans set up by your barber</h2>
                                <FindBtn/>
                            </section>
                        </div>
                    </section>
                </section>
            </section>
        </section>
        
    )

}

export default HomeDefault