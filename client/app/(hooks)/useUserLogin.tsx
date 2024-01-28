import { create } from 'zustand'

type Store = {
    isUserLoggedIn:Boolean;
    loggingIn: boolean;
    setLoggingIn: (condition:boolean) => void;
    logUserIn: () => void;
    logUserOut: () => void;
}

export const useLogIn = create<Store>((set)=>({
    isUserLoggedIn:false,
    loggingIn:false,
    setLoggingIn: (condition:boolean) =>set((state)=>({loggingIn:condition})),
    logUserIn: () =>set((state)=>({isUserLoggedIn:true})),
    logUserOut: () =>set((state)=>({isUserLoggedIn:false}))

}))

