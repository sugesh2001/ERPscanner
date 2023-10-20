import React, { useState } from "react";
import "./EmployeeChart.css"; // Make sure to have a CSS file for styling

interface BarHeights {
  bar1: number;
  bar2: number;
  bar3: number;
}

function EmployeeChart() {
  const [barHeights, setBarHeights] = useState<BarHeights>({
    bar1: 0,
    bar2: 0,
    bar3: 0,
  });

  const increaseBarHeight = (barId: keyof BarHeights) => {
    setBarHeights((prevHeights) => ({
      ...prevHeights,
      [barId]: prevHeights[barId] + 30,
    }));
  };

  return (
    <div>
      <div className="chart-container">
        <div
          id="bar1"
          className="chart-bar"
          style={{ height: `${barHeights.bar1}px`, backgroundColor: "green" }}
        ></div>
        <div
          id="bar2"
          className="chart-bar"
          style={{ height: `${barHeights.bar2}px`, backgroundColor: "blue" }}
        ></div>
        <div
          id="bar3"
          className="chart-bar"
          style={{ height: `${barHeights.bar3}px`, backgroundColor: "red" }}
        ></div>
      </div>
      <div className="button-container">
        <button className="button" onClick={() => increaseBarHeight("bar1")}>
          Increase Bar 1
        </button>
        <button className="button" onClick={() => increaseBarHeight("bar2")}>
          Increase Bar 2
        </button>
        <button className="button" onClick={() => increaseBarHeight("bar3")}>
          Increase Bar 3
        </button>
      </div>
    </div>
  );
}

export default EmployeeChart;

