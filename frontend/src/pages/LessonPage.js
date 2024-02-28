
import { useParams,useNavigate,useLocation } from "react-router-dom"
import { useEffect,useState } from "react"
import { getLesson } from "../actions/lessonAction"
const LessonPage = () => {

    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation().state
    console.log(location.course)
    const [lessonData,setLessonData] = useState(null)

    useEffect(()=>{
        const fetchLesson = async() => {
            const response = await getLesson(location.lesson)
            setLessonData(response.lessonPost.htmlContent)
        }
        fetchLesson()
    },[])

    const lessonComplete = () => {
        navigate(`/courses/${location.course}`)

    }

    return (
        <>
            {/* {lessonData} */}
            <div dangerouslySetInnerHTML={{ __html: lessonData }} />
            <button onClick={lessonComplete}> Lesson Complete </button>
        </>
    )
}

export default LessonPage