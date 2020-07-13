import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

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
        <button id="viewButton" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button> <br />
        </div>
        <div>{blog.url} </div>
        <div id="likes">
          likes {likes} <button id="likeButton" onClick={incrementLikes}>like</button>{" "}
        </div>
        <div>{blog.user === null ? "User not found" : blog.user.name} </div>
        <div>
          {blog.user.username === user.username ? (
            <button id="deleteButton" onClick={deleteBlog}>remove</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Blog;
