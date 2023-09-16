"use client"
import { useLoadScript } from '@react-google-maps/api';
import { useAppContext } from './Context/store'
import { useEffect } from 'react';
const googleMapsLibraries = ["places"] as any;

function LoadGoogleMaps() {
    const { state, dispatch } = useAppContext()

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_google_Maps_Api_Key || "",
        libraries: googleMapsLibraries,
    });

    useEffect(()=>{
        if(isLoaded){
            dispatch({type:'google', payload:true})
        }
    },[isLoaded])
    return null;
}

export default LoadGoogleMaps;