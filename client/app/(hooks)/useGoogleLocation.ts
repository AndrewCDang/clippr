import { create } from 'zustand'

type Store = {
    city:string|null;
    lat:number|null;
    lng:number|null;
    setCity: (cityName:string)=>void;
    setLat:(lat:number)=>void;
    setLng: (lng:number)=>void;
}

export const useGoogleLocation = create<Store>((set)=>({
    city:null,
    lat:null,
    lng:null,
    setCity: (city:string) => set((state)=>({city:city})),
    setLat: (lat) => set((state)=>({lat:lat})),
    setLng: (lng) => set((state)=>({lng:lng})),


}))
