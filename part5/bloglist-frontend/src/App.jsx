import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const loggedInUser = JSON.parse(loggedInUserJson);
      blogService.setToken(loggedInUser.token);
      setUser(loggedInUser);
    }
  }, []);

  const showNotification = (msg, err = false) => {
    setNotification({ message: msg, error: err });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    loginService
      .login({ username, password })
      .then((result) => {
        window.localStorage.setItem("loggedInUser", JSON.stringify(result));
        blogService.setToken(result.token);
        setUser(result);
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.log("Login: ", error);
        showNotification(error.response.data.error, true);
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const newBlog = blogObj => {
    
    blogService
      .create(blogObj)
      .then((result) => {
        showNotification(`a new blog ${result.title} by ${result.author} added`);
        setBlogs(blogs.concat(result));
        
      })
      .catch((error) => {
        showNotification(error.response.data.error, true);
      });
  };

  const likeBlog = blog => {
    const blogToLike = { ...blog }
    blogToLike.likes = blogToLike.likes + 1
    blogService
      .update(blogToLike.id, blogToLike)
      .then(result => {
        setBlogs(blogs.map(b => b.id !== result.id ? b : result))
      })
      .catch(error => {
        showNotification(error.response.data.error, true);
      })
  }

  const deleteBlog = blog => {
    if(window.confirm(`delete blog ${blog.title} by ${blog.author}`)){
      blogService
        .remove(blog.id)
        .then(_ => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
          showNotification("blog deleted")
        })
        .catch(error => { 
          showNotification(error.response.data.error, true);
         })
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  const blogsToShow = filter
                      ? [...blogs].sort((a, b) => a.likes < b.likes)
                      : blogs 

  return (
    <div>
      <h2>blogs</h2>
      <button onClick={()=>setFilter(!filter)}>{filter ? "unsorted" : "sort by likes"}</button>
      <Notification notification={notification} />
      <p>
        {user.user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable label="create new blog">
        <BlogForm createBlog={newBlog} />
      </Togglable>
      {blogsToShow.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={likeBlog} handleDelete={deleteBlog} />
      ))}
    </div>
  );
};

export default App;
