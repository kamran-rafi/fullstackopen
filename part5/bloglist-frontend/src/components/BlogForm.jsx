import { useState } from "react";
import { TextField, Button } from "@mui/material";

const BlogForm = ({createBlog}) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const newBlog = e => {
    e.preventDefault()
    createBlog({title, author, url})
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const margin = { margin: "8px" }

  return (
    <form onSubmit={newBlog}>
      <div style={margin}>
        <TextField 
          label="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div style={margin}>
        <TextField 
          label="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div style={margin}>
        <TextField 
          label="url"
          value={url} 
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div style={margin}>
        <Button type="submit" variant="contained">create</Button>
      </div>
    </form>
  );
};

export default BlogForm