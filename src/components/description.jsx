import React, { useState, useEffect } from "react";
import "../App.css";
import "../Auth.css";
import { Link } from "react-router-dom";

function Description() {
  const [description, setDescription] = useState('');
  useEffect(() => {
    /**
     * TODO: grab all these from the API
     */
    setDescription(`This pioneering East Village speakeasy is as famous for its (in)accessibility as its cocktails: To get in, you have to call from a payphone inside Crif Dogs, the subterranean hot-dog stand next door. Under the guidance of owner Jeff Bell (a former PDT barback), the cocktails remain as superb as ever.`);
  }, []);
  return (
    <div className="Description">
      <div className="content">
        <div className="record">
          <div className="field-name">Description</div>
          <div className="field-value">{description}</div>
        </div>
      </div>
    </div>
  );
}

export default Description;
