"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useGoogleLoaded } from '../(hooks)/googleLoaded'
import { useGoogleLocation } from "../(hooks)/useGoogleLocation"
import { useRouter } from "next/navigation"



import  usePlacesAutocomplete, {
    getDetails,
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"


type NavPersonaliseProps = {
    locationOptionsRef: React.RefObject<HTMLDivElement>
    interactRef:React.RefObject<HTMLElement>
    setSearchLocation: React.Dispatch<React.SetStateAction<string>>;
    searchLocation: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    inputRef: React.RefObject<HTMLInputElement>;
    navPage:number;
};

const NavLocation:React.FC<NavPersonaliseProps> = ({locationOptionsRef, navPage, interactRef, setLocation, searchLocation, setSearchLocation, inputRef}) => {
    const router = useRouter()
    const {googleLoaded} = useGoogleLoaded()
    const {setCity, setLat, setLng, city, lat, lng} = useGoogleLocation()

    const childHeight = useRef<HTMLDivElement | null>(null)

    interface PlacesAutocompleteProps {
        setLocation: React.Dispatch<React.SetStateAction<string>>;
    }

    var boundsUK = {
        north: 60.8,
        south: 49,
        west: -8,
        east: 1.7
    };

    const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setLocation }) => {

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions, 
    } = usePlacesAutocomplete(
        {
            requestOptions:{
                locationRestriction:boundsUK,
                // locationBias:"IP_BIAS"
            
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
                // console.log(data)
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
    }

    const getCity = async(id:string) => {

        const geoCode = await getGeocode({placeId:id})
        const {lat,lng} = getLatLng(geoCode[0])
        setLat(lat)
        setLng(lng)
        const cityName = await getCityName(id)

        if(fetchSearch && cityName && lng && lat){
            if(inputRef.current){
                if(cityName && lat && lng){
                    router.push(`/discover/location/${cityName}?lat=${lat}&lng=${lng}`)
                }
            }
        }

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
                className="w-[100%] border border-light-2 p-1 rounded-xl" 
                id="minute" 
                placeholder={searchLocation || 'Enter Location'} 
                type="text" 
            />
            <Combobox ref={locationOptionsRef} className="mt-2">
                <ComboboxList>
                    {status === 'OK' && data.map(({ place_id, description }) => <ComboboxOption className="border px-1 rounded border-light-2 mb-1 location-list" key={place_id} value={description} onMouseDown={e=>{setSearchLocation(description);setTimeout(()=>{navHeightUpdate()},0);getCity(place_id)}} onTouchStart={e=>{setSearchLocation(description);setTimeout(()=>{navHeightUpdate()},0)}}/>)}
                </ComboboxList>
            </Combobox>
        </Combobox>
    );
}

    return (
    <div ref={childHeight} className="p-2 w-[90%] mx-auto">
            {googleLoaded ? <PlacesAutocomplete setLocation={setLocation} /> : null}
    </div>
    )
}

export default NavLocation