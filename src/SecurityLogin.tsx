import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useFrappeAuth } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";

export const SecurityLogin = () => {
  const { currentUser, login, logout } = useFrappeAuth();
  const h2Styles = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    marginTop: "10px",
    // Other styles for h2
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(username, password);
    if (currentUser === "Administrator") {
      navigate("/WelcomePage");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Container maxWidth="xs">
      <div>
        <label
          className="label"
          style={{
            margin: "20px 0", // Add margin to create a gap at the top
            padding: "20px",
            height: "520px",
            width: "400px",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            borderRadius: "10px",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
            display: "flex",
            flexDirection: "column",
          }}
        ></label>
        <img
          src="https://agnikul.in/group-10.png"
          alt="Your Logo"
          className="logo"
          style={{ width: "100px", marginTop: "10px" }}
        />
        <h2 style={h2Styles}>Security Login</h2>
        <TextField
          label="Username"
          variant="outlined"
          style={{ width: "300px", marginTop: "50px" }}
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          style={{ width: "300px", marginTop: "40px" }} // Adjust the width as needed
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ width: "150px", marginTop: "50px" }}
          onClick={handleLogin}
        >
          Log In
        </Button>
      </div>
    </Container>
  );
};