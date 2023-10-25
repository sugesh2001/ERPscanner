import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { locateContext } from "./App";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { WebcamCapture } from "./WebCamCapture";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import StandardListImage from "./StandardListImage";

const LaptopDetails = () => {
  const { formDataLaptop, setFormDataLaptop,formDataEmployee }: any = useContext(locateContext);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormDataLaptop({
      ...formDataLaptop,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted with data:", formDataLaptop);
    navigate("/FormWithCheckbox");
  };

  const { data } = useFrappeGetDocList("Employee", {
    fields: ["laptop_serial", "laptop_brand"],
    filters: [["id", "=", formDataEmployee.id]],
    orderBy: {
      field: "creation",
      order: "desc",
    },
  });


  useEffect(() => {
    setFormDataLaptop({
      laptopSerialNumber: data?.[0].laptop_serial || "",
      laptopBrand: data?.[0].laptop_brand || "",
      laptopLocation: data?.[0].location || "",
      laptopImage: data?.[0].bio || "",
      Employee_Id: formDataEmployee.id,
    });
  }, [data]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          alignItems: "center",
        }}
      >
        <WebcamCapture />
        <StandardListImage />
      </div>
      <div>
        <TextField
          label="Laptop Brand"
          variant="outlined"
          name="laptopBrand"
          value={formDataLaptop.laptopBrand}
          onChange={handleChange}
           fullWidth
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <TextField
          label="Laptop Serial Number"
          variant="outlined"
          name="laptopSerialNumber"
          value={formDataLaptop.laptopSerialNumber}
          onChange={handleChange}
           fullWidth
        />
      </div>

      <FormControl fullWidth variant="outlined" style={{ marginTop: "1rem" }}>
  <InputLabel htmlFor="laptopLocation">Location</InputLabel>
  <Select
    label="Location"
    name="laptopLocation"
    value={formDataLaptop.laptopLocation}
    onChange={handleChange}
    fullWidth
    required // Add the required attribute to the Select component
  >
    <MenuItem value="">
      <em>Select Location</em>
    </MenuItem>
    <MenuItem value={"Open Workspace - 1"}>Open Workspace - 1</MenuItem>
    <MenuItem value={"Open Workspace - 2"}>Open Workspace - 2</MenuItem>
    <MenuItem value={"Thaiyur"}>Thaiyur</MenuItem>
  </Select>
</FormControl>
      
      <div style={{ marginTop: "1rem" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default LaptopDetails;