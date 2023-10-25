
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { locateContext } from "./App";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


export function WelcomePage() {
  const {
    setShowLabel,
  }: 
  any = useContext(locateContext);

  const navigate = useNavigate();
  const handleEntryClick = () => {
    setShowLabel(true);
    localStorage.setItem("isEntry", "true");
    navigate("/post");
  };
  const handleLogout = () => {
    localStorage.removeItem("isEntry"); // Remove the 'isEntry' flag to indicate logout
    navigate("/SecurityLogin"); // Navigate to the SecurityLogin page
  };

  const handleExitClick = () => {
    setShowLabel(false);
    localStorage.setItem("isEntry", "false");
    navigate("/post");

    
  };
 
  return (
    <div
      style={{
        backgroundColor: "white",

        width: "770px",
        height: "fit-content",
        borderRadius: "10px",
        padding: "5px",
        boxShadow: "0 0 20px rgba(8, 7, 16, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <img
          style={{
            width: "100px",
            height: "100px",
            marginTop: "10px",
            marginLeft: "0px",
          }}
          src=" https://agnikul.in/group-10.png"
        />

        <div>
          <h2
            style={{
              color: "#1F272E",
              marginLeft: "2px",
              marginTop: "-10px",
            }}
          >
            Welcome to Agnikul
          </h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          color: "black",
        }}
      >
        <div
          className="register"
          onClick={() => {
            handleEntryClick();
            navigate("/post");
            // window.location.reload();
          }}
          style={{
            backgroundColor: "white",
            boxShadow: "0 0 1px rgba(8, 7, 16, 0.6)",
            width: "350px",
            height: "250px",
            borderRadius: "10px",
            padding: "15px",
            display: "flex",
            justifyContent: "up",
            alignItems: "center",
            fontWeight: "700",
            fontSize: "20px",
            cursor: "pointer",
            flexDirection: "column",
            // backgroundImage: "url(/images/entry.jpeg)",
            // backgroundSize: "cover",
          }}
        >
          Entry
        </div>
        <div
          onClick={() => {
            handleExitClick();
            navigate("/post");
          }}
          style={{
            backgroundColor: "white",
            width: "350px",
            height: "250px",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0 0 1px rgba(8, 7, 16, 0.6)",
            display: "flex",
            justifyContent: "up",
            alignItems: "center",
            fontWeight: "700",
            fontSize: "20px",
            cursor: "pointer",
            flexDirection: "column",
            backgroundImage: "",
            backgroundSize: "cover",
          }}
        >
          Exit
        </div>
      </div>
      <div>
        {/* <button
          onClick={handleLogout}
          style={{
            margin: "80px 0", // Add margin to separate it from the content
            fontWeight: "700",
            fontSize: "20px",
            cursor: "pointer",
            marginBottom: "125px",
            boxShadow: "0 0 5px rgba(8, 7, 16, 0.6)",
            backgroundColor:"#237fb7",
            color:"white"
          }}
        >
          Security Logout
          
        </button> */}
         <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      </div>
    </div>
  );
}