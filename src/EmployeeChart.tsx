import React, { useState, useEffect } from "react";
import "./EmployeeChart.css";
import { useFrappeGetDocCount } from "frappe-react-sdk";

function EmployeeChart() {
  const [currentDate, setCurrentDate] = useState("");
  const [inTimeCount, setInTimeCount] = useState(0);
  const [outTimeCount, setOutTimeCount] = useState(0);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  const { data: inTimeData, error: inTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", "=", currentDate],
      ["location", "=", "Open Workspace - 1"],
      ["in_time", "!=", ""]
    ]
  );

  const { data: outTimeData, error: outTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", "=", currentDate],
      ["location", "=", "Open Workspace - 1"],
      ["out_time", "!=", ""]
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

  const inTimeBarHeight = inTimeCount * 40;
  const outTimeBarHeight = outTimeCount * 40;
  const insideOfficeBarHeight = insideOfficeCount * 40;

  return (
    <div>
      <div className="chart-container">
        <div className="chart-bar">
          <div className="bar-label">In Count {inTimeCount}</div>
          <div
            className="inner-bar"
            style={{
              height: `${inTimeBarHeight}px`,
              backgroundColor: "green"
            }}
          ></div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">Out Count{outTimeCount}</div>
          <div
            className="inner-bar"
            style={{
              height: `${outTimeBarHeight}px`,
              backgroundColor: "blue"
            }}
          ></div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">staying{insideOfficeCount}</div>
          <div
            className="inner-bar"
            style={{
              height: `${insideOfficeBarHeight}px`,
              backgroundColor: "orange"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeChart;
