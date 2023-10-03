import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";

function GeneralDetails() {
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
    <div className="GeneralDetails InlineSection">
      <div className="header">
        <h1 className="section-title">General</h1>
      </div>
      <div className="content">
        <div className="record">
          <div className="field-name">Name</div>
          <div className="field-value">{businessName}</div>
        </div>
        <div className="record">
          <div className="field-name">Address</div>
          <div className="field-value">{addressLine1}</div>
        </div>
        <div className="record">
          <div className="field-name">Phone</div>
          <div className="field-value">{phone}</div>
        </div>
        <div className="record">
          <div className="field-name">Price</div>
          <div className="field-value">{Array(price+1).join('$')}</div>
        </div>
        <div className="record">
          <div className="field-name">Bar Type</div>
          <div className="field-value">{barType}</div>
        </div>
      </div>
    </div>
  );
}

export default GeneralDetails;
