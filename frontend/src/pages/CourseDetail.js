import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getCourseDetails } from "../actions/courseActions"
import { ProtectRoutes } from "../manageRoutes/protectRoutes";
const CouseDetail = () => {
    const params = useParams()
    
    useEffect(()=>{
        const response = getCourseDetails(params.name).then(response => console.log(response))
        if(response.success){
            console.log(response)
        }
    },[])
    return (
        <>
                
        </>
    )
}

export default CouseDetail