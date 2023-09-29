import React, { useRef, useState, useEffect } from "react";
import logo from "../img/logo.png";
import homeLogo from "../img/Home.svg";
//import homeInactiveLogo from "../img/Home-inactive.svg";
//import detailsLogo from "../img/Workouts.svg";
import detailsInactiveLogo from "../img/Workouts-inactive.svg";
//import settingsLogo from "../img/Settings.svg";
import settingsInactiveLogo from "../img/Settings-inactive.svg";
import "../App.css";
import "../Auth.css";

function LeftNav() {
  const [buttonState, setButtonState] = useState(
    "custom-button button-inactive submit"
  );
  const email = useRef("");
  const pw = useRef("");
  const submitForm = () => {
    console.debug("TODO: stub");
  };
  useEffect(() => {
    console.debug("button state stub");
  }, [buttonState]);
  const changed = () => {
    console.debug(pw.current.value, email.current.value);
    if (String(pw.current.value).length && String(email.current.value).length) {
      setButtonState("custom-button button-active submit");
      return;
    }
    setButtonState("custom-button button-inactive submit");
  };

  return (
    <div className="LeftNav">
      <img src={logo} alt="logo" className="brand-logo" />
      <div className="main-nav">
        <img src={homeLogo} alt="home" />
        <img src={detailsInactiveLogo} alt="details" />
        <img src={settingsInactiveLogo} alt="settings" />
      </div>
    </div>
  );
}

export default LeftNav;
