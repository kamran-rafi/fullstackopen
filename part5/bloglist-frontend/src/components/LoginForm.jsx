import { useState } from "react";
import { TextField, Button } from "@mui/material";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
  };

  const margin = { margin: "8px" }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginUser}>
        <div style={margin}>
          <TextField
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={margin}>
          <TextField
            label="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div style={margin}>
          <Button type="submit" variant="contained">
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
