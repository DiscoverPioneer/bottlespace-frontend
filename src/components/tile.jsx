import React, { useEffect, useRef } from "react";
import "../App.css";
import "../Auth.css";
import { Chart } from "chart.js/auto";
import { Link } from "react-router-dom";
function Tile({ text, link }) {
  return (
    <div className="Tile">
      <Link to={link}>
        <div className="tile-text">{text}</div>
      </Link>
    </div>
  );
}

export default Tile;
