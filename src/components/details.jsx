import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";
import GeneralDetails from "./general-details";
import Description from "./description";
import Hours from "./hours";
import Tile from "./tile";
import MobilePreview from './mobile-preview'

function DetailsView() {
  const [showSetupAccount, setShowSetupAccount] = useState(false);
  const [businessName, setBusinessName] = useState('"PDT" Please Don\'t Tell');
  const [showBarAnalytics, setShowBarAnalytics] = useState(false);
  const [taskCounter, setTaskCounter] = useState("3 tasks");
  const [showMobilePreview, setShowMobilePreview] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [showThird,setShowThird] = useState(false);
  const saveDetails = () => {
    console.debug("TODO: fill logic to save data");
  };
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
    setTaskCounter("3 tasks");

    /**
     * TODO: when modified, show save button
     */
    setShowSaveButton(true);
  }, []);
  return (
    <div className="HomeView">
      <div className="header">
        <div className="place-horizontal">
          <span className="business-name">Bar Details</span>
          {showSaveButton && (
            <button className="save-details pull-right" onClick={saveDetails}>
              Save
            </button>
          )}
          <div className="clear"/>
        </div>
        {showSetupAccount && (
          <>
            <h2 className="section-title">Setup Your Account</h2>
            <div className="setup-account">
              <div className="setup-tiles">
                <Tile
                  text="+ Add Business Photos"
                  link="/auth/business/add-photos"
                />
                <Tile text="+ Add Menu PDF" link="/auth/business/add-menu" />
          {showThird && <Tile text="+ Add Description" link="/auth/business/add-desc" />}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="content">
        <GeneralDetails />
        <Description />
        <Hours />
      </div>
      {showMobilePreview && (
        <MobilePreview/>
      )}
    </div>
  );
}

export default DetailsView;
