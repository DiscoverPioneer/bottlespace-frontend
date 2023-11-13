import useState from 'react';
import logo from "../img/logo.png";
import background from "../img/bg.jpg";
import "../App.css";
import { Link } from "react-router-dom";
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import BrowserSafari from '../components/browser-safari';

function Root() {
  const signUp = () => {
    window.location.href = "/sign-up";
  };
  const login = () => {
    window.location.href = "/auth/login";
  };
  useEffect(() => {
    if(localStorage.getItem('debug') === 'true') {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      let f = document.getElementById('debug');
      f.innerHTML = [vw,'x',vh].join('');
    }
  },[]);
  return (
    <div className="App">
    <div className="debug" id="debug"></div>
      <div
        className="App-header"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
    <BrowserSafari/>
      <div className="App-content">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={signUp} className="sign-up">
          Sign Up
        </button>
        <Link to={"./Login"}>
          <button onClick={login} className="login">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Root;
