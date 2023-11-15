import { create } from 'zustand'

type Store = {
    isUserLoggedIn:Boolean;
    logUserIn: () => void;
    logUserOut: () => void;
}

export const useLogIn = create<Store>((set)=>({
    isUserLoggedIn:false,
    logUserIn: () =>set((state)=>({isUserLoggedIn:true})),
    logUserOut: () =>set((state)=>({isUserLoggedIn:false}))

}))

