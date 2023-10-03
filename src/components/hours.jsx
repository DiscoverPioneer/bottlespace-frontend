import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";

function Hours() {
  const [sunday,setSunday] = useState('5:00PM-2:00AM');
  const [monday,setMonday] = useState('5:00PM-2:00AM');
  const [tuesday,setTuesday] = useState('5:00PM-2:00AM');
  const [wednesday,setWednesday] = useState('5:00PM-2:00AM');
  const [thursday,setThursday] = useState('5:00PM-2:00AM');
  const [friday,setFriday] = useState('5:00PM-2:00AM');
  const [saturday,setSaturday] = useState('5:00PM-2:00AM');
  useEffect(() => {
    /**
     * TODO: grab all these from the API
     */
    setSunday('5:00PM-2:00AM');
    setMonday('5:00PM-2:00AM');
    setTuesday('5:00PM-2:00AM');
    setWednesday('5:00PM-2:00AM');
    setThursday('5:00PM-2:00AM');
    setFriday('5:00PM-2:00AM');
    setSaturday('5:00PM-2:00AM');
  }, []);
  return (
    <div className="Hours InlineSection">
      <div className="header">
        <h1 className="section-title">Hours</h1>
      </div>
      <div className="content">
        <div className="record">
          <div className="field-name">SUN</div>
          <div className="field-value">{sunday}</div>
        </div>
        <div className="record">
          <div className="field-name">MON</div>
          <div className="field-value">{monday}</div>
        </div>
        <div className="record">
          <div className="field-name">TUE</div>
          <div className="field-value">{tuesday}</div>
        </div>
        <div className="record">
          <div className="field-name">WED</div>
          <div className="field-value">{wednesday}</div>
        </div>
        <div className="record">
          <div className="field-name">THU</div>
          <div className="field-value">{thursday}</div>
        </div>
        <div className="record">
          <div className="field-name">FRI</div>
          <div className="field-value">{friday}</div>
        </div>
        <div className="record">
          <div className="field-name">SAT</div>
          <div className="field-value">{saturday}</div>
        </div>
      </div>
    </div>
  );
}

export default Hours;
