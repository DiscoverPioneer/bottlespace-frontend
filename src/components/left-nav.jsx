import React, { useState, useEffect } from "react";
import logo from "../img/logo.png";
import homeLogo from "../img/Home.svg";
import homeInactiveLogo from "../img/Home-inactive.svg";
import detailsLogo from "../img/Workouts.svg";
import detailsInactiveLogo from "../img/Workouts-inactive.svg";
import settingsLogo from "../img/Settings.svg";
import settingsInactiveLogo from "../img/Settings-inactive.svg";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";

function LeftNav() {
  const [actualHomeLogo, setHomeLogo] = useState(homeLogo);
  const [actualDetailsLogo, setDetailsLogo] = useState(detailsLogo);
  const [actualSettingsLogo, setSettingsLogo] = useState(settingsLogo);
  useEffect(() => {
    console.debug(window.location.pathname);
    if (window.location.pathname.match(/^\/auth\/home/)) {
      setHomeLogo(homeLogo);
      setDetailsLogo(detailsInactiveLogo);
      setSettingsLogo(settingsInactiveLogo);
      return;
    }
    if (window.location.pathname.match(/^\/auth\/details/)) {
      setHomeLogo(homeInactiveLogo);
      setDetailsLogo(detailsLogo);
      setSettingsLogo(settingsInactiveLogo);
      return;
    }
    if (window.location.pathname.match(/^\/auth\/settings/)) {
      setHomeLogo(homeInactiveLogo);
      setDetailsLogo(detailsInactiveLogo);
      setSettingsLogo(settingsLogo);
      return;
    }
  }, []);
  return (
    <>
      <div className="MobileNav">
        <Link to="/auth/home">
          <img src={logo} alt="logo" className="brand-logo" />
        </Link>
        <Link to="/auth/home">
          <img src={actualHomeLogo} alt="home" />
        </Link>
        <Link to="/auth/details">
          <img src={actualDetailsLogo} alt="details" />
        </Link>
        <Link to="/auth/settings">
          <img src={actualSettingsLogo} alt="settings" />
        </Link>
      </div>
      <div className="LeftNav">
        <Link to="/auth/home">
          <img src={logo} alt="logo" className="brand-logo" />
        </Link>
        <div className="main-nav">
          <Link to="/auth/home">
            <img src={actualHomeLogo} alt="home" />
          </Link>
          <Link to="/auth/details">
            <img src={actualDetailsLogo} alt="details" />
          </Link>
          <Link to="/auth/settings">
            <img src={actualSettingsLogo} alt="settings" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default LeftNav;
