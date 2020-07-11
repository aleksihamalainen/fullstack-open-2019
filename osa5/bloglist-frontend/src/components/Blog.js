import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, remove }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const incrementLikes = async () => {
    const selectedBlog = { ...blog, likes: likes + 1, user: blog.user.id };
    const updatedBlog = await blogService.update(selectedBlog);
    setLikes(updatedBlog.likes);
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      remove(blog);
    }
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button> <br />
        {blog.url} <br />
        likes {likes} <button onClick={incrementLikes}>like</button> <br />
        {blog.user === null || !blog.hasOwnProperty("user")
          ? "User not found"
          : blog.user.name}{" "}
        <br />
        {blog.user.username === user.username ? (
          <button onClick={deleteBlog}>remove</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Blog;
