import React, { useRef, useState, useEffect } from 'react';

function Login() {
  const [buttonState,setButtonState] = useState('custom-button button-inactive submit');
  const email = useRef('');
  const pw = useRef('');
  const submitForm = () => {
    console.debug('TODO: stub');
    window.location.href = '/auth/home';
  };
  useEffect(() => {
    console.debug('button state stub');
  },[buttonState]);
  const changed = () => {
    console.debug(pw.current.value,email.current.value);
    if(String(pw.current.value).length && String(email.current.value).length){
      setButtonState('custom-button button-active submit');
      return;
    }
    setButtonState('custom-button button-inactive submit');
  };
  
  return (
    <div className="LoginForm vertical-form">
      <span className="title">Bar Login</span>
      <input className="bottlespace" placeholder="Email" type="text" name="email" onChange={changed} ref={email}/>
      <input className="bottlespace" placeholder="Password" type="password" name="password" onChange={changed} ref={pw}/>
      <div className="blacked-out-bg">
        <button onClick={submitForm} className={buttonState}>
          Login
        </button>
      </div>
      <a className="forgot-pw bottlespace-link"
         href="/forgot-password"
      >Forgot Password?
    </a>
    </div>
  );
}

export default Login;
