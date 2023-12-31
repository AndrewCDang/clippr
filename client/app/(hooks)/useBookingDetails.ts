import { create } from 'zustand'

type Store = {
    bookingDetails: any;
    setBookingPageDetails: (bookingPage:any) => void
}

export const useBookingDetails = create<Store>((set)=>({
    bookingDetails: null,
    setBookingPageDetails: (bookingPage) => set({bookingDetails:bookingPage})
}))