
import { useNavigate,useLocation } from "react-router-dom"
import { useEffect,useState } from "react"
import { getLesson, getNextLesson,addComment } from "../actions/lessonAction"
import { Button } from "@mui/material"
import { userCompleteLesson } from "../actions/userActions"
import { useAuthStore } from "../store/store"
const LessonPage = () => {

    const user = useAuthStore.getState().user
    const navigate = useNavigate()
    const location = useLocation().state
    const [lessonData,setLessonData] = useState(null)
    const [comment,setComment] = useState("")
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
            setLessonData(response.lessonPost)
            // console.log(response)
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

    return (
        <>
            <Button variant="contained" onClick={lessonComplete} disabled={isLessonCompleted}> Lesson Completed </Button>
            <Button variant="outlined" onClick={toNextLesson} disabled={disableNextLessonButton} > Next </Button>
            <Button variant="outlined" onClick={toPreviousLesson} disabled={disablePreviousLessonButton}> Previous </Button>
            <div dangerouslySetInnerHTML={{ __html: lessonData?.htmlContent }} />
            <div>
                <h1>Comments : </h1>
              {lessonData?.comments.map((comment)=>(
                <div style={{border:"1px solid "}}>
                    <p> {comment.userName} : {comment.comment}</p>
                </div>
              ))}  
               Write comment : <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} />
               <button onClick={submitComment}>Submit</button>
            </div>
        </>
    )
}

export default LessonPage