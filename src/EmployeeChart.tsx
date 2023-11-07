// import React, { useState, useEffect } from "react";
// import "./EmployeeChart.css";
// import { useFrappeGetDocCount } from "frappe-react-sdk";

// function EmployeeChart() {
//   const [currentDate, setCurrentDate] = useState("");
//   const [inTimeCount, setInTimeCount] = useState(0);
//   const [outTimeCount, setOutTimeCount] = useState(0);

//   useEffect(() => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, "0");
//     const day = String(now.getDate()).padStart(2, "0");

//     const formattedDate = `${year}-${month}-${day}`;
//     setCurrentDate(formattedDate);
//   }, []);

//   const { data: inTimeData, error: inTimeError } = useFrappeGetDocCount(
//     "Attendance",
//     [
//       ["attendance_date", "=", currentDate],
//       ["location", "=", "Open Workspace - 1"],
//       ["in_time", "!=", ""],
//     ]
//   );

//   const { data: outTimeData, error: outTimeError } = useFrappeGetDocCount(
//     "Attendance",
//     [
//       ["attendance_date", "=", currentDate],
//       ["location", "=", "Open Workspace - 1"],
//       ["out_time", "!=", ""],
//     ]
//   );

//   useEffect(() => {
//     if (inTimeData) {
//       setInTimeCount(inTimeData);
//     }
//     if (outTimeData) {
//       setOutTimeCount(outTimeData);
//     }
//   }, [inTimeData, outTimeData]);

//   const insideOfficeCount = inTimeCount - outTimeCount;

//   const inTimeBarHeight = inTimeCount * 40;
//   const outTimeBarHeight = outTimeCount * 40;
//   const insideOfficeBarHeight = insideOfficeCount * 40;

//   return (
//     <div>
//       <div className="chart-container">
//         <div className="chart-bar">
//           <div className="bar-label">In Count {inTimeCount}</div>
//           <div
//             className="inner-bar"
//             style={{
//               height: `${inTimeBarHeight}px`,
//               backgroundColor: "green",
//             }}
//           ></div>
//         </div>
//         <div className="chart-bar">
//           <div className="bar-label">Out Count{outTimeCount}</div>
//           <div
//             className="inner-bar"
//             style={{
//               height: `${outTimeBarHeight}px`,
//               backgroundColor: "blue",
//             }}
//           ></div>
//         </div>
//         <div className="chart-bar">
//           <div className="bar-label">staying{insideOfficeCount}</div>
//           <div
//             className="inner-bar"
//             style={{
//               height: `${insideOfficeBarHeight}px`,
//               backgroundColor: "orange",
//             }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeChart;
import React, { useState, useEffect } from "react";
import "./EmployeeChart.css";
import { useFrappeGetDocCount } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
function EmployeeChart() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] =
    useState("Open Workspace - 1");

  const year = selectedDate.getFullYear();
  const month: any = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.getDate()).padStart(2, "0");

  const daysInMonth = new Date(year, month, 0).getDate();

  const startDate = `${year}-${month}-01`;
  const endDate = `${year}-${month}-${daysInMonth}`;

  const formattedStartDate = `${year}-${month}-01`;
  const formattedEndDate = `${year}-${month}-${daysInMonth}`;

  const { data: inTimeData, error: inTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", ">=", formattedStartDate],
      ["attendance_date", "<=", formattedEndDate],
      ["location", "=", selectedLocation],
      ["in_time", "!=", ""],
    ]
  );

  const { data: outTimeData, error: outTimeError } = useFrappeGetDocCount(
    "Attendance",
    [
      ["attendance_date", ">=", formattedStartDate],
      ["attendance_date", "<=", formattedEndDate],
      ["location", "=", selectedLocation],
      ["out_time", "!=", ""],
    ]
  );
  const navigate = useNavigate();

  const inTimeCount = inTimeData || 0;
  const outTimeCount = outTimeData || 0;
  const presentEmployeeCount = inTimeCount - outTimeCount;
  const employeeInBarHeight = inTimeCount > 0 ? inTimeCount * 10 : 0;
  const employeeOutBarHeight = outTimeCount > 0 ? outTimeCount * 10 : 0;
  const presentEmployeeBarHeight =
    presentEmployeeCount > 0 ? presentEmployeeCount * 10 : 0;

  return (
    <div>
      <div
        className="date-selector"
        style={{
          padding: "10px",
          gap: "5px",
          display: "flex",
          backgroundColor: "white",
          borderRadius: "10px",
          margin: "10px",
        }}
      >
        <label htmlFor="month">Select Month: </label>
        <select
          id="month"
          value={selectedDate.getMonth() + 1}
          onChange={(e) => {
            const newDate = new Date(selectedDate);
            newDate.setMonth(Number(e.target.value) - 1);
            setSelectedDate(newDate);
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(selectedDate.getFullYear(), i, 1)
                .toLocaleString("default", { month: "long" })
                .slice(0, 3)}
            </option>
          ))}
        </select>
        <label htmlFor="year">Select Year: </label>
        <select
          id="year"
          value={selectedDate.getFullYear()}
          onChange={(e) => {
            const newDate = new Date(selectedDate);
            newDate.setFullYear(Number(e.target.value));
            setSelectedDate(newDate);
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={selectedDate.getFullYear() - 5 + i}>
              {selectedDate.getFullYear() - 5 + i}
            </option>
          ))}
        </select>
        <label htmlFor="location">Select Location: </label>
        <select
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="Open Workspace - 1">Open Workspace - 1</option>
          <option value="Open Workspace - 2">Open Workspace - 2</option>
          <option value="Thaiyur">Thaiyur</option>
          {/* Add more location options as needed */}
        </select>
      </div>
      <div
        style={{
          width: "20%",
          padding: "10px",
          gap: "5px",
          display: "flex",
          backgroundColor: "white",
          borderRadius: "10px",
          margin: "10px",
        }}
        onClick={() => {
          navigate("/EmployeeChartDays");
        }}
      >
        Specfic Day
      </div>
      <div className="chart-container">
        <div className="chart-bar">
          <div className="bar-label">Employee In</div>
          <div
            className="inner-bar"
            style={{
              height: `${employeeInBarHeight}px`,
              backgroundColor: "green",
            }}
          >
            {employeeInBarHeight > 0 && <span>{inTimeCount}</span>}
          </div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">Employee Out</div>
          <div
            className="inner-bar"
            style={{
              height: `${employeeOutBarHeight}px`,
              backgroundColor: "blue",
            }}
          >
            {employeeOutBarHeight > 0 && <span>{outTimeCount}</span>}
          </div>
        </div>
        <div className="chart-bar">
          <div className="bar-label">Present Employee</div>
          <div
            className="inner-bar"
            style={{
              height: `${presentEmployeeBarHeight}px`,
              backgroundColor: "orange",
            }}
          >
            {presentEmployeeBarHeight > 0 && (
              <span>{presentEmployeeCount}</span>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/Securitylogin");
        }}
        style={{ margin: "10px" }}
      >
        Back
      </button>
    </div>
  );
}

export default EmployeeChart;
