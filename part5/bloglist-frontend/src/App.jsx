import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState(null);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();
  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

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

  const handleLogin = (postData) => {
    loginService
      .login(postData)
      .then((result) => {
        window.localStorage.setItem("loggedInUser", JSON.stringify(result));
        blogService.setToken(result.token);
        setUser(result);
        navigate("/");
      })
      .catch((error) => {
        console.log("Login: ", error);
        showNotification(error.response.data.error, true);
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  const newBlog = (blogObj) => {
    blogService
      .create(blogObj)
      .then((result) => {
        setBlogs(blogs.concat(result));
        setNotification({ text: `a new blog ${result.title} by ${result.author} was added`, type: "success" })
        navigate("/");
      })
      .catch((error) => {
        showNotification(error.response.data.error, true);
      });
  };

  const likeBlog = (blog) => {
    const blogToLike = { ...blog };
    blogToLike.likes = blogToLike.likes + 1;
    blogService
      .update(blogToLike.id, blogToLike)
      .then((result) => {
        setBlogs(blogs.map((b) => (b.id !== result.id ? b : result)));
      })
      .catch((error) => {
        showNotification(error.response.data.error, true);
      });
  };

  const deleteBlog = (blog) => {
    if (window.confirm(`delete blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog.id)
        .then((_) => {
          setBlogs(blogs.filter((b) => b.id !== blog.id));
          showNotification("blog deleted");
          navigate("/");
        })
        .catch((error) => {
          showNotification(error.response.data.error, true);
        });
    }
  };

  const margin = { margin: "4px" };

  const blogsToShow = filter
    ? [...blogs].sort((a, b) => a.likes < b.likes)
    : blogs;

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
           <Typography variant="h6" sx={{width: "100%"}}>
              My App
          </Typography>
          <div style={{display: "flex", gap: "8px"}}>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            {user && (
              <Button color="inherit" component={Link} to="/blogs/create">
                create
              </Button>
            )}
            {user ? (
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Notification notification={ notification } />

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogsToShow}
              filter={filter}
              setFilter={setFilter}
              newBlog={newBlog}
              deleteBlog={deleteBlog}
              user={user}
              likeBlog={likeBlog}
            />
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <Blog blog={blog} handleDelete={deleteBlog} handleLike={likeBlog} />
          }
        />
        <Route
          path="/blogs/create"
          element={<BlogForm createBlog={newBlog} />}
        />
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
      </Routes>
    </Container>
  );
};

export default App;
