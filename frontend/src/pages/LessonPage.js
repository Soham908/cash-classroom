
import { useNavigate,useLocation } from "react-router-dom"
import { useEffect,useState } from "react"
import { getLesson } from "../actions/lessonAction"
import { Button } from "@mui/material"
import { userCompleteLesson } from "../actions/userActions"
import { useAuthStore } from "../store/store"
const LessonPage = () => {

    const user = useAuthStore.getState().user
    const navigate = useNavigate()
    const location = useLocation().state
    const [lessonData,setLessonData] = useState(null)
    const [lessonName,setLessonName] = useState(null)
    const [lessonId,setLessonId] = useState(null)
    const setStateUser = useAuthStore(state=>state.setUser)
    const isLessonCompleted = user?.data?.lessonsCompleted.some((lessonData)=>
    lessonData.lessonName === location.lesson
    )
    console.log(isLessonCompleted)
    
    useEffect(()=>{
        
        const fetchLesson = async() => {
            const response = await getLesson(location.lesson)
            setLessonData(response.lessonPost.htmlContent)
            setLessonName(response.lessonPost.lesson)
            setLessonId(response.lessonPost._id)
        }
        fetchLesson()
    },[])

    const lessonComplete = async () => {
        const response = await userCompleteLesson({lessonName, id : user.token, lessonId})
        localStorage.setItem("userData", JSON.stringify( {...user, data: response.response } ));
        setStateUser( {...user, data: response.response })
        navigate(`/courses/${location.course}`)
    }

    return (
        <>
            <Button variant="contained" onClick={lessonComplete} disabled={isLessonCompleted}> Lesson Completed </Button>
            <div dangerouslySetInnerHTML={{ __html: lessonData }} />
        </>
    )
}

export default LessonPage