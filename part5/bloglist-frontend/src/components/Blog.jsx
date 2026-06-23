import { Container, Paper, Typography, Link, Box, Button } from "@mui/material"

const Blog = ({ blog, handleLike, handleDelete }) => {

  if(!blog) return null

  return (
    <Container component={Paper} sx={{marginTop: "16px", padding: "8px"}}>
      <Typography variant="h4">{blog.title}</Typography>
      <Typography variant="subtle1" sx={{color: "gray", display: "block"}}>by {blog.author}</Typography>
      <Link to={blog.url}>{blog.url}</Link>
      {blog.userId && 
      <Typography variant="caption" sx={{color: "gray", display: "block"}}>added by {blog.userId.name}</Typography>}
      <Box sx={{display: "flex", gap: "8px", alignItems: "center"}}>
        <Typography variant="outline">{blog.likes} likes</Typography>
        <Button variant="outlined" onClick={()=>handleLike(blog)}>Like</Button>
        <Button variant="outlined" color="error" onClick={()=>handleDelete(blog)}>Delete</Button>
      </Box>
    </Container>
  )
}

export default Blog