import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { locateContext } from "./App";

const MyForm: React.FC = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { formDataEmployee, setFormDataEmployee}: any =
    useContext(locateContext);
  const showLabel = localStorage.getItem("isEntry") === "true";

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataEmployee({
      ...formDataEmployee,
      [name]: value,
    });
  };

  useEffect(() => {
    // Initialize the QR code scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 450,
          height: 450,
        },
        fps: 2,
      },
      true
    );

    // Define success and error handlers
    function success(result: string) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err: any) {
      console.warn(err);
    }

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  }, []);

  // Extract Employee ID and Name from the scan result
  const extractEmployeeInfo = (scanResult: string | null) => {
    if (!scanResult) return { id: "", name: "" };
    const parts = scanResult.split("/");
    const id = parts[1] || "";
    const name = parts[0] || "";
    //localstorage add pandrom
    //localStorage.formdata = JSON.stringify({ name: name, id: id });
    setFormDataEmployee({...formDataEmployee,name:name,id:id,})
    return { id, name };
  };

  const { id: Employee_Id, name: Employee_Name } =
    extractEmployeeInfo(scanResult);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inTime = getCurrentTime();

    


    console.log("Form submitted with data:", formDataEmployee);

    if (showLabel) {
      navigate("/LaptopDetails");
    } else {
      navigate("/ExitCheckBox");
    }
  };

  // Get the current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Get the current date
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);
  
  return scanResult ? (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <Typography style={{ marginBottom: "50px" }}>Employee Details</Typography>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={Employee_Name}
          onChange={handleInputChange}
          fullWidth
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          label="ID"
          variant="outlined"
          name="id"
          value={Employee_Id}
          onChange={handleInputChange}
          fullWidth
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          label={showLabel ? "In-Time" : "Out-Time"}
          variant="outlined"
          name={showLabel ? "inTime" : "outTime"}
          value={getCurrentTime()}
          onChange={handleInputChange}
          fullWidth
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
      >
        Next
      </Button>
    </form>
  ) : (
    <div className="scanner-container">
      <div id="reader" className="custom-reader"></div>
    </div>
  );
};

export default MyForm;