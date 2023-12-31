import logo from "../img/logo.png";
import background from "../img/bg.jpg";
import "../App.css";
import LoginForm from "../components/login";
import BrowserSafari from '../components/browser-safari';

function Login() {
  return (
    <div className="App Login">
      <div
        className="App-header"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="App-content">
        <div className="LoginLeft">
          <LoginForm />
        </div>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    <BrowserSafari/>
    </div>
  );
}

export default Login;
