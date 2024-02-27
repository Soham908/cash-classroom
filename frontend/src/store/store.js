import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    user:undefined,
    setUser : (data) => set((state)=>({user:data})),
    setUserFromLocalStorage : (data) => set((state)=>({user:data}))
}))