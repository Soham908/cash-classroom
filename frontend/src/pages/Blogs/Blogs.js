import { useEffect, useState } from "react"
import {getBlogs} from "../../actions/blogActions"
import BlogCard from "../../components/BlogCard/BlogCard"
import styles from "./blog.module.css"
const Blogs = () => {
    const [blogs,setBlogs] = useState([])
    
    useEffect(()=>{
        const fetchBlogs = async()=>{
            const response = await getBlogs()
            if(response.success){
                setBlogs(response.blogs)
            }
        }
        fetchBlogs()
    },[])

    return (
        <div className={styles.container}>
            {/* <h1>Blogs</h1>
            <div className={styles.heroBlog}>
                <BlogCard blog={blogs[0]} />
            </div> */}
            <div className={styles.remainingBlogsContainer}>
                {blogs.map((blog) => (
                    <BlogCard blog={blog} />
                ))}
            </div>
        </div>
    )
}

export default Blogs