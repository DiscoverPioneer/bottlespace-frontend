import React, { useEffect, useRef } from "react";
import "../App.css";
import "../Auth.css";
//import { Link } from "react-router-dom";
import { Chart, } from "chart.js/auto";
const setup_chart = (graph) => {
  if (graph["$chartjs"]) {
    return;
  }
  const data = {
    labels: ["Clicks", "Impression",],
    datasets: [
      {
        label: `Click Thru's`,
        data: [80,70,],
        backgroundColor: [
          '#165BAA',
          '#63ABFD',
        ],
        borderColor: '63ABFD',
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: "",
        },
      },
    },
  };
  let c = new Chart(graph, config);
  return c;
};
function ClickThrus() {
  const barGraph = useRef(null);
  useEffect(() => {
    setup_chart(barGraph.current);
  }, []);
  return (
    <div className="ClickThrus AppGraph">
      <canvas ref={barGraph}></canvas>
    </div>
  );
}

export default ClickThrus;
