import logo from "../img/logo.png";
import "../App.css";
import SignUpForm from "../components/sign-up";
import BrowserSafari from '../components/browser-safari';

function SignUp() {
  return (
    <div className="App Login">
      <div className="App-content Left-right-App-content">
        <div className="LoginLeft">
          <SignUpForm />
        </div>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    <BrowserSafari/>
    </div>
  );
}

export default SignUp;
