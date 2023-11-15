import { create } from 'zustand'

type Store = {
    logInIsOpen: boolean;
    logInOpen: () => void
    logInClose: () => void
}

export const useLogInModal = create<Store>((set)=>({
    logInIsOpen: false,
    logInOpen: () => set((state) => ({logInIsOpen:true })),
    logInClose: () => set((state) => ({logInIsOpen:false})),
}))

