import React, { useRef, useState, useEffect } from 'react';

function SignUp() {
  /**
   * TODO: use references to all fields and make the register button
   * disabled/enabled depending on completeness of form
   */
  const [buttonState,setButtonState] = useState('custom-button button-inactive submit');
  const barName = useRef('');
  const pw = useRef('');
  const submitForm = () => {
    console.debug('TODO: stub');
    window.location.href = '/auth/home';
  };
  useEffect(() => {
    console.debug('button state stub');
  },[buttonState]);
  const changed = () => {
    console.debug(pw.current.value,barName.current.value);
    if(String(pw.current.value).length && String(barName.current.value).length){
      setButtonState('custom-button button-active submit');
      return;
    }
    setButtonState('custom-button button-inactive submit');
  };
  
  return (
    <div className="SignUpForm vertical-form">
      <span className="title">Bar SignUp</span>
      <input className="bottlespace" placeholder="Bar Name" type="text" name="bar-name" onChange={changed} ref={barName}/>
      <input className="bottlespace" placeholder="Owner Name" type="text" name="owner-name" onChange={changed} ref={barName}/>
      <input className="bottlespace" placeholder="Email" type="text" name="email" onChange={changed} ref={barName}/>
      <input className="bottlespace" placeholder="Password" type="password" name="password" onChange={changed} ref={pw}/>
      <input className="bottlespace" placeholder="Confirm Password" type="password" name="confirm-password" onChange={changed} ref={pw}/>
      <div className="">
        <div className="flex-left-right age-verification-wrapper">
          <input className="age-verification" type="checkbox" name="age-verification"/>
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
