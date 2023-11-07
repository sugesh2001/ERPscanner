import React, { useState, useEffect } from "react";
import "./EmployeeChart.css";
import { useFrappeGetDocCount } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";

export function EmployeeChartDays() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState("Open Workspace - 1"); // Added location state
  const [inTimeCount, setInTimeCount] = useState(0);
  const [outTimeCount, setOutTimeCount] = useState(0);

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
  };

  const { data: inTimeData, error: inTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", "=", selectedDate],
      ["location", "=", selectedLocation], // Use selected location
      ["in_time", "!=", ""],
    ]
  );

  const { data: outTimeData, error: outTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", "=", selectedDate],
      ["location", "=", selectedLocation], // Use selected location
      ["out_time", "!=", ""],
    ]
  );

  useEffect(() => {
    if (inTimeData) {
      setInTimeCount(inTimeData);
    }
    if (outTimeData) {
      setOutTimeCount(outTimeData);
    }
  }, [inTimeData, outTimeData]);

  const insideOfficeCount = inTimeCount - outTimeCount;

  const inTimeBarHeight = inTimeCount * 10;
  const outTimeBarHeight = outTimeCount * 10;
  const insideOfficeBarHeight = insideOfficeCount * 10;

  const navigate = useNavigate();

  return (
    <div>
      <div className="date-input">
        <form>
          <div className="date-input-field">
            <div
              style={{
                width: "90%",
                padding: "10px",
                gap: "5px",
                display: "flex",
                backgroundColor: "white",
                borderRadius: "10px",
                margin: "10px",
              }}
            >
              <label>
                Select Date:
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </label>
              <label>
                Select Location: {/* Added Location Dropdown */}
                <select
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <option value="Open Workspace - 1">Open Workspace - 1</option>
                  <option value="Open Workspace - 2">Open Workspace - 2</option>
                  <option value="Thaiyur">Thaiyur</option>
                  {/* Add more options as needed */}
                </select>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="chart-container">
        <div className="chart-bar">
          <div className="bar-label">In Count {inTimeCount}</div>
          <div
            className="inner-bar"
            style={{
              height: `${inTimeBarHeight}px`,
              backgroundColor: "green",
            }}
          ></div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">Out Count {outTimeCount}</div>
          <div
            className="inner-bar"
            style={{
              height: `${outTimeBarHeight}px`,
              backgroundColor: "blue",
            }}
          ></div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">Staying {insideOfficeCount}</div>
          <div
            className="inner-bar"
            style={{
              height: `${insideOfficeBarHeight}px`,
              backgroundColor: "orange",
            }}
          ></div>
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/EmployeeChart");
        }}
        style={{ margin: "10px" }}
      >
        Back
      </button>
    </div>
  );
}

export default EmployeeChartDays;
