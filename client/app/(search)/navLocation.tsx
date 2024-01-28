"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useGoogleLoaded } from '../(hooks)/googleLoaded'
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

import  usePlacesAutocomplete, {
    getDetails,
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"

import {
    Combobox,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"

type NavPersonaliseProps = {
    locationOptionsRef: React.RefObject<HTMLDivElement>
    interactRef:React.RefObject<HTMLElement>
    setSearchLocation: React.Dispatch<React.SetStateAction<string>>;
    setPlaceholderLocation:React.Dispatch<React.SetStateAction<string>>;
    setModalToggle:React.Dispatch<React.SetStateAction<boolean>>;
    searchLocation: string;
    inputRef: React.RefObject<HTMLInputElement>;
    navPage:number;
    setLat:React.Dispatch<React.SetStateAction<number | undefined>>;
    setLng:React.Dispatch<React.SetStateAction<number | undefined>>;
    setCity:React.Dispatch<React.SetStateAction<string>>;
    ethnicity:string,
    barberLocation:string,
};

const NavLocation:React.FC<NavPersonaliseProps> = ({locationOptionsRef, setPlaceholderLocation, setModalToggle, navPage, interactRef, searchLocation, setSearchLocation, inputRef, setCity, setLat, setLng, ethnicity, barberLocation}) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const {googleLoaded} = useGoogleLoaded()

    const childHeight = useRef<HTMLDivElement | null>(null)

    var boundsUK = {
        north: 60.8,
        south: 49,
        west: -8,
        east: 1.7
    };

    const PlacesAutocomplete = () => {

    const {
        value,
        setValue,
        suggestions: { status, data },
        ready,
        clearSuggestions, 
    } = usePlacesAutocomplete(
        {
            requestOptions:{
                locationRestriction:boundsUK,
            }
        }
        
        );

    const [locationInteract, setLocationInteract ] = useState<boolean>(false)
    useEffect(()=>{
        setTimeout(()=>{
            if(locationInteract && inputRef.current?.value == '' && interactRef.current){
                interactRef.current.style.height = `${childHeight.current?.offsetHeight}px`
            }
            else if(data.length && interactRef.current){
                interactRef.current.style.height = `${childHeight.current?.offsetHeight}px`
                locationInteract === false ? setLocationInteract(true) : null
            }

        },10)

    },[data, interactRef, searchLocation])

    const navHeightUpdate = useCallback(() =>{
        if(interactRef.current){
            interactRef.current.style.height = `${childHeight.current?.offsetHeight}px`
        }
    },[data, interactRef, searchLocation, childHeight])

    const getCityName = async(id:string) => {
        const locationDetails = await getDetails({placeId:id,fields:["address_components"]}) as any
        for (const item of locationDetails.address_components){
            if(item.types.includes('postal_town')){
                setCity(item.long_name)
                return item.long_name
            }
        }
        for(const item of locationDetails.address_components.slice(1)){
            for(let key in item){
                if(key === 'long_name'){
                    return item[key]
                }
            }
        }
    }

    const getCity = async(id:string) => {

        const geoCode = await getGeocode({placeId:id})
        const {lat,lng} = getLatLng(geoCode[0])
        setLat(lat)
        setLng(lng)
        const cityName = await getCityName(id)
        setCity(cityName)
        setPlaceholderLocation(value)
                if(fetchSearch && cityName && lng && lat){
            if(inputRef.current){
                if(cityName && lat && lng){
                    const sort = searchParams.get('sort')
                    router.push(`/discover/location/${cityName}?searchLocation=${value}&ethnicity=${ethnicity}&barberLocation=${barberLocation}&lat=${lat}&lng=${lng}&sort=${sort ||'location'}`)
                }
                setModalToggle(true)
            }
        }

        // reset enter 'fetch' listener
        setFetchSearch(false)

    }


    const [entered, setEntered] = useState<boolean>(false)
    const [fetchSearch, setFetchSearch] = useState<boolean>(false)


    const resetHeight = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(interactRef.current && searchLocation !==e.target.value && navPage===1 ){
            interactRef.current.style.height = `${childHeight.current?.offsetHeight}px`
        }
    }

    const blurHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTimeout(()=>{
            setSearchLocation(e.target.value);
            setTimeout(()=>{
                resetHeight(e)
            },1000)
        },500)
    }

    const searchBarbersNav = (e: KeyboardEvent) => {
        if(inputRef.current){
            const isActive = inputRef.current === document.activeElement
            if(isActive && e.key == 'Enter'){
                setFetchSearch(true)
            }
        }
    }

    useEffect(()=>{
        if(data.length>0 && entered && inputRef.current){
            setEntered(false)
            getCity(data[0].place_id)
        }
    },[entered,data])

    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.addEventListener('keydown',searchBarbersNav)
            return() => {
                inputRef.current?.removeEventListener('keydown',searchBarbersNav)
            }
        }
    },[inputRef.current])


    return (
        <Combobox>
            <input 
                key='inputLocation' 
                ref={inputRef} 
                defaultValue={searchLocation}
                onChange={(e) => { setValue(e.target.value)}}  
                onBlur={(e)=>{setEntered(true);blurHandler(e)
                }}
                className="w-[100%] border border-light-2 p-1 rounded-xl text-black" 
                id="minute" 
                placeholder={searchLocation || 'Enter Location'} 
                type="text" 
                onFocus={()=>{setSearchLocation(''),setTimeout(()=>{inputRef.current?.focus()},0)}}
            />
            <Combobox ref={locationOptionsRef} className="mt-2">
                <ComboboxList>
                    {status === 'OK' && data.map(({ place_id, description }) => <ComboboxOption className="border px-1 rounded border-light-2-f mb-1 location-list text-secondary-f" key={place_id} value={description} onMouseDown={e=>{setSearchLocation(description);setTimeout(()=>{navHeightUpdate()},0);getCity(place_id)}} onTouchStart={e=>{setSearchLocation(description);setTimeout(()=>{navHeightUpdate()},0);getCity(place_id)}}/>)}
                </ComboboxList>
            </Combobox>
        </Combobox>
    );
}

    return (
    <div ref={childHeight} className="p-2 w-[90%] mx-auto">
            {googleLoaded ? <PlacesAutocomplete /> : null}
    </div>
    )
}

export default NavLocation