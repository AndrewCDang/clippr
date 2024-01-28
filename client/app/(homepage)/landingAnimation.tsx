"use client"
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react"
import { InView } from "react-intersection-observer"



function LandingAnimation({pageRef,setShowBarbers,setShowDeals,setShowPlaces, setShowLanding, showBarbers, showLanding, showPlaces, showDeals}:{pageRef:RefObject<HTMLElement>,setShowBarbers:Dispatch<SetStateAction<boolean>>,setShowDeals:Dispatch<SetStateAction<boolean>>,setShowPlaces:Dispatch<SetStateAction<boolean>>,setShowLanding:Dispatch<SetStateAction<boolean>>,showBarbers:boolean,showLanding:boolean, showDeals:boolean,showPlaces:boolean}) {
    const [scrollPercent, setScrollPercent] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const animateLanding = () => {
        const windowScroll = document.documentElement.scrollTop
        const scrollHeight = pageRef.current ? pageRef.current.offsetHeight - window.innerHeight + 322 : document.documentElement.offsetHeight + window.innerHeight + 322
        setScrollPercent(100 * windowScroll/scrollHeight)

    }

    useEffect(()=>{
        setLoaded(true)
        window.addEventListener('scroll',animateLanding)

        return () => {
            window.removeEventListener('scroll',animateLanding)
        }

    },[])

    const BarberCap = () => {
        return(
            <svg fill="url(#my-cool-gradient)" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 443 291">
                <linearGradient id="my-cool-gradient" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--main-col-light-3))" />
                    <stop offset="50%" stopColor="rgb(var(--main-col-light-2))" />
                    <stop offset="100%" stopColor="rgb(var(--main-col-light))" />
                </linearGradient>
                <path d="M421,200C421,89.54,331.46,0,221,0S21,89.54,21,200H12.28c-6.78,0-12.28,5.5-12.28,12.28v78.72H443v-78.72c0-6.78-5.5-12.28-12.28-12.28h-9.72Z"/>
            </svg>
        )
    }

    const landingHandler = (inView:boolean) => {
        if(inView){
            setShowLanding(true)
        }else{
            setShowLanding(false)
        }
    }

    const barberHandler = (inView:boolean) => {
        if(inView){
            setShowBarbers(true)
        }else{
            setShowBarbers(false)
        }
    }

    const placeHandler = (inView:boolean) => {
        if(inView){
            setShowPlaces(true)
        }else{
            setShowPlaces(false)
        }
    }

    const dealHandler = (inView:boolean) => {
        if(inView){
            setShowDeals(true)
        }else{
            setShowDeals(false)
        }
    }



    return (
        <section className="sticky top-[8rem] pb-[8rem] left-[50%] translate-x-[-100%] w-fit">
            <div style={{scale: loaded ? 1 : 0.8, opacity: loaded? 1 : 0, transition:'all 1s ease-in-out'}} className="w-fit relative">
                <div className="scale-x-[1.1] drop-shadow-lg">
                    <BarberCap/>
                </div>
                <div style={{height: !loaded ? '0px' : 'clamp(16rem, calc(12rem + 15vw), 28rem)', transition:'all 1s ease-in-out'}} className={`flex-col md:opacity-90 opacity-70 gap-2 overflow-hidden relative [width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] shadow-lg`}>
                    <div style={{top:`calc(-1% * ${scrollPercent*1.5} - 2rem)`, position:'absolute'}} className={``}>
                        <InView threshold={0.2} as='div' onChange={(inView)=>landingHandler(inView)}>
                            <div className={`${showLanding ? 'opacity-100' : 'opacity-40'} -skew-y-[16deg]`}>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2]  mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-10%] w-full" src="./clippr_barber1.jpg" alt="barber cutting hair"></img>
                                </div>
                            </div>
                        </InView>
                        <InView threshold={0.5} as='div' onChange={(inView)=>barberHandler(inView)}>
                            <div className={` ${showBarbers && !showLanding || showLanding ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300 -skew-y-[16deg] `}>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-10%] scale-[1.1]  w-full" src="./clippr_barber0.jpg" alt="barber cutting hair"></img>
                                </div>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-10%] scale-[1.1]  w-full" src="./clippr_barber2.jpg" alt="barber cutting hair"></img>
                                </div>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-20%]  w-full" src="./clippr_barber3.jpg" alt="barber cutting hair"></img>
                                </div>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-20%] scale-[1.2] w-full" src="./clippr_barber4.jpg" alt="barber cutting hair"></img>
                                </div>

                            </div>
                        </InView>
                        <InView threshold={0.4} as='div' onChange={(inView)=>placeHandler(inView)}>
                            <div className={`${showPlaces && !showBarbers && !showDeals ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300 -skew-y-[16deg]`}>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-10%] scale-[1.1]  w-full" src="./clippr_Barber_Shop.jpg" alt="barber cutting hair"></img>
                                </div>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-10%] scale-[1.1]  w-full" src="./clippr_Barber_Home.jpg" alt="barber cutting hair"></img>
                                </div>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-10%] scale-[1.1]  w-full" src="./clippr_cyclist.jpg" alt="barber cutting hair"></img>
                                </div>
                            </div>
                        </InView>
                        <InView threshold={0.2} as='div' onChange={(inView)=>dealHandler(inView)}>
                            <div className={`${showDeals ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300 -skew-y-[16deg]`}>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-10%] scale-[1.1]  w-full" src="./clippr_deal1.jpg" alt="barber cutting hair"></img>
                                </div>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-10%] scale-[1.1]  w-full" src="./clippr_deal2.jpg" alt="barber cutting hair"></img>
                                </div>
                                <div className="[width:_clamp(6rem,_calc(4rem_+_5vw),_10rem)] aspect-[3/2] mt-2 overflow-hidden">
                                    <img className="skew-y-[16deg] object-cover translate-y-[-10%] scale-[1.1]  w-full" src="./clippr_deal3.jpg" alt="barber cutting hair"></img>
                                </div>                                
                            </div>
                        </InView>
                    </div>
                </div>
                <div className="scale-y-[-1] scale-x-[1.1] drop-shadow-lg">
                    <BarberCap/>
                </div>
                <div className={`scale-x-[1.1] ${ loaded ? 'opacity-30' : 'opacity-0'} transition-opacity duration-[600ms] delay-[1600ms]`}>
                    <div className="[-webkit-mask-image:_linear-gradient(to_top,_transparent_5%,_black_85%)] [mask-image:_linear-gradient(to_top,_transparent_5%,_black_85%)]">
                        <BarberCap/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LandingAnimation