import { create } from 'zustand'

type Store = {
    profilePicture:string | null;
    setProfilePicture: (profilePicture:string) => void;
}

export const useProfilePicture = create<Store>((set)=>({
    profilePicture:null,
    setProfilePicture: (profileUrl:string) =>set({profilePicture:profileUrl}),
}))

