const blogsRouter = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')

const Blog = require('../models/blog')
const User = require('../models/user')
const { error } = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId')
  response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, async (request, response) => {

  const body = request.body

  if(!body.title || !body.url){
    return response.status(400).send({ error: 'invalid blog data' })
  }

  const user = await User.findById(request.user.id)
  if(!user){
    return response.status(401).json({ error: 'user does not exist' })
  }

  const blog = new Blog({
    ...body, likes: body.likes || 0, userId: user.id
  })

  const savedBlog = await blog.save()

  user.blogs.push(savedBlog._id)

  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).json({ error: 'blog not found.' })
  }

  blog.likes = request.body.likes || blog.likes

  const updatedBlog = await blog.save()

  response.status(201).json(updatedBlog)

})

blogsRouter.delete('/:id', tokenExtractor, async (request, response) => {
  const user = await User.findById(request.user.id)
  
  const blogToDelete = request.params.id

  const userHasBlog = user.blogs.find(b => b._id.toString() === blogToDelete)

  if(!userHasBlog){
    response.status(401).json({ error: 'you are not allowed to delete this blog.' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  user.blogs = user.blogs.filter(b => b._id.toString() !== blogToDelete)

  await user.save()

  response.status(204).end()
})

module.exports = blogsRouter