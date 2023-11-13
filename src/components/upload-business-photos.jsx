import React, { useState, useEffect, useRef, } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";
import CheckIns from "./check-ins";
import ClickThrus from "./click-thrus";
import Tile from "./tile";
import MobilePreview from "./mobile-preview";
import { AuthService } from "../services/apiService";

function HomeView() {
  console.debug(JSON.stringify(AuthService));
  const [showSetupAccount, setShowSetupAccount] = useState(false);
  const [businessName, setBusinessName] = useState('"PDT" Please Don\'t Tell');
  const [showBarAnalytics, setShowBarAnalytics] = useState(false);
  const [taskCounter, setTaskCounter] = useState("3 tasks");
  const [showThird, setShowThird] = useState(false);
  const { GetHomeDashboard, currentUser, UploadBusinessPhoto, } = AuthService;
  const [loading, setLoading] = useState(true);
  const [userUploadToken,setUserUploadToken] = useState(null);
  const businessPhoto = useRef();
  const submitBusinessPhoto = async (e) => {
    e.preventDefault();
    console.debug(businessPhoto.current);
    let form = new FormData();
    form.append('file',businessPhoto.current.files[0]);
    UploadBusinessPhoto(currentUser.establishment,form).then((response) => {
      console.debug({response});
    }).catch((err) => {
      console.error({err});
    });
  };
  useEffect(() => {
    setLoading(true);
    console.debug({currentUser});
    GetHomeDashboard(currentUser.establishment)
      .then((resp) => {
        console.debug({resp});
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
        setTaskCounter("View all 3 tasks");
        setLoading(false);
      })
      .catch((err) => {
        console.error({ err });
        alert(err);
      });
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
                <Tile
                  text="+ Add Business Photos"
                  link="/auth/business/add-photos"
                />
                <Tile text="+ Add Menu PDF" link="/auth/business/add-menu" />
                {showThird && (
                  <Tile
                    text="+ Add Description"
                    link="/auth/business/add-desc"
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="content">
        <div className="business-photos-upload">
          <form action="/image/upload" method="POST">
            <input type="file" ref={businessPhoto} accept="image/png, image/jpeg" />
            <button onClick={submitBusinessPhoto}>Submit</button>
          </form>
        </div>
        {showBarAnalytics && (
          <div className="bar-analytics">
            <h2 className="section-title">Bar Analytics</h2>
            <div className="analytics-tiles">
              <CheckIns />
              <ClickThrus />
            </div>
          </div>
        )}
      </div>
      <MobilePreview />
    </div>
  );
}

export default HomeView;
