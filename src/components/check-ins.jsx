import React, { useEffect, useRef } from "react";
import "../App.css";
import "../Auth.css";
import { Chart } from "chart.js/auto";
const setup_chart = (graph) => {
  if (graph["$chartjs"]) {
    return;
  }
  const data = [
    { month: 'Jan', count: 310 },
    { month: 'Feb', count: 400 },
    { month: 'Mar', count: 515 },
    { month: 'Apr', count: 425 },
    { month: 'May', count: 322 },
    { month: 'Jun', count: 530 },
    { month: 'July', count: 528 },
  ];
  let c = new Chart(graph, {
    type: "bar",
    data: {
      labels: data.map((row) => row.month),
      datasets: [
        {
          label: "avg per month",
          data: data.map((row) => row.count),
        },
      ],
    },
  });
  return c;
};
function CheckIns() {
  const barGraph = useRef(null);
  useEffect(() => {
    setup_chart(barGraph.current);
  }, []);
  return (
    <div className="CheckIns AppGraph">
      <canvas ref={barGraph}></canvas>
    </div>
  );
}

export default CheckIns;
