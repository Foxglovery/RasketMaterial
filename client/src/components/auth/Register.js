import { useState } from "react";
import { register } from "../managers/authManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, FormControl, Typography, Container, Alert } from "@mui/material";

export default function Register({ setLoggedInUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [registrationFailure, setRegistrationFailure] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
      const newUser = {
        firstName,
        lastName,
        userName,
        email,
        address,
        password,
      };
      register(newUser).then((user) => {
        if (user) {
          setLoggedInUser(user);
          navigate("/");
        } else {
          setRegistrationFailure(true);
        }
      });
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h3" style={{ marginBottom: "1rem" }}>Sign Up</Typography>
      
      <FormControl fullWidth margin="normal">
        <TextField label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <TextField label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <TextField label="User Name" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <TextField label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormControl>
      
      <FormControl fullWidth margin="normal" error={passwordMismatch}>
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      
      <FormControl fullWidth margin="normal" error={passwordMismatch}>
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          helperText={passwordMismatch ? "Passwords do not match!" : ""}
        />
      </FormControl>
      
      {registrationFailure && (
        <Alert severity="error" style={{ margin: "1rem 0" }}>
          Registration Failure
        </Alert>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={passwordMismatch} style={{ marginTop: "1rem" }}>
        Register
      </Button>
      <Typography style={{ marginTop: "1rem" }}>
        Already signed up? Log in <Link to="/login">here</Link>
      </Typography>
    </Container>
  );
}