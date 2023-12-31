import { create } from 'zustand'
import { barberAppointmentTypes } from "../types/barberTypes"


type Store = {
    reviewIsOpen: boolean;
    appointment:barberAppointmentTypes|null;
    reviewOpen: () => void;
    reviewClose: () => void;
    setAppointment: (appointment:barberAppointmentTypes) => void;
}

export const useReviewModal = create<Store>((set)=>({
    reviewIsOpen: false,
    appointment: null,
    reviewOpen: () => set((state)=> ({reviewIsOpen:true})),
    reviewClose: () => set((state)=> ({reviewIsOpen:false})),
    setAppointment: (appointment:barberAppointmentTypes) => set((state)=>({appointment:appointment})),
}))