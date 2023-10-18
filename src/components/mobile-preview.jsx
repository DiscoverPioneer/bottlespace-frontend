import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";
import CheckIns from './check-ins';
import ClickThrus from './click-thrus';
import Tile from './tile';

function MobilePreview() {
  return (
    <div className="MobilePreview">
      <div className="right-nav">
        <div className="mobile-preview">
          <h2 className="section-title">Mobile Preview</h2>
          <p>
            Once you complete your profile, your bar
            app previews will display here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MobilePreview;
