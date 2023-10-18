import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";
import AccountSettings from "./account-settings";
import MobilePreview from './mobile-preview';

function DetailsView() {
  const [showSetupAccount, setShowSetupAccount] = useState(false);
  const [businessName, setBusinessName] = useState('"PDT" Please Don\'t Tell');
  const [showBarAnalytics, setShowBarAnalytics] = useState(false);
  const [taskCounter, setTaskCounter] = useState("3 tasks");
  const [showMobilePreview, setShowMobilePreview] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [name,setName] = useState('William Samuels');
  const [username,setUsername] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState('password1234');
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
    setName('William Samuels');
    setUsername('@william-samuels');
    setEmail('william.samuels@gmail.com');
    setPassword('password1234');

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
    <div className="HomeView SettingsView">
      <div className="header">
        <div className="place-horizontal">
          <span className="business-name">Settings</span>
          {showSaveButton && (
            <button className="save-details pull-right" onClick={saveDetails}>
              Save
            </button>
          )}
          <div className="clear"/>
        </div>
      </div>
      <div className="content">
        <AccountSettings name={name} username={username} email={email} password={password}/>
        <button className="logout">Log out</button>
      </div>
      {showMobilePreview && (
        <MobilePreview/>
      )}
    </div>
  );
}

export default DetailsView;
