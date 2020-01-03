const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const users = await User.find({})
  const user = users[0]
  const body = { ...request.body, user: user._id }
  const blog = new Blog(body)
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = Blog.findById(request.params.id)
    await blog.remove()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(blog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter