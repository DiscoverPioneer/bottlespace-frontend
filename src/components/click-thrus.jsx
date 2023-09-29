import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "../Auth.css";
//import { Link } from "react-router-dom";
import { Chart, } from "chart.js/auto";
const setup_chart = (graph) => {
  if (graph["$chartjs"]) {
    return;
  }
  const data = {
    labels: ["Red", "Blue", "Yellow",],
    datasets: [
      {
        label: "Dataset 1",
        data: [80,70,60],
        backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
        ],
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
          display: true,
          text: "Chart.js Doughnut Chart",
        },
      },
    },
  };
  let c = new Chart(graph, config);
  return c;
};
function ClickThrus() {
  const [businessName, setBusinessName] = useState(null);
  const barGraph = useRef(null);
  useEffect(() => {
    /**
     * TODO: grab business info from api
     */
    setBusinessName(`"PDT" Please Don't Tell`);
    setup_chart(barGraph.current);
  }, []);
  return (
    <div className="ClickThrus">
      <canvas ref={barGraph}></canvas>
    </div>
  );
}

export default ClickThrus;
