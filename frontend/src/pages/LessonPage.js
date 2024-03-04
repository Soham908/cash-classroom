
import { useNavigate,useLocation } from "react-router-dom"
import { useEffect,useState } from "react"
import { getLesson, getNextLesson } from "../actions/lessonAction"
import { Button } from "@mui/material"
import { userCompleteLesson } from "../actions/userActions"
import { useAuthStore } from "../store/store"
const LessonPage = () => {

    const user = useAuthStore.getState().user
    const navigate = useNavigate()
    const location = useLocation().state
    const [lessonData,setLessonData] = useState(null)
    const setStateUser = useAuthStore(state=>state.setUser)
    const numChapters = location.numChapters
    const [disableNextLessonButton, setDisableNextLessonButton] = useState(false)
    const [disablePreviousLessonButton, setDisablePreviousLessonButton] = useState(false)

    const isLessonCompleted = user?.data?.lessonsCompleted.some((lessonData)=>
    lessonData.lessonName === location.lesson
    )
    
    useEffect(()=>{
        const fetchLesson = async() => {
            const response = await getLesson(location.lesson)
            console.log(response)
            setLessonData(response.lessonPost)
        }
        fetchLesson()
    },[])

    useEffect(() => {
        if (lessonData?.order === 1) setDisablePreviousLessonButton(true)
        if (lessonData?.order === numChapters) setDisableNextLessonButton(true)  
        console.log(lessonData?.order === 1);
    }, [lessonData])
    
    const lessonComplete = async () => {
        const response = await userCompleteLesson({lessonName : lessonData.lesson, id : user.token, lessonId:lessonData._id})
        localStorage.setItem("userData", JSON.stringify( {...user, data: response.userObject } ));
        setStateUser( {...user, data: response.userObject })
        navigate(`/courses/${location.course}`)
    }

    const toNextLesson = async () => {
        if (lessonData.order >= 1) setDisablePreviousLessonButton(false)
        const response = await getNextLesson({ courseName : lessonData.course, nextLesson: lessonData.order + 1 })
        setLessonData(response.nextLesson)
        console.log(response);
    }

    const toPreviousLesson = async () => {
        if (lessonData.order <=  numChapters) setDisableNextLessonButton(false)
        const response = await getNextLesson({ courseName : lessonData.course, nextLesson: lessonData.order - 1 })
        setLessonData(response.nextLesson)
        console.log(response);
    }

    return (
        <>
            <Button variant="contained" onClick={lessonComplete} disabled={isLessonCompleted}> Lesson Completed </Button>
            <Button variant="outlined" onClick={toNextLesson} disabled={disableNextLessonButton} > Next </Button>
            <Button variant="outlined" onClick={toPreviousLesson} disabled={disablePreviousLessonButton}> Previous </Button>
            <div dangerouslySetInnerHTML={{ __html: lessonData?.htmlContent }} />
        </>
    )
}

export default LessonPage