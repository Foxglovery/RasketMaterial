import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../managers/authManager";
import { Button, TextField, FormControl, FormHelperText, Typography, Container } from "@mui/material";

export default function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h3" style={{ marginBottom: "1rem" }}>Login</Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => {
            setFailedLogin(false);
            setEmail(e.target.value);
          }}
          error={failedLogin}
          helperText={failedLogin ? "Login failed." : ""}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setFailedLogin(false);
            setPassword(e.target.value);
          }}
          error={failedLogin}
        />
        {failedLogin && <FormHelperText error>Login failed.</FormHelperText>}
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Login
      </Button>
      <Typography style={{ marginTop: "1rem" }}>
        Not signed up? Register <Link to="/register">here</Link>
      </Typography>
    </Container>
  );
}