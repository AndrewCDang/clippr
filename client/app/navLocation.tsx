"use client"

import { useCallback, useEffect, useRef, useState, useMemo } from "react"
import {useAppContext} from './Context/store'
import { StandaloneSearchBox, LoadScript, useLoadScript } from '@react-google-maps/api';
import  usePlacesAutocomplete, {
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
    formatUri: (input: string) => string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    inputRef: React.RefObject<HTMLInputElement>;
    navHeightToggle: (action: string) => void;
};


const googleMapsLibraries =["places"] as any;

const NavLocation:React.FC<NavPersonaliseProps> = ({locationOptionsRef, interactRef, setLocation, searchLocation, formatUri, setSearchLocation, inputRef, navHeightToggle}) => {
    const { state, dispatch } = useAppContext()


    const childHeight = useRef<HTMLDivElement | null>(null)

    interface PlacesAutocompleteProps {
        setLocation: React.Dispatch<React.SetStateAction<string>>;
    }

    const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setLocation }) => {

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

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

    const optionClickedRef = useRef(false)

    return (
        <Combobox>
            <input 
                key='inputLocation' 
                ref={inputRef} 
                // defaultValue={searchLocation}
                onChange={(e) => { setValue(e.target.value)}}  
                onBlur={(e)=>{
                    setTimeout(() => {
                        if(!optionClickedRef.current){
                            e.target.value !=='' ? setSearchLocation(e.target.value) : null;
                        }
                        // Reset the ref for the next interactions
                        optionClickedRef.current = false;
                    }, 0);
                }}
                className="w-[100%] border border-light-2 p-1 rounded-xl" 
                id="minute" 
                placeholder={searchLocation || 'Enter Location'} 
                type="text" 
            />
            <Combobox ref={locationOptionsRef} className="mt-2">
                <ComboboxList>
                    {status === 'OK' && data.map(({ place_id, description }) => <ComboboxOption className="border px-1 rounded border-light-2 mb-1 location-list" key={place_id} value={description} onMouseDown={e=>{ optionClickedRef.current = true;setSearchLocation(description);setTimeout(()=>{navHeightUpdate()},0)}} onTouchStart={e=>{optionClickedRef.current = true;setSearchLocation(description);setTimeout(()=>{navHeightUpdate()},0)}}/>)}
                </ComboboxList>
            </Combobox>
        </Combobox>
    );
}

    return (
    <div ref={childHeight} className="p-2 w-[90%] mx-auto">
            {state.googleLoaded ? <PlacesAutocomplete setLocation={setLocation} /> : null}
            {/* <input ref={inputRef} onChange={(e)=>{setLocation(formatUri(e.target.value));setSearchLocation(e.target.value)}}  className="w-[100%] border border-light-2 p-1 rounded-xl  " id="minute" placeholder="Enter Location" type="text"></input> */}

    </div>
    )
}

export default NavLocation

                {/* <ComboboxInput ref={inputRef} key='locationInput' className='border border-primary w-full p-2 rounded-xl' value={value} onChange={e => {setValue(e.target.value);heightCall()}}/> */}

{/* <input ref={inputRef} onChange={(e)=>{setLocation(formatUri(e.target.value));setSearchLocation(e.target.value)}}  className="w-[100%] border border-light-2 p-1 rounded-xl  " id="minute" placeholder="Enter Location" type="text"></input> */}
