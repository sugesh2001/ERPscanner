import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useFrappeAuth } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const SecurityLogin = () => {
  const { currentUser, login, logout } = useFrappeAuth();
  const h2Styles = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    marginTop: "10px",
    // Other styles for h2
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Clear previous error messages and close snackbar
    setSnackbarMessage("");
    setSnackbarOpen(false);
    //Validate the form fields
    if (!username.trim()) {
      setSnackbarMessage("please enter a username.");
      setSnackbarOpen(true);
      return;
    }

    if (!password.trim()) {
      setSnackbarMessage("Please enter a password.");
      setSnackbarOpen(true);
      return;
    }
    // If form fields are valid, proceed with login attempt
    setLoading(true);
    try {
      await login(username, password);
      if (currentUser === "Administrator") {
        navigate("/WelcomePage");
      } else {
        setSnackbarMessage("Invalid credentials. Please try again.");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      //Handle specific error cases if needed
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Handle specific error message from API response
        setSnackbarMessage(error.response.data.message);
      } else if (error.message) {
        // Handle other error messages from the error object
        setSnackbarMessage(error.message);
      } else {
        // Fallback message for unknown errors
        setSnackbarMessage(
          "An error occurred while logging in. Please try again later."
        );
      }
      setSnackbarOpen(true);
    } finally {
      // Hide loading indicator after login attempt

      setLoading(false);
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogout = () => {
    logout();
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
            backgroundColor: "#ffffff",
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
          type={showPassword ? "text" : "password"}
          variant="outlined"
          style={{ width: "300px", marginTop: "40px" }} // Adjust the width as needed
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ width: "150px", marginTop: "50px" }}
          onClick={handleLogin}
        >
          Log In
        </Button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading && <CircularProgress style={{ marginTop: "20px" }} />}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={10000} // Snackbar will close automatically after 6 seconds
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <SnackbarContent
              message={snackbarMessage}
              style={{ backgroundColor: "blue", color: "white" }} // Set the text color to white
            />
          </Snackbar>
        </div>
        <button
          onClick={() => {
            navigate("/Employeechart");
          }}
          style={{
            position: "absolute",
            bottom: "80px",
            right: "46.5%",

            padding: "10px",
            cursor: "pointer",
          }}
        >
          Employeechart
        </button>
      </div>
    </Container>
  );
};
