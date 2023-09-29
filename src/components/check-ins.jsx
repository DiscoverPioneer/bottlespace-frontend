import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "../Auth.css";
//import { Link } from "react-router-dom";
import { Chart } from "chart.js/auto";
const setup_chart = (graph) => {
  if (graph["$chartjs"]) {
    return;
  }
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  let c = new Chart(graph, {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
  });
  return c;
};
function CheckIns() {
  const [businessName, setBusinessName] = useState(null);
  const [chart, setChart] = useState(null);
  const [drawGraph, setDrawGraph] = useState(true);
  const barGraph = useRef(null);
  useEffect(() => {
    /**
     * TODO: grab business info from api
     */
    setBusinessName(`"PDT" Please Don't Tell`);
    setChart(setup_chart(barGraph.current));
  }, []);
  return (
    <div className="CheckIns">
      <canvas ref={barGraph}></canvas>
    </div>
  );
}

export default CheckIns;
