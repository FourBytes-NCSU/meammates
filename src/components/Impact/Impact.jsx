import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Impact.css";
import Header from "../Header/Header";
import "chart.js/auto";
import "chartjs-adapter-date-fns"; // Import the date adapter
import { Scatter, Line, Bar } from "react-chartjs-2";

const Impact = () => {
  const [data, setData] = useState(null);
  const [chartType, setChartType] = useState("scatter"); // Default chart type

  // Fetch data using Axios
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/order/daily-stats")
      .then((response) => {
        console.log("Fetched API data:", response.data); // Log API data to the console
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const prepareChartData = (xKey, yKey) => {
    return {
      labels: data.map((d) => d.date), // X-axis labels (dates)
      datasets: [
        {
          label: `${xKey} vs ${yKey}`,
          data: data.map((d) => ({
            x: new Date(d[xKey]).getTime(), // Convert date to timestamp for x-axis
            y: d[yKey], // Meals saved
          })),
          backgroundColor: "#ffaa00", // Set the background color
          borderColor: "#f27059", // Set the border color
          borderWidth: 1,
          fill: false,
        },
      ],
    };
  };

  if (!data) return <div>Loading...</div>;

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time", // Set x-axis type to 'time' to handle date-based data
        time: {
          unit: "day", // Set the unit for the x-axis to 'day'
          tooltipFormat: "ll", // Tooltip format for date
        },
        title: { display: true, text: "Date" },
      },
      y: { title: { display: true, text: "Meals Saved" } },
    },
    tooltips: { enabled: true },
  };

  const renderChart = (xKey, yKey) => {
    const chartData = prepareChartData(xKey, yKey);

    switch (chartType) {
      case "line":
        return <Line data={chartData} options={chartOptions} />;
      case "bar":
        return <Bar data={chartData} options={chartOptions} />;
      default:
        return <Scatter data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="section-container">
      <Header
        heading="Your Impact"
        details="See how your choices contribute to a world with less waste and more shared meals."
      />

      {/* Button group to select graph type */}
      <div className="head-btns">
        <button
          className={`btn ${
            chartType === "scatter" ? "btn-white" : "btn-transparent"
          }`}
          onClick={() => setChartType("scatter")}
        >
          <p className="btn-text">Scatter Plot</p>
        </button>
        <button
          className={`btn ${
            chartType === "line" ? "btn-white" : "btn-transparent"
          }`}
          onClick={() => setChartType("line")}
        >
          <p className="btn-text">Line Chart</p>
        </button>
        <button
          className={`btn ${
            chartType === "bar" ? "btn-white" : "btn-transparent"
          }`}
          onClick={() => setChartType("bar")}
        >
          <p className="btn-text">Bar Chart</p>
        </button>
      </div>

      {/* Chart rendering for Meals Saved vs Date */}
      <div className="chart-container">
        <h3>
          {chartType.charAt(0).toUpperCase() + chartType.slice(1)}: Meals Saved
          vs Date
        </h3>
        {renderChart("date", "meals_saved")}
      </div>
    </div>
  );
};

export default Impact;
