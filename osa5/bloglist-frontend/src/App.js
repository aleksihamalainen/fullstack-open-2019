import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setErrorMessage(`A new blog ${title} by ${author} added`)
      setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    setTitle('')
    setAuthor('')
    setUrl('')
  } catch (exception) {
    setErrorMessage("Adding a new blogpost failed")
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage("Invalid username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
        <div>
          <h2>create new</h2>
          <form onSubmit={addBlog}>
            <div>
              title:
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({target}) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({target}) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
              type="text"
              value={url}
              name="Url"
              onChange={({target}) => setUrl(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
        </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App