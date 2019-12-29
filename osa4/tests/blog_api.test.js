const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.remove({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blog is identified with an id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
        expect(blog._id).not.toBeDefined()
    })
})

test('a valid blog can be posted', async () => {
    const newBlog = {
        title: "test",
        author: "testaaja",
        url: "testi.fi",
        likes: 100
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
})

test('succeeds when likes is not defined', async () => {
    const newBlog = {
        title: "test",
        author: "testaaja",
        url: "testi.fi",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('fails when title or url is not defined', async () => {
    const withoutTitle = {
        author: "testaaja",
        url: "testi.fi",
        likes: 100
    }

    const withoutUrl = {
        title: "test",
        author: "testaaja",
        likes: 100
    }

    await api
        .post('/api/blogs')
        .send(withoutTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(withoutUrl)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})