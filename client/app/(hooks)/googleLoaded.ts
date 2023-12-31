import { create } from "zustand";

type Store = {
    googleLoaded: boolean;
    setGoogleLoaded: () => void;
}

export const useGoogleLoaded = create<Store>((set) => ({
    googleLoaded : false,
    setGoogleLoaded: () => set((state) =>({googleLoaded:true}))
}))