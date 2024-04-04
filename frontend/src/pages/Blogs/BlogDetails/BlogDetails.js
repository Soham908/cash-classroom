
import styles from "./blogDetails.module.css"
import { useParams } from "react-router-dom"
import {getBlogById} from "./../../../actions/blogActions"
import { useEffect,useState } from "react"

const BlogDetails = () => {
    const [blog,setBlog] = useState(null)
    const blogId = useParams().blogId
    useEffect(()=>{
        const fetchBlog = async() => {
            const response = await getBlogById(blogId)
            setBlog(response.blog)
        }
        fetchBlog()
    },[])    
    return (
        <div className={styles.container}>
            <h1>{blog?.title}</h1>
            {/* <h4>{blog?.summary}</h4>              */}
            {/* <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Curabitur blandit neque quam, sit amet mollis mi dapibus quis.
                  Aenean vel rutrum nunc. Integer enim quam, sollicitudin id suscipit eget, consectetur ut nulla.
                   Phasellus velit sapien, blandit eu sem id, tristique tempus dui. 
                   Vestibulum fringilla mattis mauris, ac dictum lacus viverra vel. Sed dapibus consectetur arcu, in congue eros auctor sed.
            </h4> */}
            <h4>{blog?.summary}</h4>
            <img src={"http://localhost:7000/images/" + blog?.img} alt="Blog Image"/>
            <p>{blog?.desc}</p>
            <hr />
        </div>
    )
}

export default BlogDetails