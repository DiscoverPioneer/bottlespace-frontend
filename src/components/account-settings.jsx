import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";

function AccountSettings({name, username, email, password}) {
  const [businessName, setBusinessName] = useState('"PDT" Please Don\'t Tell');
  const [addressLine1, setAddressLine1] = useState(
    `113 St Marks Pl. New York, NY, 10009`
  );
  const [phone, setPhone] = useState(`(212) 123-1234`);
  const [price, setPrice] = useState(`2`);
  const [barType, setBarType] = useState(`Speakeasy`);
  useEffect(() => {
    /**
     * TODO: grab all these from the API
     */
    setBusinessName(`"PDT" Please Don't Tell`);
    setAddressLine1(`113 St Marks Pl. New York, NY, 10009`);
    setPhone(`(212) 123-1234`);
    setPrice(2);
    setBarType(`Speakeasy`);
  }, []);
  return (
    <div className="AccountSettings InlineSection">
      <div className="header">
        <h2 className="section-title">Account</h2>
      </div>
      <div className="content">
        <div className="record">
          <div className="field-name">Name</div>
          <div className="field-value">{name}</div>
        </div>
        <div className="record">
          <div className="field-name">Username</div>
          <div className="field-value">{username}</div>
        </div>
        <div className="record">
          <div className="field-name">Email</div>
          <div className="field-value">{email}</div>
        </div>
        <div className="record">
          <div className="field-name">Password</div>
          <div className="field-value">{Array(password.split('').length + 1).join('*')}</div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
