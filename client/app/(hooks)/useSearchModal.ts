import { create } from 'zustand'

type Store = {
    searchIsOpen: boolean;
    externalClick: boolean;
    searchOpen: () => void;
    searchClose: () => void;
    setExternalTrue: () => void;
    setExternalFalse: () => void;
}

export const useSearchModal = create<Store>((set)=>({
    searchIsOpen:false,
    externalClick:true,
    searchOpen: () => set((state)=>({searchIsOpen:true})),
    searchClose: () => set((state)=>({searchIsOpen:false})),
    setExternalTrue: () => set((state)=>({externalClick:true})),
    setExternalFalse: () => set((state)=>({externalClick:false}))
}))