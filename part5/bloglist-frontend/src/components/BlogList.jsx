import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import { Link, useNavigate } from "react-router-dom"

const BlogList = (
    { blogs, filter, user, setFilter }
) => {
  return (
    <div>
      <h2>blogs</h2>
      <button onClick={() => setFilter(!filter)}>
        {filter ? "unsorted" : "sort by likes"}
      </button>
      {user && <p>
        {user.user.name} logged in
      </p>}
      <ul>
        {blogs.map((blog) => (
            <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
