import logo from '../img/logo.png';
import background from '../img/bg.jpg';
import '../App.css';
import SignUpForm from '../components/sign-up';
import {Link} from "react-router-dom";

function SignUp() {
  return (
    <div className="App Login">
      <div className="App-content Left-right-App-content">
        <div className="LoginLeft">
          <SignUpForm/>
        </div>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
