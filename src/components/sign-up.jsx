import React, { useRef, useState, useEffect } from 'react';
import ApiClient, { axiosAPI } from "../services/axiosClient";
//import config from "../config";
import { AuthService } from "../services/apiService";
import { toast } from "react-toastify";
//const axiosCall = config.PROXY_API ? axiosAPI : ApiClient;

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

function SignUp() {
  /**
   * TODO: use references to all fields and make the register button
   * disabled/enabled depending on completeness of form
   */
  const [buttonState,setButtonState] = useState('custom-button button-active submit');
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [apiError,setApiError] = useState(null);
  const barName = useRef('');
  const email = useRef('');
  const ownerName = useRef('');
  const pw = useRef('');
  const certify = useRef('');
  const confirmPw = useRef('');
  const { createNewEstablishment } = AuthService;
  console.debug({createNewEstablishment});
  const [error,setError] = useState(null);
  const strip = (str) => {
    if(!str){
      return '';
    }
    return String(str).replace(/^[\s]+/,'').replace(/[\s]+$/,'');
  };
  const checkForm = () => {
    const bar = strip(barName.current.value);
    if(bar.length === 0){
      return {okay: false,message: 'Please specify a bar name'};
    }
    const owner = strip(ownerName.current.value);
    if(owner.length === 0){
      return {okay: false,message: 'Please specify an owner name'};
    }
    const email_value = strip(email.current.value);
    if(email_value.length === 0){
      return {okay: false,message: 'Please specify a valid email'};
    }
    if(pw.current.value.length === 0 || confirmPw.current.value.length === 0){
      return {okay: false, message: 'Please fill in both password fields'};
    }
    if(pw.current.value !== confirmPw.current.value){
      return {okay: false, message: 'Passwords do not match'};
    }
    if(!certify.current.checked){
      return {okay: false,message: 'Please agree to the terms and conditions'};
    }
    return {okay: true,message: ''};
  };

  const submitForm = () => {
    if(isSubmitting){
      return;
    }
    setError(null);
    let status = checkForm();
    if(!status.okay){
      setError(status.message);
      //setButtonState('custom-button button-inactive submit');
      return;
    }
    setError(null);
    //setButtonState('custom-button button-active submit');
    setIsSubmitting(true);
    createNewEstablishment(
      barName.current.value,
      ownerName.current.value,
      email.current.value,
      pw.current.value
    ).then((resp) => {
      setApiError(null);
      console.debug({resp});
    }).catch((error) => {
      console.error({error});
      setApiError(error);
    });
  };
  const changed = () => {
    console.debug('changed');
    if(checkForm().okay){
      //setButtonState('custom-button button-active submit');
      return;
    }
    //setButtonState('custom-button button-inactive submit');
  };
  
  return (
    <div className="SignUpForm vertical-form">
      <span className="title">Bar SignUp</span>
      {error && <b className="error">{error}</b>}
      {apiError && <b className="error">{apiError}</b>}
      <input className="bottlespace" placeholder="Bar Name" type="text" name="bar-name" onChange={changed} ref={barName}/>
      <input className="bottlespace" placeholder="Owner Name" type="text" name="owner-name" onChange={changed} ref={ownerName}/>
      <input className="bottlespace" placeholder="Email" type="text" name="email" onChange={changed} ref={email}/>
      <input className="bottlespace" placeholder="Password" type="password" name="password" onChange={changed} ref={pw}/>
      <input className="bottlespace" placeholder="Confirm Password" type="password" name="confirm-password" onChange={changed} ref={confirmPw}/>
      <div className="">
        <div className="flex-left-right age-verification-wrapper">
          <input className="age-verification" type="checkbox" name="age-verification" onChange={changed} ref={certify}/>
          <p className="slick-text">I certify that I am 21 years of age or older and I am the owner of the Bar listed above, and I agree to the <a href="user-agreement" className="bottlespace-link">User Agreement</a> and <a href="privacy-policy" className="bottlespace-link">Privacy Policy</a>.
          </p>
        </div>
        <button onClick={submitForm} className={buttonState}>
          Register
        </button>
      </div>
    </div>
  );
}

export default SignUp;
