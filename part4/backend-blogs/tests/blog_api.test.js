const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "Hello, World!",
        author: "Kamran Rafi",
        url: null,
        likes: 9,
    },
    {
        title: "Hello, World!",
        author: "Hamza Malik",
        url: null,
        likes: 67,
    },
    {
        title: "Hello, World!",
        author: "Kamran Rafi",
        url: null,
        likes: 5,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let i = 0; i < initialBlogs.length; i++) {
        await new Blog(initialBlogs[i]).save()
    }
})

test('number of returned blogs are correct', async () => {
    const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    assert.strictEqual(result.body.length, initialBlogs.length)
})

test('the unique identifier property of blog object is id', async () => {
    const result = await api.get('/api/blogs')
    const idKey = Object.keys(result.body[0]).find(k => k === 'id')
    assert.strictEqual(idKey, 'id')
})

test('when a new blog is created database size is increased and created blog is returned', async () => {
    const newBlog = {
        title: "Hello, World!",
        author: "Kamran Rafi",
        url: 'https://example.com',
        likes: 9
    }

    const createdBlog = await api
                            .post('/api/blogs')
                            .send(newBlog)
                            .expect(201)
                            .expect('Content-Type', /application\/json/)

    let totalBlogs = await api.get('/api/blogs')
    totalBlogs = totalBlogs.body

    assert.strictEqual(totalBlogs.length, initialBlogs.length + 1)

    assert.deepStrictEqual(totalBlogs[initialBlogs.length], createdBlog.body)
})

test('if new blog misses likes property, then default it to zero likes', async () => {
    const newBlog = {
        title: "Hello, World!",
        author: "Danish Rafi",
        url: 'https://example.com',
    }

    const result = await api.post('/api/blogs').send(newBlog).expect(201)

    assert.strictEqual(result.body.likes, 0)
})

test('a blog is deleted', async () => {
    const blog = new Blog(initialBlogs[0])
    const savedBlog = await blog.save()
    const blogId = savedBlog._id.toString()
    await api.delete(`/api/blogs/${blogId}`).expect(204)
})

test('a blog likes count is incremented by one', async () => {
    const blog = new Blog(initialBlogs[0])
    const savedBlog = await blog.save()
    const blogId = savedBlog._id.toString()
    const result = await api
                            .put(`/api/blogs/${blogId}`)
                            .send({ ...initialBlogs[0], likes: initialBlogs[0].likes + 1 })
                            .expect(201)

    assert.strictEqual(result.body.likes, initialBlogs[0].likes + 1)
})

after(async () => {
    await mongoose.connection.close()
})