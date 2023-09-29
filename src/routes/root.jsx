import logo from "../img/logo.png";
import background from "../img/bg.jpg";
import "../App.css";
import { Link } from "react-router-dom";

function Root() {
  const signUp = () => {
    window.location.href = "/sign-up";
  };
  const login = () => {
    window.location.href = "/login";
  };
  return (
    <div className="App">
      <div
        className="App-header"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
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
