import NavPersonalise from "./navPersonalise";
import NavLocation from "./navLocation";
import { useEffect, useState, useRef, Dispatch, SetStateAction, RefObject } from "react";
import { useRouter } from 'next/navigation'
import SearchSVG from "../(svg)/searchSVG";
import { useSearchParams } from 'next/navigation'
import { useSearchModal } from "../(hooks)/useSearchModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useLogIn } from "../(hooks)/useUserLogin";
import XSvg from "../(svg)/XSvg";


type NavSearchModalTypes = {
    menuRef: RefObject<HTMLElement>
    setModalToggle:React.Dispatch<SetStateAction<boolean>>;
    setNavPage:Dispatch<SetStateAction<number>>;
    navHeightToggle: (action:string)=>void;
    navPage:number;
    searchRef: RefObject<HTMLButtonElement>;
    navHeight:number;
    personaliseRef: RefObject<HTMLDivElement>;
    locationRef:RefObject<HTMLDivElement>;
    locationOptionsRef: RefObject<HTMLDivElement>
    
}

const fetchEthnicity = async() => {
    const supabase = createClientComponentClient()

    const {data:dataId, error:errorId} = (await supabase.auth.getSession())

    const id = dataId.session?.user.id

    const {data, error} = await supabase.from('CustomerTable')
        .select('ethnic_type')
        .eq('user_id',id)
        .single()

    if(data){
        return(data.ethnic_type)
    }else{
        return(null)
    }
}


    function NavSearchModal({menuRef, setModalToggle, setNavPage,navHeightToggle,navPage,searchRef,navHeight, personaliseRef,locationRef,locationOptionsRef}:NavSearchModalTypes) {
    const {isUserLoggedIn} = useLogIn()
    const {searchIsOpen, searchClose} = useSearchModal()
    const searchParams = useSearchParams()


    const router = useRouter()

    // Personalise states
    const [ethnicity, setEthnicity] = useState<string[]>([])
    const [experience, setExperience] = useState<string[]>([])
    const [barberLocation, setBarberLocation] = useState<string[]>(["Barber Shop", "Barber Home"])

    
    // Location States
    const [searchLocation, setSearchLocation] = useState('')
    const [placeholderSearch, setPlaceholderSearch] =useState<boolean>(false)
    const [placeholderLocation, setPlaceholderLocation] = useState<string>('')


    const [city, setCity, ] = useState<string>('')
    const [lat, setLat] = useState<number>()
    const [lng, setLng] = useState<number>()

    // Refs
    const interactRef = useRef<HTMLElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null >(null)
    
    // Search Link
    const updatePreferences = () => {
        const stringEth = ethnicity.join('_')
        const stringLoc = barberLocation.join('_')

        if(searchLocation.length>0 && city){
            const sort = searchParams.get('sort')
            router.push(`/discover/location/${city}?searchLocation=${searchLocation}&ethnicity=${stringEth}&barberLocation=${stringLoc}&lat=${lat}&lng=${lng}&sort=${sort ||'location'}`)
            setSearchLocation('')
        }else{
            setPlaceholderSearch(true)
        }
        if(!searchLocation){
            setNavPage(1)
            navHeightToggle('location')
        }else{
            searchClose()
        }

    }

    const xCloseModal = () => {
        setNavPage(0)
        searchClose()
    }

    // Searching for when user clicks search button without bluring selection beforehand
    useEffect(()=>{
        if(placeholderSearch){
            const stringEth = ethnicity.join('_')
            const stringLoc = barberLocation.join('_')
    
            if(placeholderSearch && placeholderLocation.length>0 && city && city.length>0 && lat && lng){
                const sort = searchParams.get('sort')
                router.push(`/discover/location/${city}?searchLocation=${placeholderLocation}&ethnicity=${stringEth}&barberLocation=${stringLoc}&lat=${lat}&lng=${lng}&sort=${sort ||'location'}`)
                setPlaceholderLocation('')
                setPlaceholderSearch(false)
                setSearchLocation('')
                setCity('')
                setLat(0)
                setLng(0)
                setNavPage(0)
                searchClose()

            }
        }

    },[placeholderSearch,placeholderLocation,city,lat,lng,searchLocation])

    // Getting default ethnicity states from account if logged in
    const getEthnciity = async()=> {
        const ethnicity = await fetchEthnicity()
        if(ethnicity){
            setEthnicity(ethnicity)
        }
    }

    useEffect(()=>{
        if(isUserLoggedIn){
            getEthnciity()
        }
    },[isUserLoggedIn])

    // Activate Search
    useEffect(()=>{
        const enterHandler = (e:KeyboardEvent) => {
            if (e.key === 'Enter') {
                inputRef.current?.blur()
            }
        }
        window.addEventListener('keydown', (e)=>{
            enterHandler(e)
        })
        return () => {
            window.removeEventListener('keydown', (e)=>{
                enterHandler(e)
            })
        }
    },[])

    // Transition on/off
    const [displayNone, setDisplayNone] = useState<boolean>(true)
    const [opacityOn, setOpacityOn]= useState<boolean>(true)


    const transitionHandler = () => {
        if(!searchIsOpen){
            setTimeout(()=>{
                setDisplayNone(true)
            },100)
        }
    }

    useEffect(()=>{
        if(searchIsOpen){
            setDisplayNone(false)
            setTimeout(()=>{
                navHeightToggle('personalise')
                setOpacityOn(true)
            },100)

        }
        else if(!searchIsOpen ){
            setOpacityOn(false)
        }
    },[searchIsOpen])

    const personaliseHeading = useRef<HTMLHeadingElement | null>(null)
    const locationHeading = useRef<HTMLHeadingElement | null>(null)

    const [personaliseWidth, setPersonaliseWidth] = useState<number>()
    const [locationWidth, setLocationWidth] = useState<number>()

    useEffect(()=>{
        if(!displayNone && personaliseHeading.current && locationHeading.current){
            setPersonaliseWidth((personaliseHeading.current as HTMLHeadingElement).offsetWidth)
            setLocationWidth((locationHeading.current as HTMLHeadingElement).offsetWidth)
        }

    },[displayNone, personaliseHeading,locationHeading])

    const clipPathStyle = navPage === 1 ? {clipPath: `inset(${0}px ${0}px ${0}px ${personaliseWidth}px round 8px)`} : {clipPath: `inset(${0}px ${locationWidth}px ${0}px ${0}px round 8px)`};
    const clipPathBorder = navPage === 1 ? {clipPath: `inset(${0}px ${0}px ${0}px ${(personaliseWidth as number)+16}px round 8px)`} : {clipPath: `inset(${0}px ${(locationWidth as number)+16}px ${0}px ${0}px round 8px)`};


    return (
    <section onTransitionEnd={transitionHandler} className={`${displayNone ? 'hidden' : ''}  ${opacityOn ? 'opacity-1' : 'opacity-0'} transition-all transition-600 fixed w-[100vw] h-[100dvh] bg-opacity-50 top-0 left-0 z-50  bg-secondary-f`}>
        <div className="w-full h-full relative">
            <section ref={menuRef} className={`${opacityOn ? 'translate-y-[0%]' : 'translate-y-[-4rem]'} transition-all transition-600 ease-in-out nav-menu-toggle border-primary-f rounded-2xl p-4 bg-white flex flex-col z-10 w-fit absolute top-[1rem] md:top-[4rem] [max-height:calc(100dvh_-_2rem)] left-[50%] translate-x-[-50%] `}>
                <span className='flex gap-2 md:gap-4 justify-evenly mb-4 items-center '>
                    <div className="relative flex gap-4 group">
                        <h3 ref={personaliseHeading} onClick={()=>{setNavPage(0);navHeightToggle('personalise');interactRef.current ? interactRef.current.scrollTop = 0 : null}} className={`${navPage === 0 ? 'nav-active' : null} border-primary-f/30 border-[1px] rounded-lg py-1 cursor-pointer h-fit px-2 text-secondary-f`}>Personalise</h3>
                        <h3 ref={locationHeading} onClick={()=>{setNavPage(1);navHeightToggle('location');interactRef.current ? interactRef.current.scrollTop = 0 : null;setTimeout(()=>{inputRef.current?.focus()},300)}} className={`${navPage === 1 ? 'nav-active' : null} border-primary-f/30 border-[1px] rounded-lg py-1 cursor-pointer h-fit px-2 text-secondary-f`}>Location</h3>
                        <div style={{
                            ...clipPathBorder,
                            transitionProperty:'clip-path', transitionDuration:'500ms', transitionTimingFunction:'ease-in-out'}} className={`absolute [z-index:-10] w-full translate-y-[-50%] top-[50%] border-primary-f border-[1px]`}>
                            <h3 className={`text-primary-f bg-primary-f h-8`}></h3>
                        </div>
                        <div style={{
                            ...clipPathStyle,
                            transitionProperty:'clip-path', transitionDuration:'500ms', transitionTimingFunction:'ease-in-out'}} className={`absolute flex gap-4 [z-index:20] pointer-events-none`}>
                            <h3 className="text-white px-2 border-[1px] border-primary/0 rounded-lg py-1">Personalise</h3>
                            <h3 className="text-white px-2 border-[1px] border-primary/0 rounded-lg py-1">Location</h3>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button ref={searchRef} onClick={()=>updatePreferences()} className="hover:scale-[96%] transition-scale duration-200">
                            <div className="flex gap-2 bg-light-3-f border-primary px-2 py-1 rounded-lg cursor-pointer">
                                <h4 className="w-fit text-primary-f">Search</h4>
                                <div className="fill-primary-f">
                                    <SearchSVG/>
                                </div>
                            </div>
                        </button>
                        <button onClick={()=>xCloseModal()} className='ml-1'>
                            <XSvg height={8} width={8} fill={'primary'} strokeWidth={12}/>
                        </button>
                    </div>
                </span>
                <section ref={interactRef} style={{overflowY: navPage === 0 ? 'scroll': 'hidden' , height:`${navHeight}px`, maxHeight:'680px', transition:'0.2s ease-in-out'}} className='nav-menu flex flex-row relative overflow-hidden '>
                    <div  ref={personaliseRef} style={{left:`${0 - (navPage)*100}%`, width:'100%', transition: 'all 0.2s ease-in-out ', margin: '0 auto', opacity: navPage === 0 ? 1 :0 }} className="absolute m" >
                        <NavPersonalise ethnicity={ethnicity} setEthnicity={setEthnicity} experience={experience} setExperience={setExperience} barberLocation={barberLocation} setBarberLocation={setBarberLocation}/>
                    </div>
                    <div ref={locationRef} style={{left:`${100 - (navPage)*100}%`, width:'100%', transition: 'all 0.2s ease-in-out', margin: '0 auto', opacity: navPage === 1 ? 1 :0 }} className="absolute m">
                        < NavLocation setModalToggle={setModalToggle} setPlaceholderLocation={setPlaceholderLocation}  locationOptionsRef={locationOptionsRef} interactRef={interactRef} navPage={navPage} setSearchLocation={setSearchLocation} searchLocation={searchLocation} inputRef={inputRef} setCity={setCity} setLat={setLat} setLng={setLng} ethnicity={ethnicity.join('_')} barberLocation={barberLocation.join('_')}   />
                    </div>
                </section>
            </section>
        </div>
    </section>
    )
}

export default NavSearchModal