//import { useState } from "react";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { locateContext } from "./App";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MultipleImageCapture } from "./MultipleImageCapture";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
const FormWithCheckbox: React.FC = () => {
  const navigate = useNavigate();
  const {
    formDataCheckBox,
    setFormDataCheckBox,
    formDataLaptop,
    formDataEmployee,
    // currentDate,
    userFormImage,
    capturedImages,
    successCount,
    setSuccessCount,
  }: any = useContext(locateContext);

 

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;

    if (name === "selectAll") {
      setFormDataCheckBox({
        ...formDataCheckBox,
        laptop: checked,
        pendrive: checked,
        hardDisk: checked,
        bluetooth: checked,
      });
    } else {
      setFormDataCheckBox({
        ...formDataCheckBox,
        [name]: checked,
      });
    }
  };

  const handleOtherTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormDataCheckBox({
      ...formDataCheckBox,
      otherText: value,
    });
  };

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Handle form submission here (e.g., send data to the server)
    console.log("Form submitted with data:", formDataCheckBox);
    handleCreateDoc();
    handleCreateAttendance();
    navigate("/ThankyouPage");
    setTimeout(() => {
      window.location.replace("/WelcomePage");
    }, 9000);
  };

  const { createDoc } = useFrappeCreateDoc();
  const {updateDoc}=useFrappeUpdateDoc();

  const handleCreateDoc = async () => {
    interface CapturedImage {
      id: number;
      imageSrc: string;
    }

    const formLaptop = {
      title: "d1", // Example title
      // name: userForm.user_name,
      laptop_serial: formDataLaptop.laptopSerialNumber,
      laptop_brand: formDataLaptop.laptopBrand,
      location: formDataLaptop.laptopLocation,
      user_name: formDataEmployee.name,
      id: formDataEmployee.id,
      time: getCurrentTime(),
      image: userFormImage.image,
      status:"Online",
      carry: Object.keys(formDataCheckBox)
        .filter((item) => item !== "otherText" && item !== "others" && formDataCheckBox[item])
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .concat(formDataCheckBox.others ? [formDataCheckBox.otherText] : [])
        .join(", "),
      date: currentDate,

      imagelist6: capturedImages
        .map((item: CapturedImage) => item.imageSrc)
        .join("|lak|"),
    };
    console.log("Capture", capturedImages);
    console.log("formLaptop", formLaptop);
    try {
      await createDoc("NewDoctypefromOld ", formLaptop);
      console.log("Created Successfully");
    } catch (error) {
      console.error("Error creating doc......:", error);
    }
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
    return () => {
      selectNone();
      };
  }, []);
 
  


//create docytype
  const handleCreateAttendance = async () => {
    const formAttendance = {
      title: "d1", // Example title
      // name: userForm.user_name,
        employee: formDataEmployee.id,
       employee_name: formDataEmployee.name,
      attendance_date: currentDate,
      in_time:getCurrentTime(),
       employee_id:formDataEmployee.id,
       location: formDataLaptop.laptopLocation,
    };
    console.log(currentDate);
    try {
      await createDoc("Attendance", formAttendance);
      console.log("Created Successfully attendance");
      setSuccessCount((prevCount: number) => prevCount + 1); // Increase count on successful creation

      console.log("count",successCount);
    } catch (error) {
      console.error("Error creating doc:", error);
    }
  };
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  const selectNone = () => {
    setFormDataCheckBox({
      laptop: false,
      pendrive: false,
      hardDisk: false,
      bluetooth: false,
      others: false,
      otherText: "",
    });
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <MultipleImageCapture />
      <h2>
        <b>Confiscated Items:</b>
      </h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  formDataCheckBox.laptop &&
                  formDataCheckBox.pendrive &&
                  formDataCheckBox.hardDisk &&
                  formDataCheckBox.bluetooth &&
                  formDataCheckBox.others
                }
                onChange={handleCheckboxChange}
                name="selectAll"
              />
            }
            label="Select All"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.laptop}
                onChange={handleCheckboxChange}
                name="laptop"
              />
            }
            label="Laptop"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.pendrive}
                onChange={handleCheckboxChange}
                name="pendrive"
              />
            }
            label="Pendrive"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.hardDisk}
                onChange={handleCheckboxChange}
                name="hardDisk"
              />
            }
            label="Hard Disk"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.bluetooth}
                onChange={handleCheckboxChange}
                name="bluetooth"
              />
            }
            label="Bluetooth"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formDataCheckBox.others}
                onChange={handleCheckboxChange}
                name="others"
              />
            }
            label="Others"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  !formDataCheckBox.laptop &&
                  !formDataCheckBox.pendrive &&
                  !formDataCheckBox.hardDisk &&
                  !formDataCheckBox.bluetooth &&
                  !formDataCheckBox.others
                }
                onChange={selectNone}
                name="none"
              />
            }
            label="None"
          />
        </FormGroup>

        {formDataCheckBox.others && (
          <TextField
            label="Other Items"
            variant="outlined"
            name="otherText"
            value={formDataCheckBox.otherText}
            onChange={handleOtherTextChange}
            fullWidth
            style={{ marginTop: "16px" }}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FormWithCheckbox;