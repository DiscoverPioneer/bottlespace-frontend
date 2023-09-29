import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";

function LeftNav() {
  const [showSetupAccount, setShowSetupAccount] = useState(false);
  const [businessName, setBusinessName] = useState('"PDT" Please Don\'t Tell');
  const [showBarAnalytics, setShowBarAnalytics] = useState(false);
  useEffect(() => {
    /**
     * TODO: grab data from api
     */
    setShowSetupAccount(true);
    /**
     * TODO: grab business info from api
     */
    setBusinessName(`"PDT" Please Don't Tell`);

    /**
     * TODO: grab bar analytics from api
     */
    setShowBarAnalytics(true);
  }, []);
  return (
    <div className="HomeView">
      <div className="header">
        <h1>{businessName}</h1>
        {showSetupAccount && (
          <div className="setup-account">
            <h2 className="section-title">Setup Your Account</h2>
            <div className="todos">
              <Link to="/auth/business/add-photos">+ Add Business Photos</Link>
              <Link to="/auth/business/add-menu">+ Add Menu PDF</Link>
            </div>
          </div>
        )}
      </div>
      <div className="content">
        {showBarAnalytics && (
          <div className="bar-analytics">
            <h2 className="section-tile">Bar Analytics</h2>
            <p>Graphs go here</p>
            <p>Click Thru's go here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftNav;
