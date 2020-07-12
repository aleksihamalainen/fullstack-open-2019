import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    author: 'test author',
    title: 'test title',
    url: 'test url',
    user: {
      username: 'test username',
      name: 'test name',
      id: '123'
    },
    likes: 0
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={blog.user} remove={() => console.log('remove')}/>
    )
  })

  test('at start the blog component renders only title and author', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('url and likes are shown after clicking the view button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})