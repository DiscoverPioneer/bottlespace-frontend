import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";
import GeneralDetails from './general-details';
import Tile from './tile';

function DetailsView() {
  const [showSetupAccount, setShowSetupAccount] = useState(false);
  const [businessName, setBusinessName] = useState('"PDT" Please Don\'t Tell');
  const [showBarAnalytics, setShowBarAnalytics] = useState(false);
  const [taskCounter,setTaskCounter] = useState('3 tasks');
  const [showMobilePreview,setShowMobilePreview] = useState(true);
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
        <h1 className="business-name">Bar Details</h1>
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
        <GeneralDetails/>
      </div>
      {showMobilePreview && (
        <>
      <div className="right-nav">
        <div className="mobile-preview">
          <h2 className="section-title">Mobile Preview</h2>
          <p>
            Once you complete your profile, your bar
            app previews will display here.
          </p>
        </div>
      </div>
    </>
      )}
    </div>
  );
}

export default DetailsView;
