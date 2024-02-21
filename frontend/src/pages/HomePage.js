import { useEffect } from "react"
import { fetchCardData } from "../actions/dataFetchActions"

const HomePage = () => {

    useEffect(() => {
        const fetchData = async () => {
            await fetchCardData()
        }
        fetchData()
    }, [])

    return(
        <>
            <div>
            
            </div>
        </>
    )
}

export default HomePage