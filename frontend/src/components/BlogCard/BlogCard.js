
import styles from "./blogCard.module.css"

const BlogCard = ({blog})=> {
    console.log(blog)
    return (
        <div className={styles.container}>
            <img src="/blog.avif" /> 
            <h1>{blog?.title}</h1>
            <div className={styles.details}>
                <span>{blog?.createdAt.slice(0,10)}</span>
                <br/>
                <span>{blog?.minRead} mins read</span>
            </div>
            <button>Read more</button>
        </div>
    )
}

export default BlogCard