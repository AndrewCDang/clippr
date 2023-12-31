"use client"
import { useLoadScript } from '@react-google-maps/api';
import { useGoogleLoaded } from './(hooks)/googleLoaded';
import { useEffect } from 'react';



const googleMapsLibraries = ["places"] as any;

function LoadGoogleMaps() {
    const {setGoogleLoaded} = useGoogleLoaded()

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_google_Maps_Api_Key || "",
        libraries: googleMapsLibraries,
    });

    useEffect(()=>{
        if(isLoaded){
            setGoogleLoaded()
        }
    },[isLoaded])

    return null;
}

export default LoadGoogleMaps;