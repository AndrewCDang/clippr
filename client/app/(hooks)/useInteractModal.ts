import { create } from 'zustand'
import { barberAppointmentTypes } from "../types/barberTypes"


type Store = {
    interactIsOpen: boolean;
    appointment:barberAppointmentTypes|null;
    interactOpen: () => void;
    interactClose: () => void;
    setAppointment: (appointment:barberAppointmentTypes) => void;
}

export const useInteractModal = create<Store>((set)=>({
    interactIsOpen: false,
    appointment: null,
    interactOpen: () => set((state)=> ({interactIsOpen:true})),
    interactClose: () => set((state)=> ({interactIsOpen:false})),
    setAppointment: (appointment:barberAppointmentTypes) => set((state)=>({appointment:appointment})),
}))