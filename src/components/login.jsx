import React, { useRef, useState, useEffect } from 'react';
import { AuthService } from '../services/apiService';

function Login() {
  const [buttonState,setButtonState] = useState('custom-button button-inactive submit');
  const [error,setError] = useState(null);
  const email = useRef('');
  const pw = useRef('');
  const { loginCall } = AuthService;
  const [submitting,setSubmitting] = useState(false);
  const submitForm = () => {
    console.debug('TODO: stub');
    setSubmitting(true);
    loginCall(email.current.value,pw.current.value).then((response) => {
      setSubmitting(false);
      setError(null);
      if(response.isError){
        setError('An error occurred');
        return;
      }
      console.debug({response});
      if(response.isError === false && response.data.token){
        window.location.href = '/auth/home';
        return;
      }
    }).catch((err) => {
      setSubmitting(false);
      setError(err);
      console.error({err});
    });
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
      <div className="error">{error}</div>
      <div className="blacked-out-bg">
        {submitting === false && (<button onClick={submitForm} className={buttonState}> Login </button>)}
        {submitting === true && (<button className={buttonState}>Logging in...</button>)}
      </div>
      <a className="forgot-pw bottlespace-link"
         href="/forgot-password"
      >Forgot Password?
    </a>
    </div>
  );
}

export default Login;
