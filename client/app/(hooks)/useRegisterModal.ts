import { create } from 'zustand'

type Store = {
    registerIsOpen: boolean;
    registerOpen: () => void
    registerClose: () => void
}

export const useRegisterModal = create<Store>((set)=>({
    registerIsOpen: false,
    registerOpen: () => set((state) => ({registerIsOpen:true })),
    registerClose: () => set((state) => ({registerIsOpen:false})),
}))

