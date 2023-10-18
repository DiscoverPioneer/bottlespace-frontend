import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";
import CheckIns from './check-ins';
import ClickThrus from './click-thrus';
import Tile from './tile';
import MobilePreview from './mobile-preview';

function LeftNav() {
  const [showSetupAccount, setShowSetupAccount] = useState(false);
  const [businessName, setBusinessName] = useState('"PDT" Please Don\'t Tell');
  const [showBarAnalytics, setShowBarAnalytics] = useState(false);
  const [taskCounter,setTaskCounter] = useState('3 tasks');
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

    /**
     * TODO: grab current setup tasks needed from api
     */
    setTaskCounter('3 tasks');
  }, []);
  return (
    <div className="HomeView">
      <div className="header">
        <h1 className="business-name">{businessName}</h1>
        {showSetupAccount && (
          <>
          <h2 className="section-title">Setup Your Account</h2>
          <div className="setup-view-all">{taskCounter}</div>
          <div className="setup-account">
            <div className="setup-tiles">
              <Tile text="+ Add Business Photos" link="/auth/business/add-photos"/>
              <Tile text="+ Add Menu PDF" link="/auth/business/add-menu"/>
              <Tile text="+ Add Description" link="/auth/business/add-desc"/>
            </div>
          </div>
        </>
        )}
      </div>
      <div className="content">
        {showBarAnalytics && (
          <div className="bar-analytics">
            <h2 className="section-title">Bar Analytics</h2>
            <div className="analytics-tiles">
              <CheckIns/>
              <ClickThrus/>
            </div>
          </div>
        )}
      </div>
      <MobilePreview/>
    </div>
  );
}

export default LeftNav;
