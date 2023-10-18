import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";
import CheckIns from "./check-ins";
import ClickThrus from "./click-thrus";
import Tile from "./tile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faCoffee} />;

function MobilePreview() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("showMP")) {
      localStorage.setItem("showMP", true);
    }
    setShow(localStorage.getItem("showMP") === "true");
  }, []);
  const collapse = () => {
    setShow(false);
    localStorage.setItem("showMP", false);
  };
  const expand = () => {
    setShow(true);
    localStorage.setItem("showMP", true);
  };
  return (
    <>
      <div className={`MobilePreview`}>
        {!show && 
                <svg
                  className="expand-toggle-button"
                  height="1em"
                  viewBox="0 0 512 512"
                  onClick={expand}
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
                </svg>
        }
        <div className={`right-nav ${show ? "" : "MobilePreviewHide"}`}>
          <div className="mobile-preview">
            <div className="place-horizontal">
              {show && (
                <svg
                  className="toggle-button"
                  height="1em"
                  viewBox="0 0 512 512"
                  onClick={collapse}
                >
                  <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                </svg>
              )}
              <h2 className="section-title">Mobile Preview</h2>
            </div>
            <p>
              Once you complete your profile, your bar app previews will display
              here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobilePreview;
