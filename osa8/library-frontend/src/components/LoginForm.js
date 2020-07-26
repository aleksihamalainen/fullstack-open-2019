import React, { useState, useEffect } from "react";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("books-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const handleLogin = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
    props.setPage("books");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            type="text"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
