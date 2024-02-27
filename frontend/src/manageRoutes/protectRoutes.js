
import {useAuthStore} from "./../store/store"
import { Navigate } from "react-router-dom"
export const PreventAuthFlow = ({children})=>{
    const user = useAuthStore.getState().user 
    if(user){
        return <Navigate to={"/dashboard"} replace={true}></Navigate>        
    }
    return children
}

export const SetStateProvider = ({children}) => {
    const setLocalUser = useAuthStore(state => state.setUserFromLocalStorage)
    if (localStorage.getItem('userToken')!== undefined) {
        setLocalUser((localStorage.getItem('userToken')))
    }
    return children
}

export const ProtectRoutes = ({children}) => {
    const user = useAuthStore.getState().user
    if(!user){
        return <Navigate to={"/"} replace={true}></Navigate> 
    }
    return children
}