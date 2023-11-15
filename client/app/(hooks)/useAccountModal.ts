import { create } from 'zustand'

type Store = {
    accountIsOpen: boolean;
    accountOpen: () => void
    accountClose: () => void
}

export const useAccountModal = create<Store>((set)=>({
    accountIsOpen: false,
    accountOpen: () => set((state) => ({accountIsOpen:true })),
    accountClose: () => set((state) => ({accountIsOpen:false})),
}))

