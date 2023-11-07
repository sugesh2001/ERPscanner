import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { locateContext } from "./App";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { ImageList, ImageListItem } from "@mui/material";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function parseTime(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

const ExitCheckBox = () => {
  const navigate = useNavigate();
  const {
    formDataCheckBox,
    setFormDataCheckBox,
    formDataLaptop,
    formDataEmployee,
    // currentDate,
    userFormImage,
    capturedImages,
  }: any = useContext(locateContext);

  const handleOtherTextChange = (e: any) => {
    const { value } = e.target;
    setFormDataCheckBox({
      ...formDataCheckBox,
      otherText: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Handle form submission here (e.g., send data to the server)
    console.log("Form submitted with data:", formDataCheckBox);
    console.log("itemsarray", itemsArray?.[0] === "");
    // handleCreateDoc();//callpandrom crete agurathuku
    handleUpdateDoc();
    handleUpdateConficatedItems();
    navigate("/ThankYouExit");
    setTimeout(() => {
      window.location.replace("/WelcomePage");
    }, 2000);
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  //update attendance

  const { updateDoc } = useFrappeUpdateDoc();
  const handleUpdateDoc = async () => {
    const outTime = getCurrentTime(); // Get the current time here
    const workingHoursInMinutes = calculateWorkingHours(inTime, outTime);
    const Attendanceupdate = {
      out_time: outTime,
      working_hours: workingHoursInMinutes,
    };
    try {
      await updateDoc(
        "Attendance",
        `${formDataEmployee.id}-${inTime}`,
        Attendanceupdate
      );
      console.log("Attendance Updated Successfully");
      console.log("Working Hours:", workingHoursInMinutes);
      console.log("inTime:", inTime);
      console.log("outTime:", outTime);
    } catch (error) {
      console.error("Error update doc......:", error);
    }
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function calculateWorkingHours(inTime: string, outTime: string): number {
    const inTimeDate = parseTime(inTime);
    const outTimeDate = parseTime(outTime);
    const timeDifferenceMs = outTimeDate.getTime() - inTimeDate.getTime();
    const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);
    return timeDifferenceMinutes / 60;
  }

  const { data }: any = useFrappeGetDocList("NewDoctypefromOld", {
    fields: [
      "carry",
      "imagelist6",
      "date",
      "location",
      "time",
      "image",
      "status",
    ],
    filters: [
      ["id", "=", formDataEmployee.id],
      ["date", "=", currentDate],
    ],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });

  console.log("ExitCheckBox", data);

  // const itemsArray = data?.map((item) => item.carry.split(", ")).flat();
  const itemsArray = data?.[0].carry.split(",");
  const [uncheckedlist, setUncheckedlist] = useState<any>([]);
  const [checkedlist, setCheckedlist] = useState<any>([]);
  const itemsArrayImage = data?.[0].imagelist6.split("|lak|") || [];
  useEffect(() => {
    if (data) {
      setUncheckedlist([...itemsArray]);
    }
  }, [data]);

  console.log(".........", itemsArray);
  // const Location = data?.[0].location;

  const handleUpdateConficatedItems = async () => {
    const checkedItems = Object.keys(formDataCheckBox).filter(
      (item) => formDataCheckBox[item]
    );

    const uncheckedItems = Object.keys(formDataCheckBox).filter(
      (item) => !formDataCheckBox[item]
    );

    const confiscatedupdate = {
      checked: checkedlist.join(","),
      unchecked: uncheckedlist.join(","),
      status: "Offline",
    };
    console.log("checked", checkedItems, uncheckedItems);
    try {
      await updateDoc(
        "NewDoctypefromOld",
        `${formDataEmployee.id}-${inTime}`,
        confiscatedupdate
      );
      console.log("update Successfully Entry");
    } catch (error) {
      console.error("Error updating doc......:", error);
    }
  };

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    if (!checked) {
      const index = uncheckedlist.indexOf(name);
      if (index !== -1) {
        const updatedUnchecked = [...uncheckedlist];
        const updatedChecked: any = [
          ...checkedlist,
          updatedUnchecked.splice(index, 1)[0],
        ];
        setUncheckedlist(updatedUnchecked);
        setCheckedlist(updatedChecked);
      }
    } else {
      const index = checkedlist.indexOf(name);
      if (index !== -1) {
        const updatedChecked: any = [...checkedlist];
        const updatedUnchecked = [
          ...uncheckedlist,
          updatedChecked.splice(index, 1)[0],
        ];
        setCheckedlist(updatedChecked);
        setUncheckedlist(updatedUnchecked);
      }
    }
  };

  console.log(".........", itemsArrayImage?.[0], itemsArrayImage);
  const Location = data?.[0].location;
  const inTime = data?.[0].time;

  const Carousel = ({ itemsArrayImage }: { itemsArrayImage: string[] }) => {
    const [index, setIndex] = useState(0);
    const move = (direction: String) => {
      if (direction === "next") {
        setIndex((index + 1) % itemsArrayImage.length);
      } else {
        setIndex((index - 1 + itemsArrayImage.length) % itemsArrayImage.length);
      }
    };

    useEffect(() => {
      const interval = setInterval(() => {
        move("next");
      }, 3000);

      return () => clearInterval(interval);
    }, [index]);

    return (
      <div
        className="container"
        style={{
          display: "flex",
          margin: "40px",
          borderRadius: "10px",
          boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
        }}
      >
        <Button onClick={() => move("previous")} className="overlay left">
          <ArrowCircleLeftIcon />
        </Button>
        <img
          style={{ height: "30vh", width: "40vw" }}
          src={itemsArrayImage[index]}
          alt={`item-${index}`}
          loading="lazy"
        />
        <div className="overlay indicator">
          {itemsArrayImage.map((item, i) => (
            <div key={i}></div>
          ))}
        </div>
        <Button onClick={() => move("next")} className="overlay right">
          <ArrowCircleRightIcon />
        </Button>
      </div>
    );
  };

  return (
    <>
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        {data?.[0].image ? (
          <img
            src={data?.[0].image}
            alt="laptop image"
            width="500"
            height="600"
          ></img>
        ) : (
          <></>
        )}
        {itemsArray?.length > 1 && <h2>Confiscated</h2>}

        {itemsArray?.length === 1 && itemsArray?.[0] === "" ? (
          <></>
        ) : (
          <Carousel itemsArrayImage={itemsArrayImage} />
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            {itemsArray?.length === 1 && itemsArray?.[0] === "" ? (
              <></>
            ) : (
              itemsArray?.map((item: any, index: any) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={formDataCheckBox[item]}
                      onChange={() =>
                        handleCheckboxChange({
                          target: {
                            name: item,
                            // checked: !formDataCheckBox[item],
                            checked: checkedlist.includes(item),
                          },
                        })
                      }
                      name={item}
                    />
                  }
                  label={item}
                />
              ))
            )}
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

          <div style={{ marginBottom: "10px" }}>
            <TextField
              label="Location"
              variant="outlined"
              name="name"
              value={Location}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Return
          </Button>
        </form>
      </Container>
    </>
  );
};

export default ExitCheckBox;
