import { useState } from "react";

export default function EarningsChart() {
  const [range, setRange] = useState("weekly");

  const data = {
    weekly: [1200, 900, 1500, 1800, 1300, 1700, 2000],
    monthly: [8500, 9200, 7800, 10500],
    yearly: [95000, 112000, 125000]
  };

  const labels = {
    weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    monthly: ["Week 1", "Week 2", "Week 3", "Week 4"],
    yearly: ["2023", "2024", "2025"]
  };

  return (
    <div className="earnings-chart">
      <div className="chart-header">
        <h3>Earnings</h3>

        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="chart-bars">
        {data[range].map((value, index) => (
          <div key={index} className="bar-wrapper">
            <div
              className="bar"
              style={{ height: `${value / 1000 * 100}px` }}
            />
            <span>{labels[range][index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
