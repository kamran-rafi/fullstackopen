import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <p className="title">{blog.title}</p>
        <p className="author">{blog.author}</p>
      </div>
      <Togglable label="show">
        <div>
            <p className="url">{blog.url}</p>
            <p className="likes">{blog.likes} <button onClick={()=>handleLike(blog)}>like</button></p>
            <button onClick={()=>handleDelete(blog)}>delete</button>
          </div>
      </Togglable>
    </div>
  )
}

export default Blog